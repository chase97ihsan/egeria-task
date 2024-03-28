import { useContext, useEffect } from "react";
import Orders from "./Orders";
import { OrderContext } from "../contexts/OrderContext";
import { SupplierContext } from "../contexts/SupplierContext";

export default function Suppliers({ body, head }) {
  const { getSuppliers, suppliers } = useContext(SupplierContext);

  useEffect(() => {
    const fetchOrders = async () => {
      await getSuppliers();
    };

    fetchOrders();
  }, []);

  if (!body || body == {}) {
    return <div className="empty-page">It's empty</div>;
  }
  console.log(suppliers);
  return (
    <div className="overflow-auto " style={{ maxHeight: "100vh" }}>
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
