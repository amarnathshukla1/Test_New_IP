// Card component to display individual cards
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ApiClient from '../ApiClient'
import { useNavigate } from 'react-router-dom';
const CardOtt = () => {

    const { getRequest } = ApiClient();
    const [preData, setPredata] = useState([]);
    const [showAddNewEntryOtt, setShowAddNewEntryOtt] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const preData = await getRequest('ott');
                const data = preData.data;
                if (data && data.length < 5) setShowAddNewEntryOtt(true)

                setPredata(data);
                console.log('Data:', data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <>

            {preData.length == 0 ? (
                <div>
                   
                       
                        <p className="text-black" style={{display:"grid", gridTemplateColumns:"max-content"}}> <h4>You haven't added any entries yet. To get started, simply click on Add New Entry button  </h4></p>

                </div>
            ) : (
                <>
                    {preData.map((item) => (
                        <div className='card_con' key={item.id}> {/* Unique key for each card */}
                            <h1 className='title'>
                                <span>A</span> {item.title_in_english}
                            </h1>
                            <ul className='listView'>
                                <li><h5>Title of Webseries</h5> <h6>{item.title}</h6></li>
                                <li><h5>Language of <br />Sub Title</h5> <h6>{(item.language_id == 1) ? 'English' : 'Non-English'}</h6></li>
                            </ul>
                            <div className='button_con'>
                                <Button variant="contained" href={`ott/${item.id}/${item.active_step}`}>View</Button>
                                <Button variant="contained">Print</Button>
                            </div>
                        </div>
                    ))}
                </>
            )}

        </>
    );
}
export default CardOtt;