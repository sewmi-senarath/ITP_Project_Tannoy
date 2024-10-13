// Finance Dashboard

import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import './FinanceDashboard.css';

Chart.register(ChartDataLabels);

const FinanceDashboard = () => {
  const [formData, setFormData] = useState({
    paymentID: '',
    department: '',
    amount: 0,
    type: 'debit',
    contactNumber: '',
    date: ''
  });
  const [chartData, setChartData] = useState(null);
  const [allData, setAllData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Data added successfully');
        fetchAllData();
        setFormData({
          paymentID: '',
          department: '',
          amount: 0,
          type: 'debit',
          contactNumber: '',
          date: ''
        });
      } else {
        alert('Failed to add data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/finance/monthly');
      const data = await response.json();
      let totalCredit = 0;
      let totalDebit = 0;

      data.forEach(item => {
        if (item.type === 'credit') {
          totalCredit += item.amount;
        } else if (item.type === 'debit') {
          totalDebit += item.amount;
        }
      });

      setChartData({
        labels: ['Debit', 'Credit'],
        datasets: [{
          data: [totalDebit, totalCredit],
          backgroundColor: ['#FF6384', '#36A2EB']
        }]
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/finance');
      const data = await response.json();
      setAllData(data);
    } catch (error) {
      console.error('Error fetching all data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/finance/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Data deleted successfully');
        fetchAllData();
      } else {
        alert('Failed to delete data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Finance Dashboard</h2>
      
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" name="paymentID" placeholder="Payment ID" onChange={handleChange} className="form-input" />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} className="form-input" />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} className="form-input" />
        <select name="type" onChange={handleChange} className="form-input">
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
        <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} className="form-input" />
        <input type="date" name="date" onChange={handleChange} className="form-input" />
        <button type="submit" className="submit-button">Add Data</button>
      </form>

      <button onClick={fetchChartData} className="analytics-button">View Analytics</button>

      {chartData && (
        <div className="chart-container">
          <Pie 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: true, position: 'top' },
                title: { display: true, text: 'Monthly Financial Summary', font: { size: 15 } },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      const total = context.dataset.data.reduce((acc, cur) => acc + cur, 0);
                      const percentage = ((value / total) * 100).toFixed(2);
                      const sign = label === 'Debit' ? '↓' : '↑';
                      return `${label}: ${sign} $${value} (${percentage}%)`;
                    }
                  }
                },
                datalabels: {
                  color: '#fff',
                  formatter: (value, context) => {
                    const total = context.dataset.data.reduce((acc, cur) => acc + cur, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${context.chart.data.labels[context.dataIndex]}: ${percentage}%`;
                  }
                }
              }
            }}
          />
        </div>
      )}

      <div className="table-container">
        <h3>All Financial Data</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Department</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Contact Number</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allData.length > 0 ? (
              allData.map((item) => (
                <tr key={item._id}>
                  <td>{item.paymentID || 'N/A'}</td>
                  <td>{item.department || 'N/A'}</td>
                  <td>${item.amount || 0}</td>
                  <td>{item.type}</td>
                  <td>{item.contactNumber || 'N/A'}</td>
                  <td>{item.date || 'N/A'}</td>
                  <td>
                    <button onClick={() => handleDelete(item._id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No financial data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceDashboard;
