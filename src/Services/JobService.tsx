
   import axios from 'axios';
import { ObjectId } from 'bson';

   const API_URL = 'http://localhost:3000/jobs';

   export const getJobs = async () => {
     const response = await axios.get(`${API_URL}`);
     return response.data;
   };

    export const getJobById = async (id:string) => {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
  };

   export const createJob = async (jobData: any) => {
     const response = await axios.post(`${API_URL}`, jobData);
     return response.data;
   };

   export const updateJob = async (jobId: string, jobData: any) => {
     const response = await axios.put(`${API_URL}/${jobId}`, jobData);
     return response.data;
   };

   export const deleteJob = async (jobId: string) => {
     const response = await axios.delete(`${API_URL}/${jobId}`);
     return response.data;
   };

