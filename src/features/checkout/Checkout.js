import { Link } from "react-router-dom";
import {
  selectItems,
  updateCartAsync,
  deleteProductFromCartAsync,
} from "../cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../user/userSlice";
import { createOrderAsync } from "../order/orderSlice";
import { selectOrderCurrent } from "../order/orderSlice";
import { selectUserInfo } from "../user/userSlice";
import { discountedPrice } from "../../app/constants";

function Checkout() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItems);
  const totalitems = items.reduce((total, item) => item.quantity + total, 0);
  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
    console.log(e.target.value);
  };

  const handleRemove = (e, id) => {
    dispatch(deleteProductFromCartAsync(id));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const user = useSelector(selectUserInfo);

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
    console.log(e.target.value);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
    console.log(e.target.value);
  };

  const orderCurrent = useSelector(selectOrderCurrent);

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalAmount,
        totalitems,
        user:user.id,
        selectedAddress,
        paymentMethod,
        status: "pending",
      };
      dispatch(createOrderAsync(order));
    } else {
      alert("Please select an address and payment method");
    }
  };
    return (
      <>
        {!items.length && <Navigate to="/" replace={true}></Navigate>}
        {orderCurrent && orderCurrent.paymentMethod === "cash" && (
          <Navigate
            to={`/ordersuccess/${orderCurrent.id}`}
            replace={true}
          ></Navigate>
        )}
        {orderCurrent && orderCurrent.paymentMethod === "card" && (
          <Navigate
            to={`/checkout_stripe/`}
            replace={true}
          ></Navigate>
        )}
        <div className="mx-auto max-w-5xl px-6 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
            <div className="lg:col-span-3">
              <form
                className="bg-white px-5"
                noValidate
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  dispatch(
                    updateUserAsync({
                      ...user,
                      addresses: [...user.addresses, data],
                    })
                  );
                  reset();
                })}
              >
                <div className="space-y-1 py-6">
                  <div className="border-b border-gray-900/10 pb-8">
                    <h2 className="flex flex-1 items-end justify-between text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="flex flex-1 items-end justify-between mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive your order.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                      <div className="sm:col-span-full">
                        <label
                          htmlFor="name"
                          className="flex flex-1 items-end justify-between block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "Name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="email"
                          className="flex flex-1 items-end justify-between block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "Email is required",
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="phone"
                          className="flex flex-1 items-end justify-between block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "Phone Number is required",
                            })}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="country"
                          className="flex flex-1 items-end justify-between block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <div className="mt-2">
                          <select
                            id="country"
                            {...register("country", {
                              required: "Country is required",
                            })}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          >
                            <option>Choose One</option>
                            <option>United States</option>
                            <option>Canada</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="flex flex-1 items-end justify-between block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "Street is required",
                            })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="flex flex-1 items-end justify-between block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "City is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="flex flex-1 items-end justify-between block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "Province is required",
                            })}
                            id="state"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postalcode"
                          className="flex flex-1 items-end justify-between block text-sm font-medium leading-6 text-gray-900"
                        >
                          Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("postalcode", {
                              required: "Postal Code is required",
                            })}
                            id="postalcode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    </div>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12 py-4">
                    <h2 className="flex flex-1 items-end justify-between text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="flex flex-1 items-end justify-between mt-1 text-sm leading-6 text-gray-600">
                      Choose From Existing address
                    </p>
                    <ul
                      role="list"
                      className="divide-y divide-gray-100 border-solid border-2 border-gray-200"
                    >
                      {user.addresses.map((address, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              onChange={handleAddress}
                              value={index}
                              name="address"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                Name: {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Street: {address.street}
                              </p>
                              <p className="text-sm leading-6 text-gray-900">
                                City: {address.city}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              Postal Code: {address.postalcode}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              Country: {address.country}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              Province: {address.state}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              Phone: {address.phone}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <h3 className="flex flex-1 items-end justify-between mt-1 text-sm font-semibold leading-6 text-gray-900">
                          Payment Methods
                        </h3>
                        <p className="flex flex-1 items-end justify-between mt-1 text-sm leading-6 text-gray-600">
                          Choose One
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handlePayment}
                              checked={paymentMethod === "cash"}
                              value="cash"
                              id="cash"
                              name="payments"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handlePayment}
                              checked={paymentMethod === "card"}
                              value="card"
                              id="card"
                              name="payments"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Credit/Debit Card
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:col-span-3">
              <div className="mx-auto bg-white max-w-2xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Cart
                  </h1>
                  <div className="flow-root mt-10">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.product.id}>{item.product.title}</a>
                                </h3>
                                <p className="ml-4">${discountedPrice(item.product)}</p>
                              </div>
                              <p className="flex flex-1 items-end justify-between text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => handleQuantity(e, item)}
                                  value={item.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  onClick={(e) => handleRemove(e, item.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 border-b border-gray-200 px-4 py-6 sm:px-6">
                    <p>Number of Items in Cart</p>
                    <p>Items: {totalitems}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900 px-4 py-6 sm:px-6">
                    <p>Subtotal</p>
                    <p>${totalAmount}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Order Now and Pay
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Checkout;
