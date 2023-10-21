import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectOrderCurrent } from "../features/order/orderSlice";
import NavBar from "../features/navbar/Navbar";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51O2QBjKwE7BrlPUUtAKA0ZcPh3gEDmiS5ELfq6VVHogFbkjsxocqqw9REYF1uD7CxsMNLBpTY3CcYS6tgqfPJZfq00DgaEPB87");

export default function CheckoutStripe() {
  const [clientSecret, setClientSecret] = useState("");
  const orderCurrent = useSelector(selectOrderCurrent);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: orderCurrent.totalAmount, order_id: orderCurrent.id }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
        <NavBar>
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
    </NavBar>
    </div>
  );
}