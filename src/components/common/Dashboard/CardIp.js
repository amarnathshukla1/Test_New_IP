import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ApiClient from '../ApiClient';
import { useNavigate } from 'react-router-dom';

const CardIp = ({ allStepsCompletedFn }) => {
    const { getRequest, deleteRequest } = ApiClient();
    const [preData, setPredata] = useState([]);
    const [showAddNewEntry, setShowAddNewEntry] = useState(false);
    const navigate = useNavigate()

    const [completedSteps, setCompletedSteps] = useState({});
    const steps = [
        "Film's Details",
        "Producer's Details",
        "Director's Details",
        "Crew Details",
        "CBFC Certification",
        "Other Details",
        "Documents",
        "Preview",
        "Declaration/Payment",
        "Submission"
    ];

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
    }, []);




    const handleDelete = async (id) => {
        try {
            await deleteRequest(`delete/${id}`);
            setPredata(preData.filter(item => item.id !== id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const allStepsCompleted = () => {
        return Object.keys(completedSteps).length === steps.length;
    };

    return (
        <>
    {preData.length == 0 ? (
                <div style={{display:"grid", gridTemplateColumns:"max-content"}}>
                   
                       
                        <p className="text-black"> <h4>You haven't added any entries yet. To get started, simply click on Add New Entry button </h4></p>

 
                </div>
            ) : (
                <>
                    {preData.map((item) => (
                        <div className='card_con' key={item.id}> {/* Unique key for each card */}
                            <h1 className='title'>
                                <span>A</span> {item.english_translation_of_film}
                            </h1>
                            <ul className='listView'>
                                <li><h5>Type Of Film</h5> <h6>{item.category === 1 ? 'Featured' : 'Non-Featured'}</h6></li>
                                <li><h5>Language of <br />Sub Title</h5> <h6>{item.language_id === 1 ? 'English' : 'Non-English'}</h6></li>
                            </ul>
                            <div className='button_con'>
                                {allStepsCompletedFn() ? (
                                    <Button variant="contained" href={`ip/${item.id}/${item.active_step}`}>Edit</Button>
                                ) : (
                                    <Button
                                        style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                                        href={`/ip/view/${item.id}`}
                                    >
                                        View
                                    </Button>
                                )}
                                <Button variant="contained" onClick={() => handleDelete(item.id)}>Delete</Button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}

export default CardIp;
