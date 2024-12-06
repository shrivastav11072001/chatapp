import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    await login({ username, password });
  }

  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full w-full p-6 bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-400"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-white label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-white label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
            onClick={() => {
              router.push("/signup");
            }}
          >
            {"Don't"} have an account?
          </a>
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>  
  );
};

export default Login;
