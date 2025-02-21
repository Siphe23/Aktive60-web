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
  { day: 0, midrand: 170, parktown: 340, sloane: 255 },
  { day: 1, midrand: 90, parktown: 200, sloane: 150 },
  { day: 2, midrand: 50, parktown: 180, sloane: 200 },
  { day: 3, midrand: 75, parktown: 100, sloane: 85 },
  { day: 4, midrand: 120, parktown: 350, sloane: 150 },
  { day: 5, midrand: 200, parktown: 90, sloane: 250 },
  { day: 6, midrand: 180, parktown: 255, sloane: 85 },
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
