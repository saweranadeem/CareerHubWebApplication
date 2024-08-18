import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Job_Home from "../Pages/Job_Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import UpdateJob from "../Pages/UpdateJob";
import JobDetails from "../Pages/JobDetails";
import { user, skills } from '../Components/Job/data';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Job_Home /> },
      // {
      //   path: "/jobs/post-job",
      //   element: <CreateJob />,
      // },
      // {
      //   path: "/my-job",
      //   element: <MyJobs />,
      // },
      // {
      //   path: "/edit-job/:id",
      //   element: <UpdateJob />,
      //   loader: ({ params }) =>
      //     fetch(`http://localhost:3000/all-jobs/${params.id}`),
      // },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
      {
        path: "/dashboard",
        element: <Dashboard user={user} skills={skills}/>,
      },
      // {
      //   path: "/createJob",
      //   element: <CreateJob />,
      // },
    ],
  },
]);

export default router;
