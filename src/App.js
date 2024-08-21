import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Browse from "./components/Browse";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

const UpdateProfile = lazy(() => import("./components/UpdateProfile"));

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  const user = useSelector((store) => store.user != null);
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: user ? <Navigate to="/browse" /> : <Login />,
        },
        {
          path: "/browse",
          element: (
            <ProtectedRoute isLoggedin={user}>
              <Browse />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: user ? <Navigate to="/browse" /> : <Login />,
        },
        {
          path: "/register",
          element: user ? <Navigate to="/browse" /> : <Register />,
        },
        {
          path: "/update-profile",
          element: (
            <ProtectedRoute isLoggedin={user}>
              <Suspense fallback={<div>Loading...</div>}>
                <UpdateProfile />
              </Suspense>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
