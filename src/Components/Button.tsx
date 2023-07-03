import { Button } from '@mui/material';
import { ComponentType, ReactNode, useState } from 'react';

type Props = {
  component: ComponentType<any>;
  children: ReactNode;
  nav:string;
  func:() => void;
};

export const ButtonG = ({ component: Component, children,nav,func }: Props) => {
    function handleClick(){
        if(nav==="addJob")
            func()
    }
    
  return (
      <div className="button">
        <Button variant="outlined" id="btn" onClick={handleClick}>{children }<div>. .</div> <Component ></Component></Button>
    </div>
  )
};