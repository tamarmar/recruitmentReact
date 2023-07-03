import { Dialog } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcAddImage } from 'react-icons/fc';
import '../Components/add.css';
import {createJob} from '../Services/JobService';
import { ButtonG } from './Button';

interface FormData {
  name: string;
  place?: string;
  CompanyDesc?:string;
  JobDesc: string;
  demands:string;
  status:boolean;
  date:string;
  logo?:string;
}
var idCardBase64:string;
interface Props{
    type:string;
    open: boolean;
    onClose: () => void;
}


export default function Add({type,  open,onClose}:Props) {
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();
  const func = () => {
    document.getElementById('image-upload')?.click()
  }
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      getBase64(file, (result) => {
        idCardBase64 =result as string;
   });
    }
  };
  const getBase64 = (file: File, cb: (result: string | ArrayBuffer | null) => void) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };
const onSubmit = (formData: FormData) => {
    console.log(idCardBase64)
    if(formData.place=="")
        formData.place="---"
    if(formData.CompanyDesc=="")
        formData.CompanyDesc="---"
    const date=(new Date()).toISOString()
    formData.date=date.slice(0, 10);
    formData.status=true;
    if(idCardBase64!="")
        formData.logo=idCardBase64
    else
        formData.logo="---"
  createJob(formData);
  onClose();
}

  return (
      <Dialog open={open} onClose={()=>onClose()}>
      <div className="addjob">
          <h1>Add job</h1>
        <ButtonG component={FcAddImage} nav="addJob" func={func}><div>Add company logo</div><input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      /></ButtonG>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name",{required:'Name is required',maxLength: {value: 20, message: 'Name should not exceed 20 characters'}})} placeholder="Job name"/>
        {errors.name && <span>{errors.name.message}</span>}
        <input {...register("place")} placeholder="place" />
        <textarea {...register("CompanyDesc")} placeholder="Company description" />
        <textarea {...register("JobDesc",{required:'Description is required',pattern: /^[A-Za-z]+$/i})} placeholder="Job description"/>
        {errors.JobDesc && <span>{errors.JobDesc.message}</span>}
        <textarea {...register("demands",{required:'Demands is required'})} placeholder="Demands"/>
        {errors.demands && <span>{errors.demands.message}</span>}
        <input type="submit" />
        </form>
    </div>
    </Dialog>
  );
};
