import React from 'react'
import './Userprofile.css'
import {useSelector} from 'react-redux'
import axios from 'axios';
import {useState} from 'react'

function Userprofile() {

    let {userObj} = useSelector(state => state.userLogin)
    let [message,setMessage]=useState("")

    
    let getPrivateInfo= async()=>{
       //get token from local storage
       let token = localStorage.getItem("token")
       let res = await axios.get("/users/private",{headers:{Authorization:token}})
       setMessage(res.data.message)

    }

  return (
    <div className='Userprofile container text-center shadow-lg rounded bg-dark text-light p-4 mt-5'>
      <h1 className='display-1 fw-bold'>Welcome,{userObj.username} </h1>
      <button onClick={getPrivateInfo} className='btn btn-warning d-block w-25 my-3 mx-auto'>Get Private Info!</button>
      <br/>

      <div className='container bg-light text-center shadow-lg rounded text-dark fw-bold p-4'>
            <p className='display-3'>{message}</p>
      </div>
    </div>
  )
}

export default Userprofile