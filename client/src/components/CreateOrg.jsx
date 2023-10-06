import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_ORGANIZATION, UPDATE_USERORGID } from "../utils/mutations";

function CreateOrgForm() {
  const [userFormData, setUserFormData] = useState({
    name: "",
    description: "",
    orgImage: "",
    link: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addOrganization, { error: orgError, loading: dataLoading, data: orgData }] = useMutation(ADD_ORGANIZATION);
  const [updateUserOrgId, { error }] = useMutation(UPDATE_USERORGID);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      const addOrganizationInput = {
        name: userFormData.name,
        description: userFormData.description,
        image: userFormData.orgImage,
        link: userFormData.link,
      };

      const { data: orgData } = await addOrganization({
        variables: { input: { ...addOrganizationInput } },
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="name"
            placeholder="name"
            name="name"
            onChange={handleInputChange}
            value={userFormData.name}
            required
          />
          <br />
          <textarea
            type="description"
            placeholder="description"
            name="description"
            onChange={handleInputChange}
            value={userFormData.description}
            required
          />
          <br />
          <input
            type="orgImage"
            placeholder="image"
            name="orgImage"
            onChange={handleInputChange}
            value={userFormData.orgImage}
            required
          />
          <br />
          <input
            type="link"
            placeholder="link"
            name="link"
            onChange={handleInputChange}
            value={userFormData.link}
            required
          />
          <br />
          <button
            disabled={
              !(
                userFormData.name &&
                userFormData.description &&
                userFormData.orgImage &&
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
