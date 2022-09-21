import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form';
import './Signin.css';
import brand from '../../images/logo-karun.png';
import {useSelector,useDispatch} from 'react-redux';
import {userLoginLifeCycle} from '../../store/slices/userLoginSlice';
import {useNavigate} from 'react-router-dom'

function Signin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let{register, handleSubmit, formState: {errors}} = useForm()
    let{userObj,isSuccess,isError,errMsg} = useSelector(state=>state.userLogin)

    let formSubmit=(userCredObj)=>{
        // console.log(userCredObj)
        let actionObj = userLoginLifeCycle(userCredObj)
        dispatch(actionObj)
    }

    useEffect(() => {
        console.log('use effect')
        if(isSuccess){
            navigate(`/userprofile/${userObj.username}`)
        }
    },[isSuccess, isError])

  return (
    <div className='Signin pb-5'>
            <h1 className="display-2 text-center text-dark fw-bold mb-4">Sign in</h1>
            <hr/>
            <div className='container bg-dark shadow-lg rounded p-3 form-wrapper mb-5' >
                <hr/>
                {/* invalid credentials  */}
                {isError===true && <p className='alert alert-danger fw-bold'>{errMsg}</p>}
                <form className='form text-center' onSubmit={handleSubmit(formSubmit)}>
                    {/* username */}
                    <div className='mb-4'>
                        <label htmlFor='username' className='form-label fw-semibold text-white'>Username</label>
                        <input type='text' id='username' placeholder='Username' className='form-control' {...register('username',{required:true})}></input>
                        {/* validation error message */}
                        {errors.username?.type=='required' && <p className='text-danger mt-1'>Username is required</p>}
                    </div>

                    {/* password */}
                    <div className='mb-4'>
                        <label htmlFor='password' className='form-label fw-semibold text-white'>Password</label>
                        <input type='password' id='password' placeholder='Password' className='form-control' {...register("password",{required:true})}></input>
                        {/* validation error message */}
                        {errors.password?.type=='required' && <p className='text-danger mt-1'>Password is required</p>}
                    </div>

                    {/* submit button */}
                    <div className='mb-4'>
                        <button type='submit' className='btn btn-success'>Sign In</button>
                    </div>
                </form>
                <div className='container rounded bg-light my-3 text-center'>
                    <img src={brand} width='250px' alt='brand'></img>
                </div>
        </div>
    </div>
  )
}

export default Signin