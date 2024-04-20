import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUser } from "../context/userContext";

type SignInModalProps = {
  isSignInModalOpen: string;
  openCloseSignInModal: () => void;
};

export default function SignIn({
  isSignInModalOpen,
  openCloseSignInModal,
}: SignInModalProps) {
  const { signIn, errorMessage, openCloseSignUpModal } = useUser();
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const [passToggle, setPassToggle] = useState({
    showPassword: "",
  });

  function show_hidePassword(e: string) {
    setPassToggle({
      ...passToggle,
      showPassword: e === passToggle.showPassword ? "" : e,
    });
  }

  function signInFormHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const element = e.target.name;
    const value = e.target.value;
    setSignInForm((prevState) => {
      return { ...prevState, [element]: value };
    });
  }
  function switchToSignUp(): void {
    openCloseSignInModal();
    openCloseSignUpModal();
  }
  async function submit(e: any) {
    e.preventDefault();
    const userData = {
      email: signInForm.email,
      password: signInForm.password,
    };
    signIn(userData);
  }

  return (
    <div>
      <div
        className={`hidden-div ${isSignInModalOpen}`}
        onClick={openCloseSignInModal}
      ></div>
      <div className={`modal ${isSignInModalOpen}`}>
        <div className=" modal-header">
          <h2>Sign In</h2>
          <button className="close-button" onClick={openCloseSignInModal}>
            X
          </button>
        </div>

        <div className="form-container" onChange={signInFormHandler}>
          <form onSubmit={submit}>
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
            <button className="main-button" type="submit">
              Sign In
            </button>
            <p>
              No account yet?{" "}
              <span className="switch-signIn-signUp" onClick={switchToSignUp}>
                Sign Up
              </span>
            </p>
            {errorMessage && <div>{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export {};
