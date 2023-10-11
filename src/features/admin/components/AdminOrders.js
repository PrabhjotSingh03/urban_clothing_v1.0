import { useEffect, useState } from "react";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectOrdersTotal,
} from "../../order/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const ordersTotal = useSelector(selectOrdersTotal);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-1 text-center">Order</th>
                  <th className="py-3 px-1 text-center">
                    Products - Price - Quantity
                  </th>
                  <th className="py-3 px-1 text-center">Total Amount</th>
                  <th className="py-3 px-1 text-center">Shipping Address</th>
                  <th className="py-3 px-1 text-center">Status</th>
                  <th className="py-3 px-1 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-1 text-center">
                      <div className="items-center">
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-1 text-center">
                      {order.items.map((item) => (
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.thumbnail}
                            />
                          </div>
                          <span>
                            {item.title} - ${item.price} - #{item.quantity}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-1 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <div>
                        <div>
                          {order.selectedAddress.name},{" "}
                          {order.selectedAddress.street},
                        </div>
                        <div>
                          {order.selectedAddress.city},{" "}
                          {order.selectedAddress.state},
                        </div>
                        <div>
                          {order.selectedAddress.postalcode},{" "}
                          {order.selectedAddress.country}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-5 h-5 cursor-pointer"
                            onClick={showHandle(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-5 h-5 cursor-pointer"
                            onClick={editHandle(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
