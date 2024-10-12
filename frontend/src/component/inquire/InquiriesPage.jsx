import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faHeart, faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar } from 'react-bootstrap';

const InquiriesPage = () => {
    const [userId, setUserId] = useState('1111');
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [inquiryResponse, setInquiryResponse] = useState(null);
    const [satisfaction, setSatisfaction] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showSatisfactionModal, setShowSatisfactionModal] = useState(false);


    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/inquiries/user/${userId}`);
                setInquiries(response.data.inquiries);
                setFilteredInquiries(response.data.inquiries);
                console.log("ss", inquiries)
                const satisfactionMap = response.data.inquiries.reduce((acc, inquiry) => {
                    acc[inquiry._id] = inquiry.satisfaction;
                    return acc;
                }, {});
                setSatisfaction(satisfactionMap);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            }
        };

        fetchInquiries();
    }, [userId]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = inquiries.filter(
            (inquiry) =>
                inquiry.subject.toLowerCase().includes(value)
        );
        setFilteredInquiries(filtered);
    };

    const handleViewInquiry = async (inquiry) => {
        setSelectedInquiry(inquiry);
        setShowModal(true);

        if (inquiry.responded) {
            try {
                const response = await axios.get(`http://localhost:5000/response-inquiries/inquire/${inquiry._id}`);
                setInquiryResponse(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching inquiry response:', error);
            }
        } else {
            setInquiryResponse(null);
        }
    };

    const handleSatisfactionUpdate = async (inquiryId, newSatisfaction) => {
        try {
            await axios.put(`http://localhost:5000/inquiries/${inquiryId}/satisfaction`, { satisfaction: newSatisfaction });
            setSatisfaction(prev => ({ ...prev, [inquiryId]: newSatisfaction }));
            setShowSatisfactionModal(true);
        } catch (error) {
            console.error('Error updating satisfaction:', error);
        }
    };

    const getSatisfactionClass = (level, inquiryId) => {
        return satisfaction[inquiryId] === level ? 'bg-dark text-light rounded px-2' : '';
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedInquiry(null);
        setInquiryResponse(null);
    };

    const handleSatisfactionCloseModal = () => {
        setShowSatisfactionModal(false);
    };

    return (
        <>
            <div className="container-fluid mt-5">
                <h2 className="text-center mb-4">Customer Inquiries</h2>

                <div className="mb-4 row ">
                    <div className='col-8'>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Subject"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className='col-4 text-end'>
                        <Link to="/create-new-inquire">
                            <button className="btn btn-dark">Add New Inquiry +</button>
                        </Link>
                    </div>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Inquiry ID</th>
                            <th>Submitted Date</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Satisfaction Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.length > 0 ? (
                            filteredInquiries.map((inquiry) => (
                                <tr key={inquiry.inquire_id}>
                                    <td>{inquiry.inquire_id}</td>
                                    <td>{inquiry.date}</td>
                                    <td>{inquiry.subject}</td>
                                    <td>{inquiry.status}</td>
                                    <td className="d-flex justify-content-around">
                                    <div
                            className={`text-center ${getSatisfactionClass('Positive', inquiry._id)}`}
                            onClick={() => handleSatisfactionUpdate(inquiry._id, 'Positive')}
                        >
                            <FontAwesomeIcon icon={faThumbsUp} size="2x" className="text-success" />
                            <p>Positive</p>
                        </div>
                        <div
                            className={`text-center ${getSatisfactionClass('Negative', inquiry._id)}`}
                            onClick={() => handleSatisfactionUpdate(inquiry._id, 'Negative')}
                        >
                            <FontAwesomeIcon icon={faThumbsDown} size="2x" className="text-danger" />
                            <p>Negative</p>
                        </div>
                        <div
                            className={`text-center ${getSatisfactionClass('Neutral', inquiry._id)}`}
                            onClick={() => handleSatisfactionUpdate(inquiry._id, 'Neutral')}
                        >
                            <FontAwesomeIcon icon={faHeart} size="2x" className="text-warning" />
                            <p>Neutral</p>
                        </div>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => handleViewInquiry(inquiry)}
                                        >
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No inquiries found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Modal show={showSatisfactionModal} onHide={handleSatisfactionCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Satisfaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <p>Satisfaction updated Successfully!!</p>
                        </>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleSatisfactionCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Inquiry Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedInquiry ? (
                            <>
                                <h5>Subject:</h5>
                                <p>{selectedInquiry.subject}</p>
                                <h5>Description:</h5>
                                <p>{selectedInquiry.description}</p>
                                {inquiryResponse && (
                                    <>
                                        <h5>Manager Response:</h5>
                                        <p>{inquiryResponse.responses[0].response}</p>
                                    </>
                                )}
                            </>
                        ) : (
                            <p>No details available</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default InquiriesPage;
