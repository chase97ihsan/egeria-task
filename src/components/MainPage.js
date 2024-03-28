import { useContext, useEffect, useState } from "react";
import Orders from "./Orders";
import { OrderContext } from "../contexts/OrderContext";
import { Route, Routes } from "react-router-dom";
import Customers from "./Customers";
import Suppliers from "./Suppliers";
import { CustomerContext } from "../contexts/CustomerContext";
import { SupplierContext } from "../contexts/SupplierContext";

export default function MainPage() {
  const { sendEmail, getOrders, orders, filteredOrders } =
    useContext(OrderContext);
  const { customers } = useContext(CustomerContext);
  const { suppliers, getSuppliers } = useContext(SupplierContext);
  const [emailDataList, setEmailDataList] = useState([]);

  useEffect(() => {
    if (orders) {
      const initialEmailDataList = orders.map(() => ({
        inputValue: "",
      }));
      setEmailDataList(initialEmailDataList);
    }
  }, [orders]);

  const sendData = (objKey, index) => {
    const dataToSend = {
      Email: emailDataList[index].inputValue,
      Objkey: objKey,
    };
    sendEmail(dataToSend);
    const newEmailDataList = [...emailDataList];
    newEmailDataList[index].inputValue = "";
    setEmailDataList(newEmailDataList);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Orders
              head={[
                { name: "Order No" },
                { name: "Customer Name" },
                { name: "Date Entered" },
                { name: "State" },
                { name: "ObjKey" },
                { name: "Send Information To Email", width: true },
              ]}
              body={
                orders &&
                orders.map((order, index) => [
                  order.orderNo,
                  order.customerName,
                  order.dateEntered,
                  order.state,
                  order.objkey,
                  [
                    <input
                      type="text"
                      placeholder="Email address"
                      value={emailDataList[index]?.inputValue || ""}
                      onChange={(e) => {
                        const newEmailDataList = [...emailDataList];
                        newEmailDataList[index].inputValue = e.target.value;
                        setEmailDataList(newEmailDataList);
                      }}
                    />,
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => sendData(order.objkey, index)}
                    >
                      Send
                    </button>,
                  ],
                ])
              }
            />
          }
        />

        <Route
          path="/customers"
          element={
            <Customers
              head={[
                { name: "Customer ID" },
                { name: "Customer Name" },
                { name: "Creation Date" },
                { name: "Association No" },
                { name: "ObjKey" },
              ]}
              body={
                customers &&
                customers.map((customer) => [
                  customer.customerId,
                  customer.name,
                  customer.creationDate,
                  customer.associationNo,
                  customer.objkey,
                ])
              }
            />
          }
        />

        <Route
          path="/suppliers"
          element={
            <Suppliers
              head={[
                { name: "Supplier ID" },
                { name: "Supplier Name" },
                { name: "Creation Date" },
                { name: "Association No" },
                { name: "ObjKey" },
              ]}
              body={
                suppliers &&
                suppliers.map((supplier) => [
                  supplier.supplierId,
                  supplier.name,
                  supplier.creationDate,
                  supplier.associationNo,
                  supplier.objkey,
                ])
              }
            />
          }
        />
      </Routes>
    </div>
  );
}
