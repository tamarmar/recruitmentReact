import { ObjectId } from "bson";

export interface ICandidate {
    _id:string;
    name: string;
    email:string;
    jobId:string;
    rating:number;
    cognitiveTest?:boolean;
    personalityTest?:boolean;
    ReliabilityTest?:boolean;
    interview?:boolean;
    task?:boolean;
    screeningCall?:boolean;
    [key: string]: any;
  }