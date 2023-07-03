import { combineReducers } from 'redux';
import { ICandidate } from '../Models/CandidatesModel';
import { IJob } from '../Models/JobsModel';
// jobReducer.ts
export interface JobState {
    jobs: IJob[];
  }
  
  const initialState: JobState = {
    jobs: [],
  };
  
  const jobReducer = (state : JobState = initialState, action: any) => {
    switch (action.type) {
      case 'FETCH_JOBS':
        return {
          ...state,
          jobs: action.payload,
        };
      default:
        return state;
    }
  };
  
  // candidateReducer.ts
  interface CandidateState {
    candidates: ICandidate[];
  }
  
  const initialStateC: CandidateState = {
    candidates: [],
  };
  
  const candidateReducer = (state = initialStateC, action: any) => {
    switch (action.type) {
      case 'FETCH_CANDIDATES':
        return {
          ...state,
          candidates: action.payload,
        };
      default:
        return state;
    }
  };
  
  // rootReducer.ts

  
  const rootReducer = combineReducers({
    job: jobReducer,
    candidate: candidateReducer,
  });
  
  export default rootReducer;