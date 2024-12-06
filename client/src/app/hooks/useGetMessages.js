import { useContext, useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { API } from "@/Utils/Utils";
import { AuthContext } from "../context/AuthContext";

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { AuthData } = useContext(AuthContext);
  useEffect(() => {
    const getMessages = async () => {
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
        const res = await API.get(`/messages/${selectedConversation._id}`);
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);
  return { loading, messages };
}

export default useGetMessages;
