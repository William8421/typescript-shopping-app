import { NavLink } from "react-router-dom";
import About from "./About";

export default function Home() {
  return (
    <div className="home-container">
      <div className="background"></div>
      <div className="home-app-name">
        <h1>Shopping App</h1>
        <h4>
          We are dedicated to providing a seamless and enjoyable shopping
          experience for all our users. Whether you're here to browse, buy, or
          sell, our platform is designed to meet your needs.
        </h4>
        <NavLink className="start-shopping" to="/store">
          <h3>Start Shopping</h3>
        </NavLink>
      </div>
      <About />
    </div>
  );
}
