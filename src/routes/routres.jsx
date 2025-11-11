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
import Profile from "../pages/auth/Profile";
import MyIssues from "../pages/auth/MyIssues";
import MyContributions from "../pages/auth/MyContributions";
import UpdateIssue from "../pages/issues/UpdateIssue";

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
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-issues",
        element: (
          <PrivateRoutes>
            <MyIssues />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-contributions",
        element: (
          <PrivateRoutes>
            <MyContributions />
          </PrivateRoutes>
        ),
      },
      { path: "/issues", element: <AllIssues /> },
      {
        path: "/report-issue",
        element: (
          <PrivateRoutes>
            <AddIssue />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update-issue/:id",
        element: (
          <PrivateRoutes>
            <UpdateIssue />
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
