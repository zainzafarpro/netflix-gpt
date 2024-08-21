import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import validation from "../utils/validation";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/userSlice";
import { Link } from "react-router-dom";

const Register = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  function handleSubmit() {
    if (!name.current || !email.current || !password.current) {
      setError("Please fill out all fields.");
      return;
    }

    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const result = validation(nameValue, emailValue, passwordValue);
    setError(result.error);

    if (result.valid === false) return;

    setIsPending(true);

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsPending(false);
        return updateProfile(user, {
          displayName: nameValue,
        }).then(() => {
          return user;
        });
      })
      .then((user) => {
        const updatedUser = auth.currentUser;

        dispatch(updateUser(updatedUser.displayName));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsPending(false);
        setError(`${errorCode}: ${errorMessage}`);
        console.error("Error creating user or updating profile: ", error);
        console.error(
          `Error code: ${errorCode}, Error message: ${errorMessage}`
        );
      });
  }

  return (
    <div className="bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/81fe52dd-5b43-4b5c-975a-436256a1778d/PK-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg)] bg-cover">
      <div className="min-h-dvh flex flex-col items-center justify-center">
        <div className="py-12 px-20 w-4/12 bg-black/80 text-white">
          <form onSubmit={(e) => e.preventDefault()} className="mb-6">
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
              className={`bg-red-700 py-2 px-4 w-full rounded hover:bg-red-800 transition ${
                isPending ? "opacity-80 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="text-sm font-thin">
            Back to{" "}
            <Link className="underline font-semibold" to="/login">
              Login!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
