import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterNow from './components/common/RegisterNow/RegisterNow'
import ForgetPassword from './components/common/ForgetPassword/ForgetPassword'
// import NewPassword from './components/NewPassword/NewPassword001'
// import ForgetPasswordVerification from './components/ForgetPasswordVerification/ForgetPasswordVerification'
import ForgetPasswordVerification from './components/common/ForgetPasswordVerification/ForgetPasswordVerification'
// import Registration from './components/Registration/Registration'
import Registration from './components/common/Registration/Registration'
import StepperData from "./components/ip/StepperData"
import ForgetPasswordDetails from './components/common/PartialsView/ForgetPasswordDetails'
import VerifyOtpVerification from './components/common/PartialsView/VerifyOtpVerification'
import ChangedPasswordDetails from './components/common/PartialsView/ChangedPasswordDetails'
import Dashboard from './components/common/Dashboard/Dashboard'
import Profile from './components/common/Profile/Profile'
import Header from './components/common/DashboadPartial/Header'
import OttStepperData from './components/ott/OttStepperData'
import Checksession from './components/Checksession'
import Checklogout from './components/Checklogout'
import Logout from './components/common/Logout'
import View from './components/ip/IpView/IpView'
import IpView from './components/ip/IpView/IpView'

const App = () => {
  const token = localStorage.getItem('token');
  console.log(process.env.REACT_APP_BASE_URL);
  return (
    <div className='reactglobal'>
      <BrowserRouter>
        <Routes>
          <Route path='/logout' element={<Logout />} />
          <Route path="/" element={<Checklogout><RegisterNow /></Checklogout>} />
          <Route path='/forget-password' element={<Checklogout><ForgetPassword /></Checklogout>} />
          {/* <Route path="/newpassword" element={<NewPassword/>}/> */}
          <Route path='/password-verify' element={<Checklogout><ForgetPasswordVerification /></Checklogout>} />
          <Route path='/registration' element={<Checklogout><Registration /></Checklogout>} />

          <Route path='/dashboard' element={<Checksession><Dashboard /></Checksession>} />
          {/* <Route path='/forgetpassworddetails' element={<ForgetPasswordDetails/>}/>
          <Route path='/verifyotpdetails' element={<VerifyOtpVerification/>}/>
          <Route path='/changepassworddetails' element={<ChangedPasswordDetails/>}/> */}
          <Route path="/ip" element={<Checksession><StepperData /></Checksession>} />
          <Route path="/ip/:id" element={<Checksession><StepperData /></Checksession>} />
          <Route path="/ip/:id/:ip_step" element={<Checksession><StepperData /></Checksession>} />
          <Route path="/ip/view/:ip" element={<Checksession><IpView/></Checksession>} />
          <Route path='/ott' element={<OttStepperData />} />
          <Route path="/ott/:id" element={<Checksession><OttStepperData /></Checksession>} />
          <Route path="/ott/:id/:ip_step" element={<Checksession><OttStepperData /></Checksession>} />
        </Routes>
      </BrowserRouter>
      {/* <StepperData/> */}
    </div>
  )
}

export default App