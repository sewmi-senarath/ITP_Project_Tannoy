import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faHeart, faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
// import Navbar from '../Navbar';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InquiriesManager = () => {
    const [inquiries, setInquiries] = useState([]);
    const [filteredInquiries, setFilteredInquiries] = useState([]);
    const [selectedInquire, setSelectedInquire] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [respondedFilter, setRespondedFilter] = useState(null);
    const [response, setResponse] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fetch inquiries from the database
    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/inquiries');
                setInquiries(data.inquiries); // Access inquiries from data
                setFilteredInquiries(data.inquiries); // Set initial display
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            }
        };

        fetchInquiries();
    }, []);

    // Filter inquiries based on response status
    const filterInquiries = (responded) => {
        setRespondedFilter(responded);
        setFilteredInquiries(inquiries.filter(inquire => inquire.responded === responded));
    };

    // Handle search inquiries by inquire_id
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);
        if (searchValue === '') {
            setFilteredInquiries(inquiries);
        } else {
            setFilteredInquiries(inquiries.filter(inquire => inquire.inquire_id.toLowerCase().includes(searchValue.toLowerCase())));
        }
    };

    // Calculate satisfaction percentages
    const totalInquiries = inquiries.length;
    const positiveInquiries = inquiries.filter(inquire => inquire.satisfaction === 'Positive').length;
    const negativeInquiries = inquiries.filter(inquire => inquire.satisfaction === 'Negative').length;
    const neutralInquiries = inquiries.filter(inquire => inquire.satisfaction === 'Neutral').length;

    const positivePercentage = (positiveInquiries / totalInquiries) * 100 || 0;
    const negativePercentage = (negativeInquiries / totalInquiries) * 100 || 0;
    const neutralPercentage = (neutralInquiries / totalInquiries) * 100 || 0;

    // Handle view inquire
    const handleView = async (inquire) => {
        setSelectedInquire(inquire);
        try {
            const { data } = await axios.get(`http://localhost:5000/response-inquiries/inquire/${inquire._id}`);
            if (data.responses && data.responses.length > 0) {
                setResponse(data.responses);
            } else {
                setResponse([]);
            }
        } catch (error) {
            console.error('Error fetching responses:', error);
            setResponse([]);
        }
        setShowModal(true);
    };

    // Handle update response
    const manageResponse = () => {
        navigate(`/manage-inquire-response/${selectedInquire._id}`);
    };

    const handleRespondIssue = () => {
        navigate(`/create-inquire-response/${selectedInquire._id}`);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedInquire(null);
        setResponse(null); // Clear response state when modal is closed
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        const fontSize = 12;
        const marginX = 15;
        let yPosition = 20; // Initial y position
    
        // Set the title
        doc.setFontSize(18);
        doc.text('Customer Satisfaction Report', 60, yPosition);
        yPosition += 10; // Space below title
    
        // Display satisfaction percentages
        doc.setFontSize(fontSize);
        doc.text(`Total Inquiries: ${totalInquiries}`, marginX, yPosition);
        yPosition += 10;
        doc.text(`Positive Satisfaction: ${positivePercentage.toFixed(1)}%`, marginX, yPosition);
        yPosition += 10;
        doc.text(`Negative Satisfaction: ${negativePercentage.toFixed(1)}%`, marginX, yPosition);
        yPosition += 10;
        doc.text(`Neutral Satisfaction: ${neutralPercentage.toFixed(1)}%`, marginX, yPosition);
        yPosition += 20;
    
        // Render a table for responded inquiries
        const respondedInquiries = filteredInquiries.filter(inquire => inquire.responded);
    
        if (respondedInquiries.length > 0) {
            // Prepare table columns and rows
            const columns = ['Inquire ID', 'User', 'Subject', 'Status', 'Date'];
            const rows = respondedInquiries.map(inquire => [
                inquire.inquire_id,
                inquire.user_id,
                inquire.subject,
                inquire.responded ? 'Responded' : 'Unresponded',
                new Date(inquire.date).toLocaleDateString()
            ]);
    
            // Add table with colored rows (zebra-style)
            doc.autoTable({
                head: [columns],
                body: rows,
                startY: yPosition,
                theme: 'grid',
                styles: { fontSize: fontSize },
                alternateRowStyles: { fillColor: [240, 240, 240] }, // Light gray alternating rows
                headStyles: { fillColor: [0, 102, 204] }, // Blue header color
            });
        } else {
            doc.text('No responded inquiries available.', marginX, yPosition);
        }
    
        // Save the PDF
        doc.save('customer_satisfaction_report.pdf');
    };

    return (
        <>
            {/* <Navbar /> */}
            <div className="container-fluid px-32">
                {/* Back button */}
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-light">
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                </div>

                <h1 className="mt-4">HELLO ADMIN : Manager</h1>

                {/* Customer Satisfaction Card */}
                <div className="card mt-4 p-3 px-10">
                    <h5>CUSTOMER SATISFACTION</h5>
                    <div className="row mt-3">
                        <div className="col text-center">
                            <FontAwesomeIcon icon={faStar} size="3x" className="text-primary" />
                            <p>Inquiries Received</p>
                            <p><strong>{totalInquiries}</strong></p>
                        </div>
                        <div className="col text-center">
                            <FontAwesomeIcon icon={faThumbsUp} size="3x" className="text-success" />
                            <p>Positive</p>
                            <p><strong>{positivePercentage.toFixed(1)}%</strong></p>
                        </div>
                        <div className="col text-center">
                            <FontAwesomeIcon icon={faThumbsDown} size="3x" className="text-danger" />
                            <p>Negative</p>
                            <p><strong>{negativePercentage.toFixed(1)}%</strong></p>
                        </div>
                        <div className="col text-center">
                            <FontAwesomeIcon icon={faHeart} size="3x" className="text-warning" />
                            <p>Neutral</p>
                            <p><strong>{neutralPercentage.toFixed(1)}%</strong></p>
                        </div>
                    </div>
                    <div className="text-end mt-3">
                        <button className="btn btn-primary" onClick={generatePDFReport}>
                            Generate Report (PDF)
                        </button>
                    </div>
                    <div className="text-center mt-3">
                        <small className="text-muted">Resolve negative responses to gain satisfaction</small>
                    </div>
                </div>

                {/* Search bar */}
                <div className="input-group mt-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Inquire ID"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                {/* Filter Buttons */}
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-outline-primary mx-2" onClick={() => filterInquiries(false)}>
                        Unresponded
                    </button>
                    <button className="btn btn-outline-secondary mx-2" onClick={() => filterInquiries(true)}>
                        Responded
                    </button>
                    <button className="btn btn-outline-dark mx-2" onClick={() => setFilteredInquiries(inquiries)}>
                        All
                    </button>
                </div>

                {/* Inquiries Table */}
                <div className="table-responsive mt-4">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID Number</th>
                                <th>User</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInquiries.map((inquire) => (
                                <tr key={inquire._id}>
                                    <td>{inquire.inquire_id}</td>
                                    <td>{inquire.user_id}</td>
                                    <td>{inquire.subject}</td>
                                    <td>
                                        <span className={`badge bg-${inquire.responded ? 'success' : 'warning'}`}>
                                            {inquire.responded ? 'Responded' : 'Unresponded'}
                                        </span>
                                    </td>
                                    <td>{new Date(inquire.date).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-outline-primary" onClick={() => handleView(inquire)}>
                                            VIEW
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View/Update Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Inquire ID: {selectedInquire?.inquire_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Customer Subject</h5>
                    <p>{selectedInquire?.subject}</p>
                    <h5>Customer Issue</h5>
                    <p>{selectedInquire?.description}</p>

                    {response && response.length > 0 && (
                        <>
                            <div className='px-1'>
                                <h5>Response</h5>
                                <p className='d-inline-block text-truncate'>{response[0].response}</p>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    {selectedInquire?.responded === true ? (
                        <Button variant="primary" onClick={manageResponse}>
                            Manage Response
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleRespondIssue}>
                            Respond Issue
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default InquiriesManager;
