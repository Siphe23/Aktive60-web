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
  { day: 'Mon', parktown: 340, sloane: 255, midrand: 170 },
  { day: 'Tue', parktown: 255, sloane: 170, midrand: 85 },
  { day: 'Wed', parktown: 170, sloane: 85, midrand: 0 },
  { day: 'Thu', parktown: 85, sloane: 0, midrand: 0 },
  { day: 'Fri', parktown: 0, sloane: 1, midrand: 2 },
  { day: 'Sat', parktown: 3, sloane: 4, midrand: 5 },
  { day: 'Sun', parktown: 6, sloane: 7, midrand: 0 },
];

const CustomChart = () => {
  return (
    <div className="active-users">
      <div className="chart-header">
        <h3>Active Users</h3>
        <select className="period-select">
          <option>Last 7 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="day" 
            stroke="white" 
            tick={{ fill: 'white' }}
          />
          <YAxis 
            stroke="white" 
            tick={{ fill: 'white' }}
            ticks={[0, 85, 170, 255, 340]} 
          />
          <Tooltip 
            contentStyle={{
              background: '#333',
              border: 'none',
              borderRadius: '8px'
            }}
          />
          <Legend 
            iconType="circle"
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Line 
            type="monotone" 
            dataKey="sloane" 
            name="Sloane Street Gym"
            stroke="white" 
            dot={{ fill: "white", r: 4 }}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="parktown" 
            name="Parktown"
            stroke="red" 
            dot={{ fill: "red", r: 4 }}
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="midrand" 
            name="Midrand"
            stroke="tan" 
            dot={{ fill: "tan", r: 4 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomChart;