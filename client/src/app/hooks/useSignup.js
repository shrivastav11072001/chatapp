"use client"
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import {axios} from "@/Utils/Utils.js"
import { AuthContext } from "../context/AuthContext";


const useSignup = () => {
  const [loading,setLoading] = useState(false);
  const {dispatch}= useContext(AuthContext);

  const signup = async({fullName,username,password,confirmPassword,gender})=>{
    const success=handleInputError({fullName,username,password,confirmPassword,gender})
    if(!success) return;

    setLoading(true);
    try {
      const response=await axios.post("http://localhost:5000/auth/signup",{fullName,username,password,confirmPassword,gender});

      const data = await response.data;
      if(data.error){
        throw new Error(data.error);
      }
 
      dispatch({
        type:"SIGN_UP",
        payload:data
      })
    } catch (error) {
      toast.error(error.message)
    } finally {  
      setLoading(false); }
  }
  return {loading, signup}
}

export default useSignup

function handleInputError({fullName,username,password,confirmPassword,gender}) {
    if(!fullName || !username || !password || !confirmPassword || !gender){
      toast.error("Please fill in all the fields");
      return false;
    }

    if(password!==confirmPassword){
      toast.error("Passwords do not match");
      return false;
    }

    if(password.length<6){
      toast.error("Password should be at least 6 characters long");
      return false;
    }
    return true;
}