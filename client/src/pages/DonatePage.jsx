import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import  {ADD_ORDER} from '../utils/mutations'
import { GET_SINGLE_ORGANIZATION } from '../utils/queries'
import OrganizationPage from './OrganizationPage';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';


const stripePromise = loadStripe('sk_test_51Nwn2BLNguEaQpKjj5UL5hmKCGRBOwFiBXHiZR8cJCUZk8p7leU093Eg1O4IQj5jDPsfJJcNOKWRpR3xPHZMoxQz00haZlJ6fc');


const DonatePage = () => {
  const [addOrder, { data }] = useMutation(ADD_ORDER);
  const [getSingleOrganization, { data: singleOrganizationData }] = useQuery(GET_SINGLE_ORGANIZATION)

  useEffect(() => {
    getSingleOrganization();
  }, []);

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
        addOrderInput: $addOrderInput,
      },
    });
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
        <div>
          {state.cart.map((item) => (
            <OrganizationPage key={item._id} item={item} />
          ))}

          <div className="flex-row space-between">
            <strong>Total: ${calculateTotal()}</strong>

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
