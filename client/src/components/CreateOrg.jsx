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
    // const client = filestack.init('AAAsSWvCQS2kKNL67CmbAz');
    // const options = {
    //   accept: ["image/*"],
    //   onFileSelected: file => {
    //     if (file.size > 1000 * 1000) {
    //         throw new Error('File too big, select something smaller than 1MB');
    //     }
    //   }
    // };
    // client.picker(options).open();

        setShowOverlay("show")

  
  }

  return (
    <>
    <div>
      <form onSubmit={handleFormSubmit}>
        <p>Organization Name:</p>
        <input
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
              onOpen: () => {
                console.log("test");
              },
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
        />{" "}
        dollars
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
