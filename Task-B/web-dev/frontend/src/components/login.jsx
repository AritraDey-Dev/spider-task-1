import { useState } from "react"
import Form from "./form"
import axios from "axios"
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"

export default function Login(){
const navigate=useNavigate()
        const [username,setUsername]=useState("")
        const[password,setPassword]=useState("")
        const [__,setCookies]=useCookies(["access_token"])
   const onSubmit=async (event)=>{
    event.preventDefault();
    try{
        const response=await axios.post("http://localhost:3000/auth/login",{username,password})
        setCookies("access_token",response.data.token);
        window.localStorage.setItem("userID",response.data.userID)
navigate("/")
toast.success("Successfully Logged  in")
    }catch(e){
    toast.error(e)
    }
   }


    return (
        <Form username={username} 
        setUsername={setUsername} 
        password={password}
         setPassword={setPassword} name="Login" onSubmit={onSubmit}/>
    )

}