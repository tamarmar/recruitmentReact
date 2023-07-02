import { ObjectId } from "bson";

export interface IJob {
    _id:string;
    name: string;
    place?:string;
    CompanyDesc?:string;
    JobDesc:string
    demands:string;
    date:string;
    status:string;
    logo:string;
    [key: string]: any;
  }