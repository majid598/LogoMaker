import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const CheckOutForm = ({ onSubmit }) => {

  //   const stripe = useStripe();
  //   const elements = useElements();
  //   const submit = async (e) => {
  //     e.preventDefault();

  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: "paynow",
  //     });

  //     if (error) {
  //       return toast.error(error.message);
  //     }
  //   };

  return (
    <form onSubmit={onSubmit} className="p-10 text-black">
      <PaymentElement />
    </form>
  );
};

export default CheckOutForm;
