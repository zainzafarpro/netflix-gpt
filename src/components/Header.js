import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { FaUser } from "react-icons/fa";
import { clearMovies } from "../utils/moviesSlice";
import logo from "../images/Netflix_Logo_PMS.png";

const Header = () => {
  const [dropShow, setDropShow] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user != null);
  const profile = useSelector((store) => store?.user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        setIsFetching(false);
        dispatch(addUser({ uid, displayName, email }));
      } else {
        dispatch(removeUser());
        setDropShow(false);
        // User is signed out
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  if (isFetching) {
    <>loading...</>;
  }

  function handleSignout() {
    signOut(auth)
      .then(() => {
        dispatch(clearMovies());
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  function handleDropDown() {
    setDropShow(!dropShow);
  }

  return (
    <div className="absolute bg-gradient-to-b from-black flex justify-between items-center pr-8 z-10">
      <div className="w-2/6 md:w-2/12">
        <Link to="/browse">
          <img src={logo} alt="netflix clone" />
        </Link>
      </div>
      <nav>
        <ul className="flex">
          <li>
            {!user ? (
              <Link to="/login" className="bg-red-700 text-white p-2 rounded">
                Sign in
              </Link>
            ) : (
              <div className="flex items-center">
                <Link
                  to="/search"
                  className="text-white bg-yellow-600 inline p-2 rounded mr-3 hover:bg-yellow-500 transition-colors"
                >
                  Search with AI
                </Link>
                <div className="relative">
                  <FaUser
                    className="text-red-600 text-2xl cursor-pointer hover:text-white"
                    onClick={handleDropDown}
                  />
                  {dropShow && (
                    <div className="dropdown absolute top-full right-0 bg-white shadow from-black w-32 p-2 text-center">
                      <ul>
                        <li className="border-b-[1px] border-b-black mb-2 pb-2">
                          <Link to="/update-profile">
                            {" "}
                            {profile?.displayName}
                          </Link>
                        </li>
                        <li className="border-b-[1px] border-b-black mb-2 pb-2">
                          <Link onClick={handleSignout}>Sign Out</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
