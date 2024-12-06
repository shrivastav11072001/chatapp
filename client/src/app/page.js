"use client";
import dynamic from "next/dynamic";
import Main from "./home/Home";
import Signup from "./signup/Signup";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./login/Login";

const NoSSR = dynamic(()=>import("./home/Home"),{ssr:false});

export default function Home() {
  const{AuthData} = useContext(AuthContext)  
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      {
        AuthData ? <NoSSR/> : <Login/>
      }
    </div>
  );
}
