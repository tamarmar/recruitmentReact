import { ObjectId } from "bson";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GTable from "../Components/Table";
import { ICandidate } from "../Models/CandidatesModel";
import { IJob } from "../Models/JobsModel";
import { getCandidates, getCandidatesByJobId} from '../Services/CandidatesService';
import { getJobById } from "../Services/JobService";


export default function CandidatesDashboard(){
    const {id} = useParams();
    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [job, setJob] = useState<IJob>();
    const arr:string[]=["name","email","jobId","rating","cognitiveTest","personalityTest","ReliabilityTest"]
            
     useEffect(() => {
         
       const fetchCandidate = async () => {
           if(id!=null){
            setJob(await getJobById(id));
            var candidatesData = await getCandidatesByJobId(id);
           }   
         setCandidates(candidatesData);
       };
       fetchCandidate();
     }, []);
    return(
        <div className="CandidatesDashboard">
            <h1>Candidates Dashboard</h1>
            {job !=null && <h2>{job.name}</h2>}
            {job !=null &&  job.logo!=null && <div><img src={job.logo} width="80px" height="70px"></img></div>}
            <GTable data = {candidates} arr={arr} name="candidate"></GTable>
        </div>
    )
}