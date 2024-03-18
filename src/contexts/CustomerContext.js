import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

export const CustomerContext = createContext();
function CustomerContextProvider({ children }) {
  const [customers, setCustomers] = useState([]);

  const getCustomers = () => {
    axios
      .get("https://localhost:7140/Get/Customer/All")
      .then((res) => {
        setCustomers(res.data.result);
      })
      .catch((err) => {
        console.log("İşlem Başarısız" + ":" + err);
      });
  };

  return (
    <CustomerContext.Provider
      value={{
        getCustomers,
        customers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
export default CustomerContextProvider;
