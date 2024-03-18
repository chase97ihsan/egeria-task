import logo from "./logo.svg";
import "./App.css";
import SideBar from "./components/SideBar";
import Orders from "./components/Orders";
import { Route, Routes } from "react-router-dom";
import Customers from "./components/Customers";
import Suppliers from "./components/Suppliers";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App d-flex">
      <div className="" style={{ width: "300px" }}>
        {" "}
        <SideBar />
      </div>
      <div className="w-100">
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
