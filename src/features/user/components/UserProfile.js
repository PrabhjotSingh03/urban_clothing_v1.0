import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCount,
  selectUserInfo,
  updateUserAsync,
} from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { useForm } from "react-hook-form";

export default function ProfileUser() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  const editHandle = (updateAddress, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, updateAddress);
    dispatch(updateUserAsync(newUser));
    setEditSelectedIndex(-1);
  };

  const [editSelectedIndex, setEditSelectedIndex] = useState(-1);
  const [addAddressFormShow, setAddAddressFormShow] = useState(false);

  const editHandleForm = (index) => {
    setEditSelectedIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("country", address.country);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("postalcode", address.postalcode);
  };

  const removeHandle = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const addHandle = (address) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setAddAddressFormShow(false);
  };

  return (
    <div>
      <div className="mx-auto bg-white max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Name: {userInfo.name ? userInfo.name : "User"}
          </h1>
          <h2 className="text-1xl font-bold tracking-tight text-red-900">
            Email: {userInfo.email}
          </h2>
          {userInfo.role === "admin" && <h2 className="text-1xl font-bold tracking-tight text-red-900">
            Role: {userInfo.role}
          </h2>}
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          {/* Add Address Form */}
          <button
            onClick={(e) => {
              setAddAddressFormShow(true);
              setAddAddressFormShow(-1);
            }}
            type="submit"
            className="my-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Address
          </button>
          {addAddressFormShow ? (
            <form
              className="bg-white px-5"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                addHandle(data);
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
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : null}

          {/* All Address */}
          <p className="mt-0.5 text-sm text-gray-500">All Address:</p>
          {userInfo.addresses.map((address, index) => (
            <div key={index}>
              {editSelectedIndex === index ? (
                <form
                  className="bg-white px-5"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    editHandle(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-1 py-6">
                    <div className="border-b border-gray-900/10 pb-8">
                      <h2 className="flex flex-1 items-end justify-between text-2xl font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="flex flex-1 items-end justify-between mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive your
                        order.
                      </p>
                      {/* Address Edit Form */}
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
                          onClick={(e) => setEditSelectedIndex(-1)}
                          type="submit"
                          className="rounded-md px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : null}
              <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                <div className="flex min-w-0 gap-x-4">
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
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={(e) => editHandleForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => removeHandle(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
