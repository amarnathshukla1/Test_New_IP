import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ApiClient from '../ApiClient';
import { useNavigate } from 'react-router-dom';
import NFDCimg from "../../../assets/images/Vector.svg";
import Asimg from "../../../assets/images/GOLDEN_LOGO.svg";
import TemporaryDrawer from "./TemporaryDrawer";

const NavBar = ({ activeTab }) => {
    const { getRequest } = ApiClient();
    const [preData, setPredata] = useState([]);
    const [showAddNewEntry, setShowAddNewEntry] = useState(false);
    const [showAddNewEntryOtt, setShowAddNewEntryOtt] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const preData = await getRequest('list');
                const data = preData.data;
                if (data && data.length < 5) setShowAddNewEntry(true);
                setPredata(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, []);

    const addNewEntry = () => {
        if (showAddNewEntry) {
            navigate("/ip");
        } else {
            alert("You have reached the maximum limit.");
        }
    }

    useEffect(() => {
        if (activeTab === 1) {
            const fetchData = async () => {
                try {
                    const preData = await getRequest('ott');
                    const data = preData.data;
                    if (data && data.length < 5) setShowAddNewEntryOtt(true);
                    setPredata(data);
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            };
            fetchData();
        }
    }, [activeTab]);

    const addNewEntryOtt = () => {
        if (showAddNewEntryOtt) {
            navigate("/ott");
        } else {
            alert("You have reached the maximum limit.");
        }
    }

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
                        alt="NFDC Cinemas of India"
                    />
                </div>
                <div className="headimg">
                    <img
                        src={Asimg}
                        width="100%"
                        height="100%"
                        alt="NFDC Cinemas of India"
                    />
                </div>
            </div>
            <hr />
            <div className="sec_head">
                <div>
                    <h6>Hello User</h6>
                    <p>Mdanial@otco.com, +11 990004444</p>
                </div>
                <div>
                    {activeTab === 0 && (
                        <Button variant="contained" onClick={addNewEntry}>Add New Entry</Button>
                    )}
                    {activeTab === 1 && (
                        <Button variant="contained" onClick={addNewEntryOtt}>Add New Entry OTT</Button>
                    )}
                </div>
            </div>
            <div>
                {/* Additional content can be added here */}
            </div>
        </div>
    )
}

export default NavBar;
