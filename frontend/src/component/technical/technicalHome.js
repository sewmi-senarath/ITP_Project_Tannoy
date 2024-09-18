// src/component/technical/technicalHome.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import '../../styles/technicalHome.css'; 



// Register the necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function TechnicalHome() {  // Make sure the component name starts with a capital letter
    const [progressData, setProgressData] = useState([0, 0, 0, 0]); // Example state for progress data

    useEffect(() => {
        // Fetch data from API
        axios.get('/api/maintenance-progress')
            .then((response) => {
                setProgressData(response.data); // Update with actual data
            })
            .catch((error) => {
                console.error('Error fetching maintenance data:', error);
            });
    }, []);

    const data = {
        labels: ['Completed', 'In Progress', 'Planned', 'Pending'],
        datasets: [
            {
                label: 'Maintenance Progress',
                data: progressData,
                backgroundColor: ['#4CAF50', '#FFC107', '#2196F3', '#FF5722'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Maintenance Progress',
            },
        },
    };

    return (
        <div className="technical-home">
            <h1>hi</h1>
            <div className="chart-container">
                <h3>Maintenance Progress</h3>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default TechnicalHome;

