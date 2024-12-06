import { useContext, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { axios,API } from "@/Utils/Utils";
import { AuthContext } from "../context/AuthContext";

function useSendMessage() {
    const {AuthData} = useContext(AuthContext);
    const [loading,setLoading] = useState(false);
    const {setMessages,messages,selectedConversation, setSelectedConversation}= useConversation();

    const sendMessage = async(message)=>{
        setLoading(true)
        try {
            API.interceptors.request.use((req) => {
                if (AuthData && AuthData.token) {
                  req.headers.Authorization = `Bearer ${AuthData.token}`;
                } else {
                  console.log("Authorization token is missing");
                  
                }
                return req;
              });
            const res = await API.post(`/messages/send/${selectedConversation._id}`,{message});
            const data = res.data;
            console.log(data);
            
            if(data.error){
                throw new Error(data.error);
            }
            setMessages([...messages,data])
        } catch (error) {
            console.log(error);
            
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
  return {sendMessage,loading}
}

export default useSendMessage