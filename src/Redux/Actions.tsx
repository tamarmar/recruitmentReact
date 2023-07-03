import { getCandidatesByJobId } from "../Services/CandidatesService";
import { getJobs } from "../Services/JobService";
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { JobState } from "./Reducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { IJob } from "../Models/JobsModel";

// jobActions.ts
export const fetchJobs = (): ThunkAction<Promise<void>, JobState, unknown, AnyAction> => {
    return async (dispatch: ThunkDispatch<JobState, unknown, AnyAction>) => {
        try {
            // Fetch job data from API
            const jobsData = await getJobs();
            if (jobsData === undefined) {
              throw new Error('No data received from API');
            }
            // Dispatch action to update job state in Redux store
            dispatch({ type: 'FETCH_JOBS', payload: jobsData });
          } catch (error) {
            console.error('Error fetching jobs:', error);
          }
    };
  };
  export const updateJob = (jobId: string, updatedJob: IJob): ThunkAction<Promise<void>, JobState, unknown, AnyAction> => {
    return async (dispatch: ThunkDispatch<JobState, unknown, AnyAction>) => {
      try {
        // Perform update operation on the API using jobId and updatedJob
        // ...
        updateJob(jobId,updatedJob);
        // Dispatch action to update job state in Redux store
        dispatch({ type: 'UPDATE_JOB', payload: { jobId, updatedJob } });
      } catch (error) {
        // Handle error
        console.error('Error updating job:', error);
      }
    };
  };
  
  export const deleteJob = (jobId: string): ThunkAction<Promise<void>, JobState, unknown, AnyAction> => {
    return async (dispatch: ThunkDispatch<JobState, unknown, AnyAction>) => {
      try {
        // Perform delete operation on the API using jobId
        // ...
        deleteJob(jobId);
        // Dispatch action to remove job from Redux store
        dispatch({ type: 'DELETE_JOB', payload: jobId });
      } catch (error) {
        // Handle error
        console.error('Error deleting job:', error);
      }
    };
  };

  
  // candidateActions.ts
  export const fetchCandidates = (jobId: string) => {
    return async (dispatch: any) => {
      try {
        const candidatesData = await getCandidatesByJobId(jobId)
        // Dispatch action to update candidate state in Redux store
        dispatch({ type: 'FETCH_CANDIDATES', payload: candidatesData });
      } catch (error) {}
    };
  };