import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IP from "../../../images/IP_Image.png";
import TajMahal from "../../../images/TajMahal.png";
import "../Registration/Registration.css";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getRequestGlobal } from "../../../API/global";
import { postRequest } from "../../../API/IP";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Registration = () => {
  const [organisationIdToText, setOrganisationIdToText] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const [passwordError, setPasswordError] = useState('');

  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    password_confirmation: "",
    type_id: "",
    websiteUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getRequestGlobal("ip_type_list", {})
      .then((data) => {
        setOrganisationIdToText(data.data);
      })
      .catch((error) => {
        console.error("Error fetching organisation types", error);
      });
  }, []);

  const handleClickShowPasswordOne = () => setShowPasswordOne((show) => !show);
  const handleClickShowPasswordTwo = () => setShowPasswordTwo((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateValues = (inputValues) => {
    const { email, name, mobile, password, password_confirmation, type_id } = inputValues;
    let errors = {};

    if (!name) errors.name = "Mention your full name";
    if (mobile.length < 10) errors.mobile = "Mobile number is too short";
    if (email.length < 10) errors.email = "Email is too short";
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) errors.email = "Invalid email format";
    if (password.length < 5) errors.password = "Password is too short";
    if (password_confirmation.length < 5) errors.password_confirmation = "Password confirmation is too short";
    if (!type_id) errors.type_id = "Type ID is required";

    return errors;
  };

  const validatePassword = async (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
    let data =  regex.test(password);
    if (data) {
      setPasswordError('');
    } else {
      setPasswordError('Password must be at least 8 characters long and include at least 1 alphabet, 1 number, and 1 special character.');
   
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));

    if (name === "password_confirmation") {
      setPasswordMatchError(value !== formData.password ? "Passwords do not match" : "");
    }

    if (name === 'password') {
      validatePassword(value);
    }

    // if (name === 'password') {
    //   validatePassword(value);
    //   if (value.length < 8) {
    //     setPasswordError('Password must be at least 8 characters long and include at least 1 alphabet, 1 number, and 1 special character.');
    //   } else {
    //     setPasswordError('');
    //   }
    // }




  };

  const handleOrganisationData = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: parseInt(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateValues(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0 || passwordMatchError) {
      return;
    }

    setLoading(true);

    try {
      const payload = { ...formData };
      const data = await postRequest("register", payload);

      setFormData({
        name: "",
        mobile: "",
        email: "",
        password: "",
        password_confirmation: "",
        type_id: "",
        websiteUrl: "",
      });
      setAlertMessage("User registered successfully");
      setAlertSeverity("success");
      setAlertOpen(true);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setAlertMessage("Error submitting form. Please try again later.");
      setAlertSeverity("error");
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (["e", "E", "+", "-", "."].includes(event.key)) {
      event.preventDefault();
    }
  };







  return (
    <>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(99, 35, 64, 0.5)"
          zIndex={1000}
        >
          <CircularProgress />
        </Box>
      )}

      <div className="container-fluid px-0 w-100 h-100 overflow-x-hidden position-absolute">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <img src={IP} className="mob-IP" alt="Indian Panorama" width="100%" height="773vh" />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 second-box">
            <p className="register me-3">
              Do you have an account?{" "}
              <b>
                <Link to="/" className="log_in_now">
                  Log In Now
                </Link>
              </b>
            </p>
            <div className="container">
              <div className="row">
                <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <h1 className="welcome welcome_details">Welcome</h1>
                  <p className="login_with_email">
                    Registration is simply dummy text of the printing
                  </p>
                  <form encType="multipart/form-data">
                    <div className="input_field">
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Full Name"
                        InputProps={{
                          style: {
                            border: "1px solid #CF528A",
                            borderRadius: "5px",
                          },
                        }}
                        className="input_border"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && <p className="error text-danger">{errors.name}</p>}
                    </div>

                    <div className="input_field">
                      <TextField
                        type="number"
                        variant="outlined"
                        fullWidth
                        placeholder="Number"
                        onKeyDown={handleKeyDown}
                        inputProps={{ maxLength: 10 }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                          style: {
                            border: "1px solid #CF528A",
                            borderRadius: "5px",
                          },
                        }}
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                      />
                      {errors.mobile && <p className="error text-danger">{errors.mobile}</p>}
                    </div>

                    <div className="input_field">
                      <TextField
                        variant="outlined"
                        type="email"
                        fullWidth
                        placeholder="Email ID"
                        InputProps={{
                          style: {
                            border: "1px solid #CF528A",
                            borderRadius: "5px",
                          },
                        }}
                        className="input_border"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <p className="error text-danger">{errors.email}</p>}
                    </div>

                    <div className="input_field">
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Password"

                        // inputProps={{ maxLength: 8 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordOne}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPasswordOne ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                          style: {
                            border: "1px solid #CF528A",
                            borderRadius: "5px",
                          },
                        }}
                        className="input_border"
                        type={showPasswordOne ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={!!passwordError}
                        helperText={passwordError}
                      />
                      {errors.password && <p className="error text-danger"><span className="error text-danger">{errors.password}</span></p>}
                    </div>

                    <div className="input_field">
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Confirm Password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPasswordTwo}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                          style: {
                            border: "1px solid #CF528A",
                            borderRadius: "5px",
                          },
                        }}
                        className="input_border"
                        type={showPasswordTwo ? "text" : "password"}
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}

                      />
                      {passwordMatchError && <p className="error text-danger">{passwordMatchError}</p>}
                      {errors.password_confirmation && (
                        <p className="error text-danger">{errors.password_confirmation}</p>
                      )}
                    </div>

                    <div className="input_field">
                      <FormControl fullWidth>
                        <Select
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          name="type_id"
                          value={formData.type_id}
                          onChange={handleOrganisationData}
                          style={{ border: "1px solid #CF528A", borderRadius: "5px" }}
                        >
                          <MenuItem value="" disabled>
                            Select an option
                          </MenuItem>
                          {Object.entries(organisationIdToText).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.type_id && <p className="error text-danger">{errors.type_id}</p>}
                      </FormControl>
                    </div>

                    <div className="optional_option">
                      <p className="optional_text_details">
                        <span>Optional</span>
                      </p>
                    </div>
                    <div className="input_field">
                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Website url"
                        InputProps={{
                          style: {
                            border: "1px solid #CF528A",
                            borderRadius: "5px",
                          },
                        }}
                        className="input_border"
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                      />
                      {errors.websiteUrl && <p className="error text-danger">Website URL is required</p>}
                    </div>
                    <div className="register_details">
                      <button className="login" onClick={handleSubmit}>
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
              </div>
            </div>
            <img src={TajMahal} className="tajmahal" alt="Tajmal image" width="100%" height="130vh" />
          </div>
        </div>
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={alertSeverity} variant="filled">
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Registration;
