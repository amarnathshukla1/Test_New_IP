import React, { useEffect, useState } from 'react'
import "../../../assets/style/style.css"

import GOLDEN_LOGO_IB from "../../../assets/images/GOLDEN_LOGO_IB.svg";
import NFDC_LOGO_IP from "../../../assets/images/NFDC-Logo-ip.svg";
import IndianPanorama from "../../../assets/images/Indian-Panorama-text.svg";
import IFFFI_LOGO from "../../../assets/images/IFFFI_LOGO.svg";
// import { Header } from '../DashboadPartial/Header';
import Header from "../DashboadPartial/Header"
import { getRequest } from '../../../API/IP';
import ApiClient from '../ApiClient';



const Dashboard = () => {
    const { getRequest } = ApiClient();
    // console.log(getRequesta())
    const [preData, setPredata] = useState([]);

    const [showAddNewEntry, setShowAddNewEntry] = useState(false);
    const loadpreData = async () => {


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
        <>

            <main className="bg-IP-dashboard">
                <Header showAddNewEntry={showAddNewEntry} />
                <main className="change-block container">
                    {preData.length == 0 ? (
                        <div className="new-entry d-flex justify-content-center align-items-center">
                            <span className="d-block text-center">
                                <p className="text-white">You haven't added any entries yet. To get started, simply click on</p>
                                <a href="/ip" className="btn btn-newEntry">Add New Entry</a>
                            </span>
                        </div>
                    ) : (
                        <div className="row card-block">
                            {preData.map((item, index) => (

                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
                                    <div className="glassmorphisam-card">
                                        <div className="card_content">
                                            <div className="card_title d-flex">
                                                {/* <img src="./assets/images/letter-a.svg" alt="" /> */}
                                                <h4 className="ps-3">{item.english_translation_of_film}</h4>
                                            </div>
                                            <div className="card_body">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <p className="mb-0">Type Of Film</p>
                                                    <h5 className="mb-0">{(item.category == 1) ? 'Featured' : 'Non-Featured'}</h5>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-2">
                                                    <p className="mb-0">Language of Film</p>
                                                    <h5 className="mb-0">{(item.language_id == 1) ? 'English' : 'Non-English'}</h5>
                                                </div>
                                            </div>
                                            <div className="card_footer">
                                                <div>
                                                <button  className="btn text-white"><a href={`ip/${item.id}/${item.active_step}`} className="btn btn_view">View</a></button>
                                                <button className='btn  btn-view' style={{backgroundColor:"#ffcc00", color:"white"}}>Print</button>
                                                </div>
                                                
                                            </div>
                                            <div>
                                            

                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}



                </main>

            </main>
        </>

    )
}

export default Dashboard