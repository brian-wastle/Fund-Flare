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
      <div className='md:container 2xl:w-1/4 xl:w-1/3 lg:w-1/2 md:w-2/3 p-8 my-40 mx-auto bg-light-2 drop-shadow-2xl md:rounded-md'>
        <form onSubmit={handleFormSubmit} className='form login-form flex flex-col justify-center items-center'>
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
          className='font-secondary form-input text-center p-2 m-2 focus:outline-none rounded-lg bg-light-1'
            type="orgImage"
            placeholder="image"
            name="orgImage"
            onChange={handleInputChange}
            value={userFormData.orgImage}
            required
          />
          <br />
          <input
          className='font-secondary form-input text-center p-2 m-2 focus:outline-none rounded-lg bg-light-1'
            type="link"
            placeholder="link"
            name="link"
            onChange={handleInputChange}
            value={userFormData.link}
            required
          />
          <br />
          <button
            className="font-secondary py-2 px-6 m-2 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all disabled:opacity-30"
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
