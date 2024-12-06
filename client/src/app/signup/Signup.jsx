import React, { useContext, useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { useRouter } from "next/navigation";
import useSignup from "../hooks/useSignup";
// import { AuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

function Signup() {
  const router = useRouter();
  const [inputs,setInputs] = useState({fullName:'',username:'',password:'',confirmPassword:'',gender:''});
  // const {signup} = useContext(AuthContext)
  const {loading,signup} = useSignup()

  function handleCheckboxChange(gender){
    setInputs({...inputs,gender})
  }

 async function handleSubmit(e){
    e.preventDefault();
  //   if (inputs.fullName || inputs.username || inputs.password || inputs.confirmPassword || inputs.gender){
  //     if(inputs.password==inputs.confirmPassword){
  //       if(inputs.password.length>=6){
  //         console.log(inputs);
          
  //         const response = await signup(inputs)
  //         if(response.status === 200){
  //         console.log(response);
  //       }
  //       }else{
  //         toast.error("Password must be at least 6 characters long");
  //       }
  //     }else{ toast.error("Passwords do not match")
  //   }
    
  // }
  // else{ toast.error("Please fill in all fields")
  // }
    await signup(inputs);
}
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SingUp
          <span className="text-blue-400"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-white label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Rahul Shrivastav"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-white label-text">UserName</span>
            </label>
            <input
              type="text"
              placeholder="RahulShrivastav"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs,username:e.target.value})}
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
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs,password:e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-white label-text"> Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
            />
          </div>
          <GenderCheckBox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />
          <a
            onClick={()=>{
              router.push('/login');
            }}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            
            {"Already"} have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2" 
            disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Signup;
