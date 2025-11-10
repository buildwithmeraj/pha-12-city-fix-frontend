import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Error from "../pages/Error404";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddIssue from "../pages/issues/AddIssue";
import AllIssues from "../pages/issues/AllIssues";
import IssueDetails from "../pages/issues/IssueDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/issues", element: <AllIssues /> },
      {
        path: "/add-issue",
        element: (
          <PrivateRoutes>
            <AddIssue />
          </PrivateRoutes>
        ),
      },
      {
        path: "/issue/:id",
        element: (
          <PrivateRoutes>
            <IssueDetails />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default routes;
