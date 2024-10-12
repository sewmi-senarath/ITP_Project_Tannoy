import React, { useState, useEffect } from 'react';
import { FaEnvelope,FaArrowLeft } from "react-icons/fa";
//import Navbar from '../Navbar';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

const CreateNewInquire = () => {
    const [user_id, setUserId] = useState('1111');
    const [formData, setFormData] = useState({
        user_id,
        name: '',
        email: '',
        subject: '',
        description: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();  // Hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { name, email, subject, description } = formData;
    
        if (!name || !email || !subject || !description) {
            return 'All fields are required.';
        }
    
        if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            return 'Please enter a valid email address.';
        }
    
        if (description.length < 10) {
            return 'Description must be at least 10 characters long.';
        }
    
        return null;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setModalMessage(validationError);
            setShowModal(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/inquiries', formData);
            if (response.status === 201) {  // Check if the response status is Created
                setModalMessage('Inquiry submitted successfully!');
                setShowModal(true);  // Show success modal
            } else {
                setModalMessage('Unexpected response from the server.');
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            setModalMessage('An error occurred while submitting your inquiry.');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (modalMessage === 'Inquiry submitted successfully!') {
            navigate('/inquiries');  // Redirect to /inquiries
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-light">
                       <Link to="/inquiries"> <fortawesomeIcon icon={FaArrowLeft} /> Back</Link>
                    </button>
                </div>

                <div className="row justify-content-center align-items-center mt-4">
                    <div className="col-lg-6 col-md-8">
                        <h2 className="text-center">Create New Inquiry</h2>
                        <p className="text-center text-muted">Please fill out the form below...</p>

                        <form onSubmit={handleSubmit} className="p-3">
                            <div className="mb-3">
                                <label className="form-label">Customer Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Customer Email</label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <fortawesomeIcon icon={FaEnvelope} />
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="abc@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Subject</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    placeholder="Enter your subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description of the issue</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="4"
                                    placeholder="Enter your issue"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg px-5">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="col-lg-4 col-md-4 d-none d-md-block">
                        <img
                            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg"
                            alt="Support illustration"
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMessage.startsWith('An error') ? 'Error' : 'Success'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateNewInquire;
