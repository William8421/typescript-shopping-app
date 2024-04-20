import { useShoppingCart } from "../context/shoppingCartContext";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import formatCurrency from "../utilities/formatCurrency";
import CartItem from "./CartItem";

export default function Checkout() {
  const { isLoggedIn, openCloseSignInModal, openCloseSignUpModal, fetchData } =
    useUser();
  const { cartItems, calculateTotal } = useShoppingCart();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="checkout-container">
      <div className="checkout-items-container">
        {cartItems.map((item) => (
          <CartItem key={item.itemId} {...item} />
        ))}
        <div className="total">
          {cartItems.length !== 0 && (
            <div>
              <div>Total {formatCurrency(calculateTotal())}</div>
            </div>
          )}
        </div>
      </div>
      {isLoggedIn ? (
        <div className="checkout-form-container">
          <form id="checkout-form">
            <div className="form-group">
              Name:
              <input type="text" name="name" required />
            </div>
            <div className="form-group">
              Email:
              <input type="email" name="email" required />
            </div>
            <div className="form-group">
              Address:
              <input name="address" required />
            </div>
            <div className="form-group">
              Card Number:
              <input type="text" name="card-number" required />
            </div>
            <div className="form-group">
              Expiration Date:
              <input
                type="text"
                name="expiration-date"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              CVV:
              <input type="text" name="cvv" required />
            </div>
            <button className="main-button" type="submit">
              Place Order
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>
            Please{" "}
            <span
              className="switch-signIn-signUp"
              onClick={openCloseSignInModal}
            >
              Sign In
            </span>{" "}
            /{" "}
            <span
              className="switch-signIn-signUp"
              onClick={openCloseSignUpModal}
            >
              Sign up
            </span>{" "}
            to proceed
          </p>
        </div>
      )}
    </div>
  );
}
