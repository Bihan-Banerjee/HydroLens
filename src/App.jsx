import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import "./App.css";

const sampleData = [
  { time: "10:00", ph: 7.2, turbidity: 1.1 },
  { time: "10:10", ph: 6.9, turbidity: 1.5 },
  { time: "10:20", ph: 7.0, turbidity: 1.3 },
  { time: "10:30", ph: 7.3, turbidity: 1.0 },
];

function App() {
  const [prediction, setPrediction] = useState(null);

  const predictQuality = () => {
    const latest = sampleData[sampleData.length - 1];
    const quality =
      latest.ph >= 6.5 && latest.ph <= 8.5 && latest.turbidity < 5
        ? "Good"
        : "Poor";
    setPrediction(quality);
  };

  return (
    <div className="app-container">
      <h1>🌊 Water Quality Dashboard</h1>

      <div className="grid">
        <div className="card">
          <h2>Sensor Data</h2>
          <LineChart width={480} height={280} data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[6, 8]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ph" stroke="#8884d8" />
            <Line type="monotone" dataKey="turbidity" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="card">
          <h2>Prediction</h2>
          <p>Click to simulate a prediction using the latest water sensor data.</p>
          <button onClick={predictQuality}>Predict Water Quality</button>
          {prediction && (
            <div
              className={`result ${prediction === "Good" ? "good" : "poor"}`}
            >
              Water Quality: {prediction}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
