// FinanceDashboard.js
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import datalabels plugin
import { Chart } from 'chart.js';
import './FinanceDashboard.css';


// Register the plugin
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
  const [totals, setTotals] = useState({ debit: 0, credit: 0 });

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

      setTotals({ debit: totalDebit, credit: totalCredit });

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

  return (
    <div>
      <h2>Finance Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="paymentID" placeholder="Payment ID" onChange={handleChange} />
        <input type="text" name="department" placeholder="Department" onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} />
        <select name="type" onChange={handleChange}>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
        <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
        <input type="date" name="date" onChange={handleChange} />
        <button type="submit">Add Data</button>
      </form>
      <button onClick={fetchChartData}>Analytics</button>

      {chartData && (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Pie 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                  position: 'top'
                },
                title: {
                  display: true,
                  text: 'Monthly Financial Summary',
                  font: { size: 15 }
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      const total = context.dataset.data.reduce((acc, cur) => acc + cur, 0);
                      const percentage = ((value / total) * 100).toFixed(2);
                      const sign = label === 'Debit' ? '↓' : '↑'; // Custom sign for Debit (↓) and Credit (↑)
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

      {chartData && (
        <div>
          <h3>Total Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Total Debit</th>
                <th>Total Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rs {totals.debit}</td>
                <td>Rs {totals.credit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FinanceDashboard;
