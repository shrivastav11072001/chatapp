"use client";

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
  onlineUser: [],
}

export const SocketContext = createContext();

function reducer(state, action){

  switch(action.type){
    case "SET_SOCKET":
      return { ...state, socket: action.payload };
    case "SET_ONLINE_USERS":
      return { ...state, onlineUsers: action.payload };
    case "CLEAR_SOCKET":
      return { ...state, socket: null, onlineUsers: [] };
    default:
      return state;
  }
}


export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {AuthData} = useContext(AuthContext);
  useEffect(() => {
    if (AuthData) {
      const socketInstance = io("http://localhost:5000", {
        query: {
          userId: AuthData._id,
        },
      });

      // Set the socket instance in state
      dispatch({ type: "SET_SOCKET", payload: socketInstance });

      socketInstance.on("connect", () => {
        console.log("Connected:", socketInstance.id);
      });

      socketInstance.on("getOnlineUsers", (users) => {
        dispatch({ type: "SET_ONLINE_USERS", payload: users });
      });

      return () => {
        socketInstance.close();
        // Clear the socket state on cleanup
        dispatch({ type: "CLEAR_SOCKET" });
      };
    } else {
      if (state.socket) {
        state.socket.close();
        dispatch({ type: "CLEAR_SOCKET" });
      }
    }
  }, [AuthData]);
  return (
    <SocketContext.Provider value={{ socket: state.socket, onlineUsers: state.onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
