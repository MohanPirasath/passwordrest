
import './App.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import {Route, Routes, useNavigate } from "react-router-dom"
import { useState } from 'react';

const API="https://day44-passwordrest.herokuapp.com"

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Routes>
        <Route
        path="/"
          element={<Login/>}>
        </Route>
        <Route
        path="/restpassword"
          element={<Userexist/>}>
        </Route>
        <Route
        path="/resetpassword"
          element={<Password/>}>
        </Route>
      </Routes>
    </div>
  );
}

function Login(){
  const navigate = useNavigate()
  return(
    <div className="login">
         <TextField id="standard-basic" label="Username" variant="standard" />
         <TextField id="standard-basic" label="Password" variant="standard" />
         <Button onClick={()=>{
          navigate("/restpassword")
         }}>Forgot password</Button>
         <div>
          <Button variant='contained'>Submit</Button>
         </div>
    </div>
  )
}
function Userexist(){
  const navigate = useNavigate()

const exist=async (event)=>{
  try{
    const fix= await fetch(`${API}/checkuser`, {
    method: "POST",
    body: JSON.stringify({
      username:Username
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
//   if(exist.status==200){
// window.alert("user exist")
//   }else{
//     window.alert("user not exist")
//   }

  if(fix.status === 400 || !fix) {
    window.alert("Invalid credentials");
  } else {
    // localStorage.setItem("username", values.temuser);
    window.alert("user exist");
navigate("/ResetPassword")

  }
  }
  catch(err){
    console.log(err)
  }
}

  const [Username,setuser]=useState()

  return(
    <div className='login'>
         <TextField id="standard-basic" label="Username" variant="standard" onChange={(e)=>{
          setuser(e.target.value)
         }} />
         <div >
         <Button sx={{marginTop:"10%"}} variant='contained' onClick={exist}>Submit</Button>
         </div>

    </div>
  )
}
function Password(){
  const exist= async()=>{
    try{
    const fix= await fetch(`${API}/Restpassword`, {
      method: "POST",
      body: JSON.stringify({
        username:Username,
        Password:Password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(fix.status===200){
  window.alert("Password reset successfully")
    }else{
      window.alert("something went worng")
    }
  }catch(err){
    console.log(err)
  }
  }
  
  const [Username,setuser]=useState()
  const [Password,setpass]=useState()

  return(
    <div>
      <div className="login">
         <TextField id="standard-basic" label="Username" variant="standard" onChange={(e)=>{
          setuser(e.target.value)
         }} />
         <TextField id="standard-basic" label="Password" variant="standard"  onChange={(e)=>{
          setpass(e.target.value)
         }}/>
        
         <div>
          <Button variant='contained' sx={{marginTop:"10%"}} onClick={exist}> Submit</Button>
         </div>
    </div>
    </div>
  )
}

export default App;
