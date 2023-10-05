import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import  {ADD_ORDER} from '../utils/mutations'
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';


const stripePromise = loadStripe('pk_test_51Nwn2BLNguEaQpKjwZL9arEx1hHEo9tc39SLGcs2Jz33CUv8lxEch4RMu9m0UDNF6J40PX5wvblbkeKp5NZwvNtE00pCW4iP66');


const DonatePage = ({organizationName}) => {
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
          organizationName: {organizationName},
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
    <div className="donate">
        <div>
          <div className="flex-row space-between">
            <label htmlFor="donation">I would like to donate: 
            <input 
            type="number"
            placeholder= "10"
            step= "5"
            onChange={onChange}
            /> dollars
            </label>

            {Auth.loggedIn() ? (
              <button onClick={submitDonation}>Donate</button>
            ) : (
              <span>(log in to donate)</span>
            )}
          </div>
        </div>
    </div>
  );
};

export default DonatePage;
