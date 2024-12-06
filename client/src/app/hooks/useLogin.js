import { useContext, useState } from "react"
import {axios} from "@/Utils/Utils.js"
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const useLogin = () => {
    const [loading,setLoading]= useState(false);
    const {dispatch} = useContext(AuthContext);
    const router = useRouter();

    const login = async ({username,password})=>{

        const success=handleInputError({username,password})
        if(!success) return;
        setLoading(true);
        try {
            const res=await axios.post("http://localhost:5000/auth/login",{username,password});
            const data = await res.data;
            dispatch({
                type:"LOGIN",
                payload:data
            })

            router.push("/")
            if(data.error){
                throw new Error(data.error)
            }

        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
  return {loading,login}
}

export default useLogin

function handleInputError({username,password}) {
    if(!username || !password ){
      toast.error("Please fill in all the fields");
      return false;
    }
    return true;
}