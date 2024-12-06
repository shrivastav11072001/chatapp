import React from "react";
import useGetConversations from "@/app/hooks/useGetConversations";
import { getRandomEmoji } from "@/Utils/emojis";
import dynamic from "next/dynamic";
const NOSSR=dynamic(()=>import("./Conversation"),{ssr:false});


function Conversations() {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 h-2/3 flex flex-col overflow-auto">
      {
        conversations.map((conversation,Idx)=>(<NOSSR
        key={conversation._id}
        conversation={conversation}
        emoji={getRandomEmoji()}
        lastIdx={Idx=== conversations.length-1}
        />))
      }

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}

export default Conversations;