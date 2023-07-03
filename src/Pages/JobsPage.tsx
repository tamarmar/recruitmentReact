import { ButtonG } from "../Components/Button";
import { BiMessageAdd } from 'react-icons/bi';
import { useEffect, useState } from "react";
import { getJobs} from '../Services/JobService';
import { IJob } from "../Models/JobsModel";
import GTable from "../Components/Table";
import Addjob from "../Components/Add";
import Add from "../Components/Add";
import { Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../Redux/Actions";
// import { AppDispatch } from "../Components/store";
import { ThunkDispatch } from "@reduxjs/toolkit";

export default function JobsPage(){
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const jobs = useSelector((state: any) => state.job.jobs);
    //const [jobs, setJobs] = useState<IJob[]>([]);
    const [countJobs, setCountJobs] = useState(0);
    const [open, setOpen] = useState(false);
    const arr:string[]=["name","JobDesc","CompanyDesc","demands","date","status","place","logo"]

    const handleClose = () => {
        setOpen(false);
      };
    function handleClick(){
        setOpen(true);
    }
    //     useEffect(() => {
    //         const fetchJobs = async () => {
    //             const jobsData = await getJobs();
    //             setJobs(jobsData);
    //             setCountJobs(jobs.length)
    //         }
    //         fetchJobs();
    //   }, [jobs]);  
       
    useEffect(() => {
        dispatch(fetchJobs());
        setCountJobs(jobs.length);
      }, [dispatch,jobs]);
    const func = () => {
        handleClick()
    }
    return(
        <div className="jobs-page">
            {/* <Paper sx={{p: 2, margin: 'auto', maxWidth: 1200,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}> */}
                <Grid container spacing={3}>
                    <Grid item xs justifyContent="space-around"><ButtonG component={BiMessageAdd} nav="addJob" func={func}><div>Add job</div></ButtonG></Grid>
                    <Grid item xs={6}><h1>Recruitment</h1></Grid>
                    <Grid item xs container spacing={1}><Grid item xs>total candidates </Grid>    <Grid item xs>jobs: {countJobs}</Grid></Grid>
                </Grid>
            {/* </Paper> */}
            <Add type="job" open={open} onClose={handleClose}></Add>
            <GTable data={jobs} arr={arr} name="job"></GTable>
        </div>
    )
}