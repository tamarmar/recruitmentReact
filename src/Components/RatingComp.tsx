import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { updateCandidates} from '../Services/CandidatesService';
import { ObjectId } from 'bson';
import { ICandidate } from '../Models/CandidatesModel';
import { IJob } from '../Models/JobsModel';

interface Props{
    data:ICandidate | IJob;
}

export default function RatingC({data}:Props) {
  const [value, setValue] = React.useState<number | null>(data.rating);
  function handleChange(newValue:number | null) {
      if(newValue!=null)
        data.rating=newValue;
      updateCandidates(data._id,data)
  }

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleChange(newValue)
        }}
      />
    </Box>
  );
}