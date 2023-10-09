import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import  {ADD_ORDER} from '../utils/mutations'
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';


const stripePromise = loadStripe('pk_test_51Nwn2BLNguEaQpKjwZL9arEx1hHEo9tc39SLGcs2Jz33CUv8lxEch4RMu9m0UDNF6J40PX5wvblbkeKp5NZwvNtE00pCW4iP66');


const DonateForm = ({organizationName}) => {
  const [orderTotal, setOrderTotal] = useState(0)
  const [addOrder, { data }] = useMutation(ADD_ORDER);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.addOrder.orderId });
      });
    }
  }, [data]);

  function submitDonation() {
    addOrder({
      variables: { 
        addOrderInput: {
          organizationName: organizationName,
          orderTotal: orderTotal
        },
      },
    });
  }

  function onChange(event) {

    let inputValue = event.target.value

    if (inputValue < 1) {
      inputValue = 1
    }

    let numericValue = parseInt(inputValue)

    setOrderTotal(numericValue)
  }

  return (
    <div className="donate md:container 2xl:w-1/4 xl:w-1/3 lg:w-1/2 md:w-2/3 p-8 my-40 mx-auto bg-light-2 drop-shadow-2xl md:rounded-md">
        <div>
          <div className="flex flex-col justify-center items-center">
            <label className='font-main text-center'
            htmlFor="donation"><span className='text-xl'>I would like to donate</span>
            <input 
            className='font-secondary form-input w-full text-center p-2 my-2 focus:outline-none rounded-lg bg-light-1'
            type="number"
            placeholder= "10"
            step= "5"
            onChange={onChange}
            /></label>

            {Auth.loggedIn() ? (
              <button className='font-secondary py-2 px-6 my-4 rounded-lg bg-primary hover:bg-secondary text-light-1 transition-all w-full md:w-1/2 hover:scale-105 hover:shadow-2xl'
              onClick={submitDonation}>Confirm</button>
            ) : (
              <span>(log in to donate)</span>
            )}
          </div>
        </div>
    </div>
  );
};

export default DonateForm;
