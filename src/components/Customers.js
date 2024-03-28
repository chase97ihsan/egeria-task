import { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../contexts/CustomerContext";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";

export default function Customers({ head, body }) {
  const { getCustomers, customers } = useContext(CustomerContext);
  useEffect(() => {
    const fetchOrders = async () => {
      await getCustomers();
    };

    fetchOrders();
  }, []);

  if (!body || body == {}) {
    return <div className="empty-page">It's empty</div>;
  }

  return (
    <div className="overflow-auto" style={{ maxHeight: "100vh" }}>
      {" "}
      <table
        className="table table-dark  table-striped table-hover"
        style={{ minHeight: "100vh" }}
      >
        <thead className="table-dark border border-success  border-3 text-nowrap">
          <tr>
            {head.map((h, key) => (
              <th className="col text-secondary fs-5" key={key}>
                {h.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((items, rowIndex) => (
            <tr key={rowIndex}>
              {items.map((item, cellIndex) => (
                <td key={cellIndex}>
                  {Array.isArray(item) ? (
                    <div className="btn-group gap-1 text-nowrap">{item}</div>
                  ) : (
                    item
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
