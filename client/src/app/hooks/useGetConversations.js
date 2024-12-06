import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { API } from "@/Utils/Utils";
import { AuthContext } from "../context/AuthContext";

const useGetConversations = () => {
    const {AuthData} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        API.interceptors.request.use((req) => {
          if (AuthData && AuthData.token) {
            req.headers.Authorization = `Bearer ${AuthData.token}`;
          } else {
            console.log("Authorization token is missing");
            
          }
          return req;
        });
        const res = await API.get("/users");
        const data = res.data;
        setConversations(data);
        
        

        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.log(error);

        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
