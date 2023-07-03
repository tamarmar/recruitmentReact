import { getJobs} from '../Services/JobService';
import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { ObjectId } from 'bson';
import { IJob } from '../Models/JobsModel';
import { ICandidate } from '../Models/CandidatesModel';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import RatingC from './RatingComp';
import {MdQuestionMark} from 'react-icons/md';
import {GiCheckMark,GiCrossMark} from 'react-icons/gi';
import Checkbox from '@mui/material/Checkbox';
import { updateCandidates } from '../Services/CandidatesService';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const label = { inputProps: { 'aria-label': 'Checkbox demo' }}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


interface Props{
  data:IJob[] | ICandidate[];
  arr:string[];
  name:string;
}
export default function GTable({data,arr,name}:Props) {
  function handleChange(dta:ICandidate|IJob,a:string){
    switch(a){
      case "ReliabilityTest":
        dta.ReliabilityTest=!dta.ReliabilityTest;
        break;
      case "cognitiveTest":
        dta.cognitiveTest=!dta.cognitiveTest;
        break;
      case "personalityTest":
        dta.personalityTest=!dta.personalityTest;
        break;
      case "interview":
        dta.interview=!dta.interview;
        break;
      case "screeningCall":
        dta.screeningCall=!dta.screeningCall;
        break;
      case "task":
        dta.task=!dta.task;
        break;
    }
    updateCandidates(dta._id,dta)
  }
  
  return (
    <div>
    {data && <div className="table">
    {data.length==0 && <div>You need to insert data if you want to see something</div>}
    {data.length>0 &&<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          {arr.map((a:string)=>(
            <StyledTableCell align="left"> {a} </StyledTableCell>
          ))}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
              
            <StyledTableRow key={d._id}> 
            
            {arr?.map((a:string)=>{
              
           if(name==="job" && a==="name")  { return <StyledTableCell align="left" component="th" scope="row"><Link to={`/candidatesdashboard/${d._id}`}>{d[a]}</Link></StyledTableCell>}
           else if(a==="rating"){return <StyledTableCell align="left" component="th" scope="row"><RatingC data={d}></RatingC></StyledTableCell>}
           else if(a==="logo"){return (d[a]!=null)?<img src={d[a]} id="logo" width="60px" height="60px"/>:<MdQuestionMark></MdQuestionMark>}
           else if((a==="cognitiveTest"||a==="personalityTest"||a==="interview"||a==="screeningCall"||a==="task")){return <StyledTableCell align="left" component="th" defaultChecked={true} scope="row" onClick={()=>handleChange(d,a)}>{d[a]?<GiCheckMark></GiCheckMark>:<GiCrossMark ></GiCrossMark>}</StyledTableCell>}
           else if(a==="ReliabilityTest"){return <StyledTableCell align="left" component="th" scope="row">{d[a]?<Checkbox {...label} defaultChecked onChange={()=>handleChange(d,a)}/>:<Checkbox {...label} onChange={()=>handleChange(d,a)}/>}</StyledTableCell>}
            else {return <StyledTableCell align="left" component="th" scope="row">{''+d[a]}</StyledTableCell>}
            })}
            </StyledTableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </div>}
    </div>
  );
}