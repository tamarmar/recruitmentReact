import { Grid } from "@mui/material";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { ObjectId } from "bson";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GTable from "../Components/Table";
import { ICandidate } from "../Models/CandidatesModel";
import { IJob } from "../Models/JobsModel";
import { fetchCandidates } from "../Redux/Actions";
import { getCandidates, getCandidatesByJobId} from '../Services/CandidatesService';
import { getJobById } from "../Services/JobService";


export default function CandidatesDashboard(){
    const {id} = useParams();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const candidates = useSelector((state: any) => state.candidate.candidates);
    // const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [job, setJob] = useState<IJob>();
    const arr:string[]=["name","email","jobId","rating","cognitiveTest","personalityTest","ReliabilityTest","interview","task","screeningCall"]
            
    //  useEffect(() => {
    //    const fetchCandidate = async () => {
    //        if(id!=null){
    //         setJob(await getJobById(id));
    //         var candidatesData = await getCandidatesByJobId(id);
    //        }   
    //      setCandidates(candidatesData.sort((a:ICandidate,b:ICandidate)=>b.rating-a.rating));
    //    };
    //    fetchCandidate();
    //  }, [candidates]);
    useEffect(() => {
        if(id!=null)
            dispatch(fetchCandidates(id));
            const fetchCandidate = async () => {
                       if(id!=null){
                        setJob(await getJobById(id));
                        // var candidatesData = await getCandidatesByJobId(id);
                       }   
                    //  setCandidates(candidatesData.sort((a:ICandidate,b:ICandidate)=>b.rating-a.rating));
                   };
                   fetchCandidate();
      }, [dispatch,candidates]);
    return(
        <div className="CandidatesDashboard">
            <Grid container spacing={3}>
                    <Grid item xs justifyContent="space-around">{job !=null && <h2>{job.name}</h2>}
            {job !=null &&  job.logo!=null && <div><img src={job.logo} width="80px" height="70px"></img></div>}</Grid>
                    <Grid item xs={6}><h1>Candidates Dashboard</h1></Grid>
                    <Grid item xs justifyContent="flex-end" sm={3} direction="column" alignItems="flex-end"><Grid item xs> </Grid><Grid item xs justifyContent="flex-end"><h3>{candidates.length} candidates</h3></Grid></Grid>
                </Grid>
            
            
            <GTable data = {candidates} arr={arr} name="candidate"></GTable>
        </div>
    )
}