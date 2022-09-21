import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import React from 'react';
// import Home from './components/Home/Home';
// import Signin from './components/Signin/Signin';
// import Signup from './components/Signup/Signup';
// import Aboutus from './components/Aboutus/Aboutus';
import Navbar from './components/Navbar/Navbar';
import {Home,Signin,Signup,Aboutus,NoMatch,Userprofile} from './components/Allcomponents';

function App() {

  

  return (
    <div className="App">
      <Navbar/>
      {/* routes */}
      <Routes>
        {/* route for home component */}
        <Route path="/" element={<Home/>}/>

        {/* route for aboutus component */}
        <Route path="/aboutus" element={<Aboutus/>}/>

        {/* route for singin comonent */}
        <Route path="/signin" element={<Signin/>}/>

        {/* route for signup component */}
        <Route path="/signup" element={<Signup/>}/>

        {/* route for userprofile component */}
        <Route path='/userprofile/:username' element={<Userprofile/>}/>

        {/* route for nomatch component */}
        <Route path="*" element={<NoMatch/>}/>


      </Routes>
    </div>
  );
}

export default App;
