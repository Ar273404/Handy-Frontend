import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import App from "../App.jsx";
import FindJobsPage from "../component/FindJobsPage.jsx";
import HirePage from "../component/HirePage.jsx";
import Signup from "../Pages/Signup.jsx";
import Login from "../Pages/Login.jsx";
import JobSearch from "../Pages/JobSearch.jsx";
import WorkerDashboard from "../Pages/WorkerDashboard.jsx";
import ProviderDashboard from "../Pages/provider/ProviderDashboard.jsx";
import Chat from "../component/Worker/Chat.jsx";
import Applications from "../Pages/Application.jsx";
import ManageJobApplications from "../component/Provider/ManageJobApplication.jsx";
import CreateJobForm from "../Pages/CreateJobForm.jsx";
import WorkerProfile from "../Pages/WorkerProgile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/find-jobs/:profession",
        element: <FindJobsPage />,
      },
      {
        path: "/hire/:profession",
        element: <HirePage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/job-post",
        element: <CreateJobForm />,
      },
      {
        path: "/find-job",
        element: <JobSearch />,
      },
      {
        path: "/worker-dashboard",
        element: <WorkerDashboard />,
      },
      {
        path: "/provider-dashboard",
        element: <ProviderDashboard />,
      },
      {
        path: "/chat/:jobId/:providerId",
        element: <Chat />,
      },
      {
        path: "/applications",
        element: <Applications />,
      },
      {
        path: "/profile",
        element: <WorkerProfile />,
      },
      {
        path: "/provider/jobs/:jobId",
        element: <ManageJobApplications />,
      },
    ],
  },
]);

export default router;
