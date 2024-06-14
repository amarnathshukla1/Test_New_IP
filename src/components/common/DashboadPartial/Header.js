import React from 'react'
// import "../../../assets/style/style.css"
import "../../../assets/style/style.css"
import GOLDEN_LOGO_IB from "../../../assets/images/GOLDEN_LOGO_IB.svg";
import NFDC_LOGO_IP from "../../../assets/images/NFDC-Logo-ip.svg";
import IndianPanorama from "../../../assets/images/Indian-Panorama-text.svg";
import IFFFI_LOGO from "../../../assets/images/IFFFI_LOGO.svg";
import { useNavigate } from 'react-router-dom';
const Header = ({ showAddNewEntry }) => {

    const navigate = useNavigate()
    const addNewEntry = () => {
        if (showAddNewEntry) { // TODO :: 
            navigate("/ip")
        } else {
            alert("you have reached maximum limit.");
        }
    }
    return (
        <>
            <header className="container-fluid h-auto py-3">
                <div className="logoOne">
                    <img src={IFFFI_LOGO} alt="" />
                </div>
                <div className="logoTwo">
                    <img src={GOLDEN_LOGO_IB} alt="" />
                </div>
                <div className="logoThree">
                    <img src={NFDC_LOGO_IP} alt="" />
                </div>
            </header>
            <span className="d-block text-center ip-Text">
                <img src={IndianPanorama} alt=""
                /></span>
            <span className="tabs-menu d-flex container-fluid  h-auto">
                <button className="btn text-uppercase">Dashboard</button>

                <button onClick={addNewEntry} className="btn text-uppercase">Add New Entry</button>
                <a href="/logout" className="btn text-uppercase ms-auto">LOg Out</a>
            </span>
        </>

    )
}

export default Header