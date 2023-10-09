import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_ORGANIZATION, UPDATE_USERORGID } from "../utils/mutations";
import { GET_TAG_BY_NAME } from "../utils/queries";
import { PickerOverlay } from 'filestack-react';
var tagName;


function CreateOrgForm() {
  const [userFormData, setUserFormData] = useState({
    name: "",
    description: "",
    link: "",
    amount: ""
  });
  const [skip, setSkip] = useState(false);
  const [imageName, setImageName] = useState("");
  const [urlName, setUrlName] = useState("");
  const [validated] = useState(false);
  const [showOverlay, setShowOverlay] = useState("hidden");
  const [addOrganization, { error: orgError, loading: dataLoading, data: orgData }] = useMutation(ADD_ORGANIZATION);
  const [updateUserOrgId, { error }] = useMutation(UPDATE_USERORGID);
  var inputRef = useRef(null);


  function handleInputEntry(event) {
    inputRef = event.target.value
    tagName = inputRef;
  }

  const { loading:tagLoading, data:tagData } = useQuery(
    GET_TAG_BY_NAME, 
    {
    variables: { tagName: tagName }
    }
  )
console.log("tagData",tagData?.getTagByName._id)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  let userImageUrl = '';
console.log(userFormData)
  const handleFormSubmit = async () => {
    try {
      const addOrganizationInput = {
        name: userFormData.name,
        description: userFormData.description,
        image: urlName,
        link: userFormData.link,
        fundraisingGoal: parseInt(userFormData.amount),
        tag: tagData.getTagByName._id
      };
      console.log("tagName:", tagName)
      console.log("inputRef:", inputRef)
      const { data: orgData } = await addOrganization({
        variables: { input: { ...addOrganizationInput } },
      });

    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = (event) => {
    event.preventDefault();

        setShowOverlay("show")

  
  }

  return (
    <>
    <div className='md:container 2xl:w-1/4 xl:w-1/3 lg:w-1/2 md:w-2/3 p-8 my-40 mx-auto bg-light-2 drop-shadow-2xl md:rounded-md'>
      <form onSubmit={handleFormSubmit} className='form login-form flex flex-col justify-center items-center'>

        <h3 className="font-main"
        >Organization Name</h3>

        <input
          className='font-secondary form-input w-full text-center p-2 m-2 focus:outline-none rounded-lg bg-light-1'
          type="name"
          name="name"
          onChange={handleInputChange}
          value={userFormData.name}
          required
        />

        <h3 className="mt-4 font-main"
        >Organization Tag</h3>

        <select className="font-secondary form-input w-full text-center p-2 m-2 focus:outline-none rounded-lg bg-light-1"
        required name="tags" id="tags" onChange={() => handleInputEntry(event)}>
          <option value="" defaultValue>Choose a tag...</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Disaster Relief">Disaster Relief</option>
          <option value="Arts">Arts</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
          <option value="Hunger & Poverty">Hunger & Poverty</option>
          <option value="Animal Welfare">Animal Welfare</option>
          <option value="Community Development">Community Development</option>
          <option value="Youth Programs">Youth Programs</option>
          <option value="Elderly Services">Elderly Services</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Human Rights">Human Rights</option>
          <option value="Technology">Technology</option>
          <option value="Cultural Preservation">Cultural Preservation</option>
          <option value="Emergency Services">Emergency Services</option>
          <option value="Gender Equality">Gender Equality</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Homelessness">Homelessness</option>
          <option value="Disability Services">Disability Services</option>
          <option value="Sports & Recreation">Sports & Recreation</option>
        </select>

        <h3 className="mt-4 font-main"
        >Organization Description</h3>

        <textarea
        className="resize-none font-secondary form-input w-full h-32 text-center p-2 m-2 focus:outline-none rounded-lg bg-light-1"
          type="description"
          name="description"
          onChange={handleInputChange}
          value={userFormData.description}
          required
        />

        <h3 className="mt-4 font-main"
        >Upload Image</h3>

        <h4 className="my-2 font-secondary text-text-dark"
        >{imageName}</h4>

        {showOverlay === "show" ? (
          <PickerOverlay
            apikey={"AAAsSWvCQS2kKNL67CmbAz"}
            onUploadDone={(res) => {
              setImageName(res.filesUploaded[0].filename);
              setUrlName(res.filesUploaded[0].url);
              console.log(userImageUrl);
              setShowOverlay("hidden");
            }}
            pickerOptions={{
              transformations: {force: true,
                crop:{aspectRatio: 800/600,
                force: true}},
              maxSize: 800 * 600,
              imageDim: [800, 600],
              accept: "image/*",
              onCancel: () => {
                setShowOverlay("hidden");
                console.log(showOverlay);
              },
              onClose: () => {
                setShowOverlay("hidden");
                console.log(showOverlay);
              },
            }}

          />
        ) : (
          <button className="font-secondary py-2 px-6 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all"
          onClick={handleImageUpload}>Choose Image</button>
        )}

        <h3 className="mt-4 font-main"
        >Link</h3>

        <input
        className="font-secondary form-input w-full text-center p-2 m-2 focus:outline-none rounded-lg bg-light-1"
          type="link"
          name="link"
          onChange={handleInputChange}
          value={userFormData.link}
          required
        />

        <h3 className="mt-4 font-main"
        >Fundraising Goal</h3>

        <span><span className="text-xl text-text-dark">$</span><input
        className="font-secondary form-input p-2 m-2 focus:outline-none rounded-lg bg-light-1"
          type="number"
          placeholder="10"
          step="5"
          name="amount"
          onChange={handleInputChange}
        />{" "}</span>
        
        <button
        className="font-secondary py-2 px-6 mt-4 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all disabled:opacity-30"
          disabled={
            !(
              userFormData.name &&
              userFormData.description &&
              imageName &&
              userFormData.link
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </button>

      </form>
    </div>
    </>
  );
  
}

export default CreateOrgForm;
