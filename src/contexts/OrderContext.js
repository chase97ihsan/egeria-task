import { createContext, useContext, useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";

import axios from "axios";

export const OrderContext = createContext();
function OrderContextProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const getOrders = () => {
    axios
      .get("https://localhost:7140/Get/Order/All")
      .then((res) => {
        setOrders(res.data.result);
      })
      .catch((err) => {
        console.log("İşlem Başarısız" + ":" + err);
      });
  };

  const getFilteredOrdersByObjkey = (objkey) => {
    const filteredOrders = orders.filter((o) => {
      return o.objkey === objkey;
    });
    if (filteredOrders !== null && filteredOrders.length !== 0) {
      setOrders(filteredOrders);
    }
    return orders;
  };

  const getFilteredOrdersByCustomername = (customerName) => {
    const filteredOrders = orders.filter((o) => {
      return (
        o.customerName.replace(" ", "") ===
        customerName.replace(" ", "").toLocaleUpperCase("en-EN")
      );
    });
    if (filteredOrders !== null && filteredOrders.length !== 0) {
      setOrders(filteredOrders);
    }
    return orders;
  };

  const sendEmail = (data) => {
    console.log("datam:" + data);
    axios
      .post("https://localhost:7140/api/Email/SendOrderInformation", data)
      .then((res) => {
        toast.success("Email has been sent successfully!", {
          position: "top-right",
        });
      })
      .catch((err) => {
        toast.error("Email could not be sent!", {
          position: "top-right",
          transition: Bounce,
        });
        console.log("İşlem Başarısız" + ":" + err.message);
      });
  };

  return (
    <OrderContext.Provider
      value={{
        getOrders,
        orders,
        sendEmail,
        getFilteredOrdersByObjkey,
        getFilteredOrdersByCustomername,
        filteredOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
export default OrderContextProvider;
