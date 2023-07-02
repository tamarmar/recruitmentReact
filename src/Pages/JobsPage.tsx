import { ButtonG } from "../Components/Button";
import { BiMessageAdd } from 'react-icons/bi';
import { useEffect, useState } from "react";
import { getJobs} from '../Services/JobService';
import { IJob } from "../Models/JobsModel";
import GTable from "../Components/Table";
import Addjob from "../Components/Add";

export default function JobsPage(){
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [open, setOpen] = useState(false);
    const arr:string[]=["name","JobDesc","CompanyDesc","demands","date","status","place","logo"]

    
    
     useEffect(() => {
       const fetchJobs = async () => {
         const jobsData = await getJobs();
         setJobs(jobsData);
       };
       fetchJobs();
     }, [jobs]);
    const func = () => {}
    return(
        <div className="jobs-page">
            <h1>Recruitment</h1>
            <ButtonG component={BiMessageAdd} nav="addJob" func={func}><div>Add job</div></ButtonG>
            <GTable data={jobs} arr={arr} name="job"></GTable>
            
        </div>
    )
}