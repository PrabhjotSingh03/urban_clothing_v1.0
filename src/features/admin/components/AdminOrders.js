import { useEffect, useState } from "react";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectOrdersTotal,
} from "../../order/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  EyeIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { discountedPrice } from "../../../app/constants";
import { orderUpdateAsync } from "../../order/orderSlice";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const ordersTotal = useSelector(selectOrdersTotal);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const editHandle = (order) => {
    setEditableOrderId(order.id);
  };
  const updateHandle = (e, order) => {
    const orderUpdated = { ...order, status: e.target.value };
    dispatch(orderUpdateAsync(orderUpdated));
    setEditableOrderId(-1);
  };

  const pageHandle = (page) => {
    setPage(page);
  };

  const sortHandle = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const showHandle = () => {};

  const chooseColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      case "Processing":
        return "bg-blue-200 text-blue-800";
      case "Shipped":
        return "bg-purple-200 text-purple-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      default:
        return "bg-grey-200 text-grey-800";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="overflow-x-auto">
      <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-1 text-center cursor-pointer"
                    onClick={(e) =>
                      sortHandle({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order {' '}
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-1 text-center">
                    Products - Price - Quantity
                  </th>
                  <th
                    className="py-3 px-1 text-center cursor-pointer"
                    onClick={(e) =>
                      sortHandle({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount {' '}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-1 text-center">Shipping Address</th>
                  <th className="py-3 px-1 text-center">Status</th>
                  <th className="py-3 px-1 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
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
                              src={item.product.thumbnail}
                              alt={item.product.title}
                            />
                          </div>
                          <span>
                            {item.product.title} - ${discountedPrice(item.product)} - #
                            {item.quantity}
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
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => updateHandle(e, order)}>
                          <option value="Pending">Pending</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-1 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-5 h-5 cursor-pointer"
                            onClick={(e) => showHandle(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-5 h-5 cursor-pointer"
                            onClick={(e) => editHandle(order)}
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
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={pageHandle}
        totalItems={ordersTotal}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
