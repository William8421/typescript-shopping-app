import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUser } from "../context/userContext";

type SignUpModalProps = {
  isSignUpModalOpen: string;
  openCloseSignUpModal: () => void;
};

export default function SignUp({
  isSignUpModalOpen,
  openCloseSignUpModal,
}: SignUpModalProps) {
  const { signingUp, errorMessage, openCloseSignInModal } = useUser();
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passToggle, setPassToggle] = useState({
    showPassword: "",
    showConfirmPassword: "",
  });

  function show_hidePassword(e: string) {
    if (e === "password") {
      setPassToggle({
        ...passToggle,
        showPassword: e === passToggle.showPassword ? "" : e,
      });
    } else if (e === "confirmPassword") {
      setPassToggle({
        ...passToggle,
        showConfirmPassword: e === passToggle.showConfirmPassword ? "" : e,
      });
    }
  }

  function switchToSignIn(): void {
    openCloseSignUpModal();
    openCloseSignInModal();
  }

  async function submit(e: any) {
    e.preventDefault();
    const userData = {
      username: signUpForm.username,
      firstName: signUpForm.firstName,
      lastName: signUpForm.lastName,
      email: signUpForm.email,
      password: signUpForm.password,
      confirmPassword: signUpForm.confirmPassword,
    };
    signingUp(userData);
  }

  function signUpFormHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const element = e.target.name;
    const value = e.target.value;
    setSignUpForm((prevState) => {
      return { ...prevState, [element]: value };
    });
  }

  return (
    <div>
      <div
        className={`hidden-div ${isSignUpModalOpen}`}
        onClick={openCloseSignUpModal}
      ></div>
      <div className={`modal ${isSignUpModalOpen}`}>
        <div className="modal-header">
          <h2>Sign Up</h2>
          <button className="close-button" onClick={openCloseSignUpModal}>
            X
          </button>
        </div>
        <div className="form-container" onChange={signUpFormHandler}>
          <form onSubmit={submit}>
            <div>
              Username
              <input type="text" name="username" />
            </div>
            <div>
              First name
              <input type="text" name="firstName" />
            </div>
            <div>
              Last name
              <input type="text" name="lastName" />
            </div>
            <div>
              Email
              <input type="email" name="email" />
            </div>
            <div className="password-container">
              Password
              <input
                type={
                  passToggle.showPassword === "password" ? "text" : "password"
                }
                name="password"
                required
                minLength={6}
                autoComplete=""
              />
              {passToggle.showPassword === "password" ? (
                <AiOutlineEyeInvisible
                  className="showHidePassword"
                  onClick={() => show_hidePassword("password")}
                />
              ) : (
                <AiOutlineEye
                  className="showHidePassword"
                  onClick={() => show_hidePassword("password")}
                />
              )}
            </div>
            <div className="password-container">
              Confirm password
              <input
                type={
                  passToggle.showConfirmPassword === "confirmPassword"
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                required
                minLength={6}
                autoComplete=""
              />
              {passToggle.showConfirmPassword === "confirmPassword" ? (
                <AiOutlineEyeInvisible
                  className="showHidePassword"
                  onClick={() => show_hidePassword("confirmPassword")}
                />
              ) : (
                <AiOutlineEye
                  className="showHidePassword"
                  onClick={() => show_hidePassword("confirmPassword")}
                />
              )}
            </div>
            <button className="main-button" type="submit">
              Sign Up
            </button>
            <p>
              Already a member?{" "}
              <span className="switch-signIn-signUp" onClick={switchToSignIn}>
                Sign In
              </span>
            </p>
            {errorMessage && <div>{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
