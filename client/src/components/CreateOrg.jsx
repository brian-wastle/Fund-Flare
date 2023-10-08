import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_ORGANIZATION, UPDATE_USERORGID } from "../utils/mutations";
import { PickerOverlay } from 'filestack-react';

let overlayStatus = 'hidden';

function CreateOrgForm() {
  const [userFormData, setUserFormData] = useState({
    name: "",
    description: "",
    link: "",
    amount: ""
  });
  const [imageName, setImageName] = useState("");
  const [urlName, setUrlName] = useState("");
  const [validated] = useState(false);
  const [showOverlay, setShowOverlay] = useState("hidden");
  const [addOrganization, { error: orgError, loading: dataLoading, data: orgData }] = useMutation(ADD_ORGANIZATION);
  const [updateUserOrgId, { error }] = useMutation(UPDATE_USERORGID);

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
        fundraisingGoal: parseInt(userFormData.amount)
      };

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
        <p>Organization Name:</p>
        <input
          className='font-secondary form-input text-center p-2 m-2 focus:outline-none rounded-lg bg-light-1'
          type="name"
          placeholder="name"
          name="name"
          onChange={handleInputChange}
          value={userFormData.name}
          required
        />
        <br />
        <p>Organization Description:</p>
        <textarea
          type="description"
          placeholder="description"
          name="description"
          onChange={handleInputChange}
          value={userFormData.description}
          required
        />
        <br />
        <p>Upload Image:</p>
        <p>{imageName}</p>
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
              maxSize: 1024 * 1024,
              imageDim: [300, 200],
              accept: "image/jpeg" || "image/bmp" || "image/png",
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
          <button onClick={handleImageUpload}>Choose Image</button>
        )}
        <br />
        <p>Link:</p>
        <input
          type="link"
          placeholder="link"
          name="link"
          onChange={handleInputChange}
          value={userFormData.link}
          required
        />
        <br />
        <p>Fundraising Goal:</p>
        <input
          type="number"
          placeholder="10"
          step="5"
          name="amount"
          onChange={handleInputChange}
        />${" "}
        
        <br />
        <button
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
