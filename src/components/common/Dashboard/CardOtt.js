// Card component to display individual cards
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ApiClient from '../ApiClient'
import { useNavigate } from 'react-router-dom';
const CardOtt = () => {

    const { getRequest } = ApiClient();
    const [preData, setPredata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const preData = await getRequest('ott');
                const data = preData.data;
                setPredata(data);
                console.log('Data:', data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, [getRequest]);
    return (
        <>

             {preData.length == 0 ? (
                        <div className="new-entry d-flex justify-content-center align-items-center">
                            <span className="d-block text-center">
                                <p className="text-white">You haven't added any entries yet. To get started, simply click on</p>
                                <a href="/ott" className="btn btn-newEntry">New Entry Loading...</a>
                            </span>
                        </div>
                    ) : (
                        <>
            {preData.map((item) => (
                <div className='card_con' key={item.id}> {/* Unique key for each card */}
                    <h1 className='title'>
                        <span>A</span> {item.english_translation_of_film}
                    </h1>
                    <ul className='listView'>
                        <li><h5>Type Of Film</h5> <h6>{(item.category == 1) ? 'Featured' : 'Non-Featured'}</h6></li>
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