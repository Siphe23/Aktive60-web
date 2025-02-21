import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../styles/Graph.css';

const data = [
  { day: '0', Bryston: 260, Midrand: 100, Parktown: 170 },
  { day: '1', Bryston: 170, Midrand: 80, Parktown: 140 },
  { day: '2', Bryston: 85, Midrand: 50, Parktown: 90 },
  { day: '3', Bryston: 110, Midrand: 90, Parktown: 120 },
  { day: '4', Bryston: 340, Midrand: 220, Parktown: 300 },
  { day: '5', Bryston: 170, Midrand: 140, Parktown: 200 },
  { day: '6', Bryston: 200, Midrand: 130, Parktown: 180 },
];

const Graph = () => {
  return (
    <div className="graph-container">
      <h3>Active Users</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Bryston" stroke="#8884d8" />
          <Line type="monotone" dataKey="Midrand" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Parktown" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
