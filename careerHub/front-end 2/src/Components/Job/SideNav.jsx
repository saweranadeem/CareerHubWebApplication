import React from 'react';
import { Link } from 'react-router-dom';



const SideNav = () => {

    const auth = JSON.parse(localStorage.getItem('user'));
    const userId = auth?._id; // Get userId from auth
    // const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center md:items-start p-4 md:ml-4 space-y-4">
            <Link to="/jobs/post-job" className="w-full md:w-auto">
                <button className="w-full md:w-auto bg-primary hover:bg-orange-400 text-white font-bold py-2 px-5 ml-5 rounded">
                    Post a Job
                </button>
            </Link>
            <Link to="/myJobs" className="w-full md:w-auto">
                <button className="w-full md:w-auto bg-primary hover:bg-orange-400 text-white font-bold py-2 px-7 ml-5 rounded">
                    My Jobs
                </button>
            </Link>
            {/* <Link to={`/skills/${userId}`} className="w-full md:w-auto">
                <button className="w-full md:w-auto bg-primary hover:bg-orange-400 text-white font-bold py-2 px-5 md:px-10 ml-5 rounded">
                Skills
                </button>
            </Link> */}
        </div>
    );
};

export default SideNav;
