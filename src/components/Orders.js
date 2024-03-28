import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../contexts/OrderContext";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";

export default function Orders({ head, body }) {
  const {
    getOrders,
    orders,
    getFilteredOrdersByObjkey,
    getFilteredOrdersByCustomername,
  } = useContext(OrderContext);

  const [objkeyFilter, setObjkeyFilter] = useState("");
  const [customerNameFilter, setCustomerNameFilter] = useState("");
  useEffect(() => {
    const fetchOrders = async () => {
      await getOrders();
    };

    fetchOrders();
  }, []);

  const onChangeObjkey = (value) => {
    if (value === "") {
      getOrders();
    }
  };
  const onChangeCustomerName = (value) => {
    if (value === "") {
      getOrders();
    }
  };

  if (!body || body == {}) {
    return <div className="empty-page">It's empty</div>;
  }

  return (
    <div className="overflow-auto" style={{ maxHeight: "100vh" }}>
      <div className="w-25 mt-3 ms-3">
        <h3 className="text-light">
          FILTER ORDERS
          <i className="fa-solid fa-turn-down text-danger ms-3"></i>
        </h3>
        <div class="input-group mb-3">
          <button
            class="btn btn-danger"
            type="button"
            id="button-addon1"
            onClick={() => {
              getFilteredOrdersByObjkey(objkeyFilter);
            }}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <input
            type="text"
            class="form-control"
            placeholder="Filter with objkey"
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            value={objkeyFilter} // State'i input değeri olarak belirleyin
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                getFilteredOrdersByObjkey(objkeyFilter);
              }
            }}
            onChange={(e) => {
              setObjkeyFilter(e.target.value);
              onChangeObjkey(e.target.value);
            }}
          />
        </div>

        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Filter with customer name"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={customerNameFilter} // State'i input değeri olarak belirleyin
            onChange={(e) => {
              setCustomerNameFilter(e.target.value);
              onChangeCustomerName(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                getFilteredOrdersByCustomername(customerNameFilter);
              }
            }}
          />
          <button
            class="btn btn-danger"
            type="button"
            id="button-addon2"
            onClick={() => {
              getFilteredOrdersByCustomername(customerNameFilter);
            }}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      ;
      <table className="table table-hover table-dark">
        <thead className="thead-light border border-success  border-3 text-nowrap ">
          <tr>
            {head.map((h, key) => (
              <th className="col text-secondary fs-5 " key={key}>
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
