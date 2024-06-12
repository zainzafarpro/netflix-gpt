import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// this auth represents the most updated value of currentUser,
import { auth } from "../utils/firebase";
import validation from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Register = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function handleSubmit() {
    const result = validation(email.current.value, password.current.value);
    setError(result.error);

    if (result.valid === false) return;

    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name.current.value,
        })
          .then(() => {
            const { uid, displayName, email } = auth.currentUser;
            dispatch(addUser({ uid, displayName, email }));
          })
          .catch((error) => {
            // An error occurred
            setError(error + "An error occurred");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setError(`${errorCode}: ${errorMessage}`);
      });
  }

  return (
    <div className="bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/81fe52dd-5b43-4b5c-975a-436256a1778d/PK-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg)] bg-cover">
      <div className="min-h-dvh flex flex-col items-center justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="py-12 px-20 w-4/12 bg-black/80 text-white"
        >
          {error ? (
            <div className="w-full bg-red-600 text-white rounded mb-2 py-1 px-4">
              {error}
            </div>
          ) : null}

          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
          <input
            ref={name}
            type="text"
            className="w-full bg-transparent border border-slate-600 py-3 px-5 mb-5 rounded focus:outline-none"
            placeholder="Username"
          />
          <input
            ref={email}
            type="text"
            className="w-full bg-transparent border border-slate-600 py-3 px-5 mb-5 rounded focus:outline-none"
            placeholder="Email"
          />
          <input
            ref={password}
            type="password"
            className="w-full bg-transparent border border-slate-600 py-3 px-5 mb-5 rounded focus:outline-none"
            placeholder="Password"
          />
          <button
            className="bg-red-700 py-2 px-4 w-full rounded hover:bg-red-800 transition"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
