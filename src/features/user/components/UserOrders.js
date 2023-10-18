import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount, selectUserInfo } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchUserOrdersAsync } from "../userSlice";
import { selectOrdersOfUser } from "../userSlice";
import { discountedPrice } from "../../../app/constants";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrdersOfUser);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync());
  }, [dispatch]);
  return (
    <div>
      {orders && orders.map((order, index) => (
        <div key={index}>
          <div className="mx-auto bg-white max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Order Id # {order.id}
              </h1>
              <h2 className="text-1xl font-bold tracking-tight text-red-900">
                Order Status: {order.status}
              </h2>
              <div className="flow-root mt-10">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
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
                              Quantity: {item.quantity}
                            </label>
                          </div>

                          <div className="flex"></div>
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
                <p>Items: {order.totalitems}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 px-4 py-6 sm:px-6">
                <p>Subtotal</p>
                <p>${order.totalAmount}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping Address:
              </p>
              <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                <div className="flex min-w-0 gap-x-4">
                  
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      Name: {order.selectedAddress.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      Street: {order.selectedAddress.street}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      City: {order.selectedAddress.city}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Postal Code: {order.selectedAddress.postalcode}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    Country: {order.selectedAddress.country}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    Province: {order.selectedAddress.state}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {order.selectedAddress.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
