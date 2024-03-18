import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div
      className="d-flex flex-column justify-content-start bg-dark vh-100"
      id="navbar"
    >
      <a className="navbar-brand mt-4" href="/">
        <img
          className="me-3"
          src="https://egeria.com.tr/frontend/assets/images/logo.png"
          width="120rem"
          height="50rem"
        />

        <img
          src=" https://egeria.com.tr/frontend/assets/images/ifs_icon.svg"
          width="60rem"
          height="30rem"
        />
      </a>
      <nav className="navbar  ms-4 mt-5">
        <ul className="nav nav-pills flex-column gap-4 text-start ">
          <li className="nav-item ">
            <NavLink className="nav-link" aria-current="page" to="/">
              <i class="fa-solid fa-truck-fast me-2"></i>
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              <i class="fa-solid fa-users me-2"></i>
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/suppliers">
              <i class="fa-solid fa-parachute-box me-2"></i>
              Suppliers
            </NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i class="fa-solid fa-gear me-2"></i>
              Settings
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i class="fa-solid fa-circle-question me-2"></i>
              Help
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
