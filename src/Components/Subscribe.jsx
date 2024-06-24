import { Dialog, Transition } from "@headlessui/react";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import { server } from "../main";

const ElementProvider = ({ children }) => {
  return (
    <Elements
      stripe={loadStripe(
        "pk_test_51Okn15HmzRzfXGvShWJ4qyaxo6gNmN4XbyDhm8fJD9mZqIUdAZiymjpTkXzfGRIqBh1nfDdyKANZQPkxZ9kb9wDU00vhjmQzsH"
      )}
    >
      <Subscribe />
    </Elements>
  );
};

const Subscribe = ({ open, setOpen, user, plan = "Month" }) => {
  const [loading, setLoading] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const cancelButtonRef = useRef(null);
  const elements = useElements();
  const stripe = useStripe();
  const [address, setAddress] = useState({
    country: "",
    city: "",
    line1: "",
    postal_code: "",
    state: "",
  });
  const addressHandler = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const [pack, setPack] = useState(null);
  const payNow = useRef(null);

  const countries = ["", ""];

  const checkOut = async () => {
    setLoading(true);
    toast.loading("Processing payment", { duration: 1500 });
    if (!stripe || !elements) {
      return toast.error("Payment Couldn't Done");
    }
    payNow.current.disabled = true;

    // const cardElement = elements.getElement(CardNumberElement);
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   card: cardElement,
    //   billing_details: {
    //     email: user.email,
    //     address,
    //   },
    // });

    // if (error) {
    //   console.log(error);
    //   toast.error(error.message);
    //   // setProcessing(false);
    //   return;
    // }

    try {
      const response = await axios.post(
        `${server}api/v1/subscribe/new`,
        {
          amount: 50000,
          currency: "PKR",
          plan,
        },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.success) {
        const { client_secret } = data;
        console.log("🚀 ~ checkOut ~ data", data);
        if (!stripe || !elements) return;
        console.log("here");
        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              email: user.email,
              address,
            },
          },
        });
        console.log(result);
      }
    } catch (error) {
      payNow.current.disabled = false;
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50  transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto top-32 lg:top-16">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-4/5 lg:w-1/2 mt-4 py-4 px-6">
                  <h3 className="my-2 text-center text-xl font-bold">
                    {pack?.desc}
                  </h3>
                  <div className="w-full p-4 flex flex-col md:flex-row gap-8">
                    <div className="w-full ">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">Card Details</h3>
                        <div className="flex gap-2">
                          <img
                            width={25}
                            height={25}
                            alt="Lorem"
                            src={"/assets/mastercard.svg"}
                          />
                          <img
                            width={25}
                            height={25}
                            alt="Lorem"
                            src={"/assets/visa.svg"}
                          />
                        </div>
                      </div>
                      <div className="w-full flex flex-wrap gap-2 mt-4">
                        <CardNumberElement className="w-full md:w-1/2 p-4 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500" />
                        <CardExpiryElement className="w-2/5 md:w-1/4 p-4 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500" />
                        <CardCvcElement className="w-2/5 md:w-1/4 p-4 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium mb-2 mt-8">
                        Billing Details
                      </h3>
                      <div className="w-full flex flex-col items-center">
                        <div className="w-full flex flex-col md:flex-row gap-2 mt-2">
                          <input
                            placeholder="First Name"
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                            className="w-full px-4 py-3 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none block mb-2 border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500"
                          />{" "}
                          <input
                            placeholder="Last Name"
                            value={lName}
                            onChange={(e) => setLName(e.target.value)}
                            className="opacity-70 w-full px-4 py-3 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none block mb-2 border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500"
                          />{" "}
                        </div>
                        <div className="w-full flex flex-col md:flex-row gap-2">
                          <select
                            placeholder="country"
                            name="country"
                            onChange={addressHandler}
                            value={address.country}
                            className="w-full px-4 py-3 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none block mb-4 border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500"
                          >
                            <option value={""}>--Select Country--</option>
                            {countries.map((country) => {
                              return (
                                <option value={country[0]}>{country[1]}</option>
                              );
                            })}
                          </select>
                          <input
                            placeholder="city"
                            name="city"
                            onChange={addressHandler}
                            value={address.city}
                            className="w-full px-4 py-3 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none block mb-4 border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500"
                          />
                        </div>
                        <input
                          placeholder="line1"
                          name="line1"
                          onChange={addressHandler}
                          value={address.line1}
                          className="w-full px-4 py-3 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none block mb-2 border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500"
                        />
                        <div className="w-full flex flex-col md:flex-row gap-2 mt-2">
                          <input
                            placeholder="state"
                            name="state"
                            onChange={addressHandler}
                            value={address.state}
                            className="w-full px-4 py-3 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none block mb-2 border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500"
                          />{" "}
                          <input
                            placeholder="postal_code"
                            name="postal_code"
                            onChange={addressHandler}
                            value={address.postal_code}
                            type="number"
                            className="w-full px-4 py-3 cursor-pointer transition-all duration-300 rounded-lg border-gray-200 focus:outline-none block mb-2 border-2 focus:border-gray-500 focus:border-2 hover:border-gray-500 active:border-gray-500"
                          />{" "}
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                  <div className=" px-4 w-full py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="disabled:opacity-50 disabled:cursor-not-allowed inline-flex outline-none md:w-1/4 w-full mx-auto justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 transition-all duration-200"
                      onClick={() => checkOut()}
                      ref={payNow}
                    >
                      Pay Now {pack?.price}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Subscribe;
