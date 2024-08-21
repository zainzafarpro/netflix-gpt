import { useRef, useState } from "react";
import validation from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";
// this auth represents the most updated value of currentUser,
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  function handleSubmit() {
    const result = validation(
      "Lorem",
      email.current.value,
      password.current.value
    );
    setError(result.error);

    if (result.valid === false) return;

    setIsPending(true);

    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then(() => {
        setIsPending(false);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsPending(false);
        setError(`${errorCode}: ${errorMessage}`);
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

            <h1 className="text-3xl font-bold mb-6">Sign In</h1>
            <input
              ref={email}
              type="text"
              className="w-full bg-transparent border border-slate-600 py-3 px-5 mb-5 rounded focus:outline-none"
              placeholder="Email"
              required
            />
            <input
              ref={password}
              type="password"
              className="w-full bg-transparent border border-slate-600 py-3 px-5 mb-5 rounded focus:outline-none"
              placeholder="Password"
              required
            />
            <button
              disabled={isPending}
              className={`bg-red-700 py-2 px-4 w-full rounded hover:bg-red-800 transition ${
                isPending ? "opacity-80 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="text-sm font-thin">
            Don't have an account?{" "}
            <Link className="underline font-semibold" to="/register">
              Sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
