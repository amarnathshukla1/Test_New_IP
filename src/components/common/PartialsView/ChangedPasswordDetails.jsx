import React, { useState } from 'react';
import IP from "../../../images/IP_Image.png"
import TajMahal from "../../../images/TajMahal.png"
import InputAdornment from '@mui/material/InputAdornment';
// import "../NewPassword/NewPassword.css"
// import "../components/common/NewPassword/NewPassword.css"
import "../../common/NewPassword/NewPassword.css"
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from 'react-router-dom';

const ChangedPasswordDetails = ( {changedPassword, errors, handlePasswordChange, handleSubmitChangedPassword}) => {

    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordOne, setShowPasswordOne] = React.useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = React.useState(false);
  
    const handleClickShowPasswordOne = () => setShowPasswordOne((show) => !show);
    const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);
  
    const handleMouseDownPasswordOne = (event) => {
      event.preventDefault();
    };
    const handleMouseDownPasswordTwo = (event) => {
      event.preventDefault();
    };

  return (
    <>
     <div className="container-fluid px-0 w-100 overflow-x-hidden position-absolute">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-6">
                    <img src={IP} alt='Indian Panorama' width="100%" height="773vh" />
                </div>
                <div className={"col-sm-12 col-md-12 col-lg-6 second-box"}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-1 col-md-1 col-lg-1'></div>
                            <div className='col-sm-10 col-md-10 col-lg-10'>
                                <h1 className='new_password_details'>New Password</h1>
                                <p className='login_with_email'>Registration is simply dummy text of the printing</p>
                                <form>
                                    <div className='input_field'>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            placeholder='Password'
                                            name="password"
                                            value={changedPassword.password}
                                            onChange={handlePasswordChange}
                                            type={showPasswordOne ? "text" : "password"}
                                            InputProps={{
                                                endAdornment: (
                                                  <InputAdornment position="end">
                                                    <IconButton
                                                      aria-label="toggle password visibility"
                                                      onClick={handleClickShowPasswordOne}
                                                      onMouseDown={handleMouseDownPasswordOne}
                                                      edge="end"
                                                    >
                                                      {showPasswordOne ? (
                                                        <VisibilityOff />
                                                      ) : (
                                                        <Visibility />
                                                      )}
                                                    </IconButton>
                                                  </InputAdornment>
                                                ),
                                                style: {
                                                  border: "1px solid #CF528A",
                                                  borderRadius: "5px",
                                                },
                                              }}
                                            // InputProps={{
                                            //     endAdornment: (
                                            //         <InputAdornment position="end">
                                            //             <VisibilityIcon />
                                            //         </InputAdornment>
                                            //     ),
                                            //     style: { border: '1px solid #CF528A', borderRadius: '5px' }
                                            // }}
                                        />
                                        {errors.password ? (
                                            <p className="error text-danger">
                                                Password should be atleast 5 characters long
                                            </p>
                                        ) : null}
                                    </div>
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            placeholder='Confirm Password'
                                            name="password_confirmation"
                                            value={changedPassword.password_confirmation}
                                            onChange={handlePasswordChange}
                                            type={showPasswordTwo ? "text" : "password"}
                                            // InputProps={{
                                            //     endAdornment: (
                                            //         <InputAdornment position="end">
                                            //             <VisibilityIcon />
                                            //         </InputAdornment>
                                            //     ),
                                            //     style: { border: '1px solid #CF528A', borderRadius: '5px' }
                                            // }}
                                            InputProps={{
                                                endAdornment: (
                                                  <InputAdornment position="end">
                                                    <IconButton
                                                      aria-label="toggle password visibility"
                                                      onClick={handleClickShowPasswordTwo}
                                                      onMouseDown={handleMouseDownPasswordTwo}
                                                      edge="end"
                                                    >
                                                      {showPasswordTwo ? (
                                                        <VisibilityOff />
                                                      ) : (
                                                        <Visibility />
                                                      )}
                                                    </IconButton>
                                                  </InputAdornment>
                                                ),
                                                style: {
                                                  border: "1px solid #CF528A",
                                                  borderRadius: "5px",
                                                },
                                              }}
                                        />
                                        {errors.password_confirmation ? (
                                            <p className="error text-danger">
                                                Password confirmation should be atleast 5 characters long
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className='submit_details'>
                                        <button className='submit' type="button" onClick={handleSubmitChangedPassword}>Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className='col-sm-1 col-md-1 col-lg-1'></div>
                        </div>
                        <img src={TajMahal} className='tajmahal_image_new_password' alt='Taj Mahal' width="100%" height="150vh" />
                    </div>
                    {/* <div className='container'>
                        <div className='row' >
                            <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                                <div style={{ borderColor: "1px solid red" }}>
                                    <img src={TajMahal} className='tajmahal_image_new_password' alt='Taj Mahal' width="100%" height="100%" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </>
  )
}

export default ChangedPasswordDetails