import { useState } from "react"
import Form from "./form"
import {toast,Toaster}from "react-hot-toast"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register(){
const navigate=useNavigate();
        const [username,setUsername]=useState("")
        const[password,setPassword]=useState("")
   const handleSubmit=async (event)=>{
  event.preventDefault();
      try{
        await axios.post("http://localhost:3000/auth/register",{
            username,password,

        });
        toast.success("Registration Completed.Now Login");

  
      }catch(e){
        toast.error("Regiatration Failed pls try again later");
      }
   }

    return (
        <>
        <Toaster />
        <Form username={username} setUsername={setUsername} 
        password={password} setPassword={setPassword} 
        name="Register" onSubmit={handleSubmit}/>
        </>
    )

}