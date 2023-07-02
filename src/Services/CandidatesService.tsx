
   import axios from 'axios';
import { ObjectId } from 'bson';

   const API_URL = 'http://localhost:3000/candidates';

   export const getCandidates = async () => {
     const response = await axios.get(`${API_URL}`);
     return response.data;
   };
//    export const getCandidatesById = async (id:string) => {
//     const response = await axios.get(`${API_URL}/${id}`);
//     return response.data;
//   };
   export const getCandidatesByJobId = async (jobid:string) => {
    const response = await axios.get(`${API_URL}/${jobid}`);
    return response.data;
  };

   export const createCandidates = async (candidatesData: any) => {
     const response = await axios.post(`${API_URL}`, candidatesData);
     return response.data;
   };

   export const updateCandidates = async (candidatesId: string, candidatesData: any) => {
     const response = await axios.put(`${API_URL}/${candidatesId}`, candidatesData);
     return response.data;
   };

   export const deleteCandidates = async (candidatesId: string) => {
     const response = await axios.delete(`${API_URL}/${candidatesId}`);
     return response.data;
   };