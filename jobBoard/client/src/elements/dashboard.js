import React from "react"
import JobPosterDash from "./jobPosterDash";
import JobSeekerDash from "./jobSeekerDash";

export default function UserDashboard(){
    const role = sessionStorage.getItem("role")
    return(
        <div>
            {
                role == "Job seeker"? <JobSeekerDash/>:<JobPosterDash/>
            }
        </div>
    )
}