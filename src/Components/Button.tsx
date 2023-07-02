import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ComponentType, ReactNode, useState } from 'react';
import Add from './Add';

type Props = {
  component: ComponentType<any>;
  children: ReactNode;
  nav:string;
  func:() => void;
};

export const ButtonG = ({ component: Component, children,nav,func }: Props) => {
  const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
      };
    function handleClick(){
        if(nav==="addJob")
            setOpen(true);
        else
            func()
    }
    
  return (
      <div className="button">
        <Button variant="outlined" id="btn" onClick={handleClick}>{children }<div>. .</div> <Component ></Component></Button>
        <Add type="job" open={open} onClose={handleClose}></Add>
    </div>
  )
};