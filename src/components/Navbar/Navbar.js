import React from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import logo from '../../images/logo-2.png'
import {clearState} from '../../store/slices/userLoginSlice'


function Navbar() {

  let{isSuccess} = useSelector(state=>state.userLogin)
  let dispatch = useDispatch()
  
  //user logout
  const userLogout = () =>{
    //remove token from the local storage
    localStorage.removeItem('token')
    //reset the user slice
    let actionObj = clearState()
    dispatch(actionObj)
  }

  return (
    <div>
        {/* navbar */}
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark main-nav">
        <div className="container-fluid">
          <img src={logo} width="100px" className='ml-2' alt="logo" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {(isSuccess===true)?(
                <>
                  <li className="nav-item" onClick={userLogout}>
                    <NavLink className="nav-link mx-2 fw-bold"  to="/signin">Sign Out</NavLink>
                  </li>
                </>
                ):(
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link mx-2 fw-bold"  to="/" exact={true} end>Home</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link mx-2 fw-bold"  to="/aboutus">About Us</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link mx-2 fw-bold"  to="/signin">Sign In</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link mx-2 fw-bold"  to='/signup'>Sign Up</NavLink>
                    </li>
                  </>
                )
              }
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar