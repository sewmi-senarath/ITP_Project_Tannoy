import React, { useState, useEffect } from 'react';
import { FaPen, FaArrowLeft } from "react-icons/fa";
//import Navbar from '../Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

const CreateInquireResponse = () => {
    const [inquire, setInquire] = useState(null);
    const [responseText, setResponseText] = useState('');
    const { inquire_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure that inquire_id exists before making the API call
        if (inquire_id) {
            const fetchInquireData = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:5000/inquiries/${inquire_id}`);
                    // handle the response with the data
                    console.log("Inquiry data:", data);
                    setInquire(data.inquiry);
                    setResponseText('');
                    // Optionally set the state with the fetched inquiry data
                } catch (error) {
                    console.error('Error fetching inquiry:', error);
                }
            };

            fetchInquireData();
        } else {
            console.error('Inquire ID is not defined');
        }
    }, [inquire_id]);


    // Handle response submission
    const handleSubmitResponse = async () => {
        try {
            const responsePayload = {
                inquire_id,
                response: responseText,
            };

            const { data } = await axios.post('http://localhost:5000/response-inquiries/response', responsePayload);
            console.log('Response submitted successfully:', data);

            // Navigate back or to another page after submission
            navigate('/inquiries-manager');
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    if (!inquire) {
        return <div>Loading...</div>; // Display while data is being fetched
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className='row d-flex justify-center'>
                    <div className="col-6">
                        {/* Inquire Details */}
                        <div className="row mt-4">
                            <div className="col">
                                <h4>HELLO ADMIN : Manager</h4>
                                <p><strong>Inquire ID:</strong> {inquire.inquire_id}</p>
                                <p><strong>User ID:</strong> {inquire.user_id}</p>
                                <p><strong>Date Submitted:</strong> {new Date(inquire.date).toLocaleDateString()}</p>
                                <p><strong>Subject:</strong> {inquire.subject}</p>
                            </div>
                        </div>

                        {/* Issue Description */}
                        <hr />
                        <div className="row mb-4">
                            <div className="col">
                                <strong>Description of the issue</strong>
                                <p>{inquire.description}</p>
                            </div>
                        </div>

                        {/* Response Section */}
                        <div className="row mb-4">
                            <div className="col">
                                <h5>Response to the Inquire</h5>
                                <textarea
                                    id="responseText"
                                    className="form-control"
                                    rows="3"
                                    value={responseText} // Controlled input
                                    onChange={(e) => setResponseText(e.target.value)} // Update response text
                                />
                                <button className="btn btn-primary mt-3">
                                    <fortawesomeIcon icon={FaPen} /> Edit Response
                                </button>
                            </div>
                        </div>

                        {/* Submit / Decline Section */}
                        <div className="row mt-4">
                            <div className="col-6">
                                <button
                                    className="btn btn-success w-100"
                                    onClick={handleSubmitResponse}
                                >
                                    SUBMIT RESPONSE
                                </button>
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="row mt-4">
                            <div className="col">
                                <button className="btn btn-light" onClick={() => navigate(-1)}>
                                    <fortawesomeIcon icon={FaArrowLeft} /> Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CreateInquireResponse;
