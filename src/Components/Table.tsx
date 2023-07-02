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
  const JobDesc:string=""
  function handleChangeCheckBox(dta:ICandidate|IJob){
    dta.ReliabilityTest=!dta.ReliabilityTest;
    updateCandidates(dta._id,dta)
  }
  
  return (
    <div className="table">
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
              
            <StyledTableRow key={d.name}> 
            
            {arr?.map((a:string)=>{
              
           if(name==="job" && a==="name")  { return <StyledTableCell align="left" component="th" scope="row"><Link to={`/candidatesdashboard/${d._id}`}>{d[a]}</Link></StyledTableCell>}
           else if(a==="rating"){return <StyledTableCell align="left" component="th" scope="row"><RatingC val={d[a]} cId={d._id} data={d}></RatingC></StyledTableCell>}
           else if(a==="logo" &&d[a]!=null){return <img src={d[a]} id="logo" width="60px" height="60px"></img>}
           else if(a==="logo" ){return <MdQuestionMark></MdQuestionMark>}
           else if((a==="cognitiveTest"||a==="personalityTest") &&d[a] ){return <StyledTableCell align="left" component="th" scope="row"><GiCheckMark ></GiCheckMark></StyledTableCell>}
           else if((a==="cognitiveTest"||a==="personalityTest") &&!d[a] ){return <StyledTableCell align="left" component="th" scope="row"><GiCrossMark ></GiCrossMark></StyledTableCell>}
           else if(a==="ReliabilityTest" &&!d[a]){return <StyledTableCell align="left" component="th" scope="row"><Checkbox {...label} onChange={()=>handleChangeCheckBox(d)}/></StyledTableCell>}
           else if(a==="ReliabilityTest" &&d[a]){return <StyledTableCell align="left" component="th" scope="row"><Checkbox {...label} defaultChecked onChange={()=>handleChangeCheckBox(d)}/></StyledTableCell>}
            else {return <StyledTableCell align="left" component="th" scope="row">{''+d[a]}</StyledTableCell>}
            })}
            </StyledTableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </div>
  );
}