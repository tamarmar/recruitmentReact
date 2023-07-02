import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function HomePage(){
    const navigate = useNavigate();
    function handleClick(){
        navigate('/jobs');
    }
    return(
        <div className="home">
            <h1>Welcome to the best site of recruitment</h1>
            <Button variant="outlined" id="btn" onClick={handleClick}>Start here!</Button>
        </div>
    )
}