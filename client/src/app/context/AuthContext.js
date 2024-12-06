"use client";

import { createContext, useEffect, useReducer } from "react";

let initialState = {};

if(typeof window !== "undefined" && window){
  initialState = JSON.parse(localStorage.getItem("chat-user"));
}
else {
  initialState = {}
}



export const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SIGN_UP":
      const initialState1 = { ...action.payload };
      localStorage.setItem("chat-user", JSON.stringify(initialState1));
      return initialState1;

    case "LOGOUT":
      localStorage.removeItem("chat-user");
      return {};
    case "LOGIN":
      const initialState2 = { ...action.payload };
      localStorage.setItem("chat-user", JSON.stringify(initialState2));
      return initialState2;

    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ AuthData: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
