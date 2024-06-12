import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;

        dispatch(addUser({ uid, displayName, email }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        // User is signed out
        navigate("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  function handleSignout() {
    signOut(auth).catch((error) => {
      throw new Error(error);
    });
  }

  return (
    <div className="absolute bg-gradient-to-b from-black flex justify-between items-center pr-8">
      <div className="w-2/12">
        <Link to="/">
          <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            {!user ? (
              <Link to="/login" className="bg-red-700 text-white p-2 rounded">
                Sign in
              </Link>
            ) : (
              <Link
                onClick={handleSignout}
                className="bg-red-700 text-white p-2 rounded"
              >
                Sign Out
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
