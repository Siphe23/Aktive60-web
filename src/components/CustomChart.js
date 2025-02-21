import React from "react";
import '../styles/Graph.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: 0, parktown: 340, sloane: 255, midrand: 170 },
  { day: 1, parktown: 255, sloane: 170, midrand: 85 },
  { day: 2, parktown: 170, sloane: 85, midrand: 0 },
  { day: 3, parktown: 85, sloane: 0, midrand: 0 },
  { day: 4, parktown: 0, sloane: 1, midrand: 2 },
  { day: 5, parktown: 3, sloane: 4, midrand: 5 },
  { day: 6, parktown: 6, sloane: 7, midrand: 0 },
];

const CustomChart = () => {
  return (
    <div className="chart-container">
      <h3>Active Users</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />
          <XAxis dataKey="day" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Legend iconType="circle" />
          <Line type="monotone" dataKey="sloane" stroke="white" dot={{ fill: "white" }} />
          <Line type="monotone" dataKey="parktown" stroke="red" dot={{ fill: "red" }} />
          <Line type="monotone" dataKey="midrand" stroke="tan" dot={{ fill: "tan" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomChart;
