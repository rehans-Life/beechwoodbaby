import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBasket, selectBasketTotal } from "../redux/cartSlice";
import BillnigDetailsForm from "../components/Checkout/BillnigDetailsForm";
import { selectUser } from "../redux/userSlice";
import { useRouter } from "next/router";
import CartProduct from "../components/Sidebar/CartProduct";
import Script from "next/script";
import ReactDOM from "react-dom";
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

const styles = {
  container: "",
  wrapper: "",
};

export default function Checkout() {
  const basketTotal = useSelector(selectBasketTotal);
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [district, setDistrict] = useState("");

  const handleChange = async (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;

      case "phone":
        setPhone(value);
        break;

      case "pincode":
        setPinCode(value);
        break;

      case "city":
        setCity(value);
        break;

      case "state":
        setState(value);
        break;
      case "district":
        setDistrict(value);
        break;
      case "address1":
        setAddress1(value);
        break;
      case "address2":
        setAddress2(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("user"));
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
        setName(data.username);
        setPhone(data.phone);
        setState(data.state);
        setCity(data.city);
        setDistrict(data.district);
        setPinCode(data.pincode);
        setAddress1(data.address1);
        setAddress2(data.address2);
      });
  }, [router]);

  return (
    <div className={styles.container}>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_CLIENT_ID}`}
      ></Script>
      <div className={styles.wrapper}>
        <BillnigDetailsForm
          name={name}
          email={email}
          phone={phone}
          pincode={pincode}
          city={city}
          state={state}
          district={district}
          address1={address1}
          address2={address2}
          handleChange={handleChange}
        />
        <div className="px-5 py-3">
          <p className="py-3 font-semibold text-xl">2{")"} Cart Products</p>
          {basket?.map((item, index) => (
            <CartProduct key={index} white={true} item={item} />
          ))}
        </div>
        <div className="my-8 px-5">
          <p className="font-semibold text-xl my-3">3{")"} Amount Details</p>
          <div className="px-6">
            <div className="flex font-semibold text-xl w-full py-2 justify-between items-center text-textColor">
              <p>Subtotal</p>
              <p>{basketTotal} BHD</p>
            </div>
            <div className="flex font-semibold text-xl border-b border-cartItem w-full py-2 justify-between items-center text-textColor">
              <p>Delivery</p>
              <p>5.00 BHD</p>
            </div>
            <div className="flex font-bold text-2xl w-full my-2 py-2 justify-between text-headingColor items-center">
              <p>Total</p>
              <p>{basketTotal + 5.0} BHD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}