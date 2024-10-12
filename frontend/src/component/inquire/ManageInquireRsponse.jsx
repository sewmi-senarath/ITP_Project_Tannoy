import React, { useState, useEffect } from 'react';
import { faPen, FaArrowLeft, FaTrash } from 'react-icons/fa';
import Header from '../header/header';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Navbar } from 'react-bootstrap';


const ManageInquireResponse = () => {
    const [inquire, setInquire] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [existingResponse, setExistingResponse] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { inquire_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Inquire ID:', inquire_id);
        if (inquire_id) {
            const fetchData = async () => {
                try {
                    // Fetch inquire data
                    const { data: inquireData } = await axios.get(`http://localhost:5000/inquiries/${inquire_id}`);
                    setInquire(inquireData.inquiry);
                    console.log("Inquiry Data:", inquireData);

                    // Fetch response data if exists
                    const { data: responseData } = await axios.get(`http://localhost:5000/response-inquiries/inquire/${inquire_id}`);
                    console.log("Response Data:", responseData);

                    if (responseData.responses && responseData.responses.length > 0) {
                        setExistingResponse(responseData.responses[0]);
                        console.log("sndksdn", responseData.responses[0])
                        setResponseText(responseData.responses[0].response);
                    }
                } catch (error) {
                    console.error('Error fetching inquiry/response:', error);
                }
            };
            fetchData();
        } else {
            console.error('Inquire ID is not defined');
        }
    }, [inquire_id]);

    // Handle response submission (update or create)
    const handleSubmitResponse = async () => {
        try {
            const responsePayload = {
                inquire_id,
                response: responseText,
            };

            if (existingResponse) {
                // Update response
                const { data } = await axios.put(`http://localhost:5000/response-inquiries/${existingResponse._id}`, responsePayload);
                console.log('Response updated successfully:', data);
            } else {
                // Create new response
                const { data } = await axios.post('http://localhost:5000/response-inquiries/response', responsePayload);
                console.log('Response submitted successfully:', data);
            }

            navigate('/inquiries-manager');
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    // Handle response deletion
    const handleDeleteResponse = async () => {
        try {
            await axios.delete(`http://localhost:5000/response-inquiries/${existingResponse._id}`);
            console.log('Response deleted successfully');
            setShowDeleteModal(false); // Close the modal after deletion
            setExistingResponse(null); // Clear the response state
            setResponseText(''); // Clear the textarea
        } catch (error) {
            console.error('Error deleting response:', error);
        }
    };

    if (!inquire) {
        return <div>Loading...</div>; // Display while data is being fetched
    }

    return (
        <>
            {/* <Navbar /> */}
            {/* <Header/> */}
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
                            <h5>Response to the Inquire</h5>
                            {existingResponse ? (
                                <h6>Id : {existingResponse.response_id}</h6>
                            ) : (
                                <p>No response available yet.</p>
                            )}

                            <textarea
                                id="responseText"
                                className="form-control"
                                rows="3"
                                value={responseText} // Controlled input
                                onChange={(e) => setResponseText(e.target.value)} // Update response text
                            />
                        </div>

                        {/* Submit / Edit / Delete Section */}
                        <div className="row mt-4">
                            <div className="col-4">
                                <button className="btn btn-success w-100" onClick={handleSubmitResponse}>
                                    {existingResponse ? 'UPDATE RESPONSE' : 'SUBMIT RESPONSE'}
                                </button>
                            </div>
                            {existingResponse && (
                                <div className="col-4">
                                    <button className="btn btn-danger w-100" onClick={() => setShowDeleteModal(true)}>
                                        <fortawesomeIcon icon={FaTrash} /> DELETE RESPONSE
                                    </button>
                                </div>
                            )}
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

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this response?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={handleDeleteResponse}>
                                    Delete
                                </button>
                                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageInquireResponse;
