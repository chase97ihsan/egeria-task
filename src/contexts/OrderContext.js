import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

export const OrderContext = createContext();
function OrderContextProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrders = () => {
    axios
      .get("https://localhost:7140/Get/Order/All")
      .then((res) => {
        setOrders(res.data.result);
        console.log("okkkkk");
      })
      .catch((err) => {
        console.log("İşlem Başarısız" + ":" + err);
      });
  };

  const getFileterOrdersByObjkey = (objkey) => {
    setLoading(true);
    axios
      .get(`https://localhost:7140/Get/Order/ByObjkey/${objkey}`)
      .then((res) => {
        setFilteredOrders(res.data.result); // Filtrelenmiş verileri saklayın
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const getFileterOrdersByCustomername = (customerName) => {
    setLoading(true);
    axios
      .get(`https://localhost:7140/Get/Order/ByOrderNo/${customerName}`)
      .then((res) => {
        setFilteredOrders(res.data.result); // Filtrelenmiş verileri saklayın
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const sendEmail = (data) => {
    console.log("datam:" + data);
    axios
      .post("https://localhost:7140/api/Email/SendOrderInformation", data)
      .then((res) => {
        console.log("İşlem Başarılı!");
      })
      .catch((err) => {
        console.log("İşlem Başarısız" + ":" + err.message);
      });
  };

  return (
    <OrderContext.Provider
      value={{
        getOrders,
        orders,
        sendEmail,
        getFileterOrdersByObjkey,
        getFileterOrdersByCustomername,
        filteredOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
export default OrderContextProvider;
