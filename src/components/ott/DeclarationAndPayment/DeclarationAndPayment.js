import React from 'react'
import Grid from '@mui/material/Grid';
import styles from "../DeclarationAndPayment/DeclarationAndPayment.module.css"

const DeclarationAndPayment = () => {
  return (
    <>
     <h5 className="text-capitalize payment">
                Declaraton & Payment<span className="text-danger">*</span>
            </h5>
            <h5>Entry Fees: <span style={{ color: "#973A64", fontSize: "28px", fontWeight: "500" }}>INR 11800/-</span></h5>

            <p className='text-capitalize' style={{color:"#615A5B"}}><b>Payment Mode</b></p>


            <form>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                            <label className="form-check-label" for="flexRadioDefault1">
                                UPI
                            </label>
                        </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                            <label className="form-check-label" for="flexRadioDefault1">
                                Credit Card
                            </label>
                        </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                            <label className="form-check-label" for="flexRadioDefault1">
                                Debit Card
                            </label>
                        </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                            <label className="form-check-label" for="flexRadioDefault1">
                                Internet Banking
                            </label>
                        </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" style={{ backgroundColor: '#813256' }} />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    QR Code-customed-IFFI
                                </label>
                            </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <button  style={{background: 'blue', border: 'none', color: 'White', padding: "10px 30px 10px 30px", borderRadius: "5px"}}>Pay Now</button>
                </Grid>
            </Grid>

            </form>

           
    </>
  )
}

export default DeclarationAndPayment