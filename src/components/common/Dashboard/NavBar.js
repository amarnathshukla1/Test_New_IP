import NFDCimg from "../../../assets/images/Vector.svg"
import Asimg from "../../../assets/images/GOLDEN_LOGO.svg"
import TemporaryDrawer from "./TemporaryDrawer"
// Card component to display individual cards
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ApiClient from '../ApiClient'
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
    const { getRequest } = ApiClient();
    // console.log(getRequesta())
    const [preData, setPredata] = useState([]);

    const [showAddNewEntry, setShowAddNewEntry] = useState(false);
    const navigate = useNavigate()
    const addNewEntry = () => {
        if (showAddNewEntry) { // TODO :: 
            navigate("/ip")
        } else {
            alert("you have reached maximum limit.");
        }
    }
    useEffect(() => {
        const fetchData = async () => {
        
            try {
                const preData = await getRequest('list');
                const data = preData.data;
                if (data && data.length < 5) setShowAddNewEntry(true)
                setPredata(data);
                
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, [getRequest]);
    return (
        <div className="left_first_header">
            <div className="firstHead">
                <div className="burger">
                    <TemporaryDrawer />
                </div>
                <div className="headimg" href="#home">
                    <img
                        src={NFDCimg}
                        width="100%"
                        height="100%"
                        className=""
                        alt="NFDC Cinemas of india"
                    />
                </div>
                <div className="headimg">
                    <img
                        src={Asimg}
                        width="100%"
                        height="100%"
                        className=""
                        alt="NFDC Cinemas of india"
                    />
                </div>
            </div>
            <hr />
            <div className="sec_head">
                <div>
                <h6>Hello User </h6>
                <p>Mdanial@otco.com, +11 990004444 </p>
                </div>
                <div>
                <Button variant="contained" onClick={addNewEntry}>Add New Entry</Button>
                </div>
            </div>
            <div>               
        
        </div>
        </div>
    )
}

export default NavBar