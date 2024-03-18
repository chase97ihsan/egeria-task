import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

export const SupplierContext = createContext();
function SupplierContextProvider({ children }) {
  const [suppliers, setSuppliers] = useState([]);

  const getSuppliers = () => {
    axios
      .get("https://localhost:7140/Get/Supplier/All")
      .then((res) => {
        setSuppliers(res.data.result);
      })
      .catch((err) => {
        console.log("İşlem Başarısız" + ":" + err);
      });
  };

  return (
    <SupplierContext.Provider
      value={{
        getSuppliers,
        suppliers,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}
export default SupplierContextProvider;
