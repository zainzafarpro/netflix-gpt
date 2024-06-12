import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Browse from "./components/Browse";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { lazy } from "react";

const UpdateProfile = lazy(() => import("./components/UpdateProfile"));

const Layout = () => (
  <div>
    <Provider store={appStore}>
      <Header />
      <Outlet />
    </Provider>
  </div>
);

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/browse",
          element: <Browse />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/update-profile",
          element: <UpdateProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
