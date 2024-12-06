import { useContext, useState } from "react"
import {axios} from "@/Utils/Utils.js"
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const useLogout= ()=>{
    const [loading,setLoading]= useState(false);
    const {dispatch}= useContext(AuthContext)
    const router = useRouter()

    const logout= async()=>{
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/auth/logout")
            const data = res.data;
            if(data.error){
                throw new Error(data.error);
            }
            dispatch({type:"LOGOUT"});
            router.push("login")

        } catch (error) {
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }
    return {loading,logout}
}
export default useLogout