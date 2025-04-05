import { useState } from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter,
  ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import "./App.css";

const COLORS = ["#8884d8", "#82ca9d", "#ff7300"];

const sampleData = [
  { time: "10:00", ph: 7.2, turbidity: 1.1, hardness: 0.5 },
  { time: "10:10", ph: 6.9, turbidity: 1.5, hardness: 0.3 },
  { time: "10:20", ph: 7.0, turbidity: 1.3, hardness: 0.4 },
  { time: "10:30", ph: 7.3, turbidity: 1.0, hardness: 0.5 },
  { time: "10:40", ph: 7.1, turbidity: 1.2, hardness: 0.9 },
  { time: "10:50", ph: 6.8, turbidity: 1.6, hardness: 0.8 },
  { time: "11:00", ph: 7.0, turbidity: 1.4, hardness: 0.7 },
  { time: "11:10", ph: 7.4, turbidity: 1.0, hardness: 0.2 },
  { time: "11:20", ph: 7.3, turbidity: 1.1, hardness: 0.1 },
  { time: "11:30", ph: 7.1, turbidity: 1.2, hardness: 0.6 }
];

function App() {
  const [chartType, setChartType] = useState("line");

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart width={480} height={280} data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 8]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ph" stroke="#8884d8" />
            <Line type="monotone" dataKey="turbidity" stroke="#82ca9d" />
            <Line type="monotone" dataKey="hardness" stroke="#ff7300" />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart width={480} height={280} data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ph" fill="#8884d8" />
            <Bar dataKey="turbidity" fill="#82ca9d" />
            <Bar dataKey="hardness" fill="#ff7300" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart width={480} height={280} data={sampleData}>
            <defs>
              <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTurb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHardness" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="ph" stroke="#8884d8" fillOpacity={1} fill="url(#colorPh)" />
            <Area type="monotone" dataKey="turbidity" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTurb)" />
            <Area type="monotone" dataKey="hardness" stroke="#ff7300" fillOpacity={1} fill="url(#colorHardness)" />
          </AreaChart>
        );
      case "composed":
        return (
          <ComposedChart width={480} height={280} data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="turbidity" barSize={20} fill="#82ca9d" />
            <Line type="monotone" dataKey="ph" stroke="#8884d8" />
            <Line type="monotone" dataKey="hardness" stroke="#ff7300" />
          </ComposedChart>
        );
      case "scatter":
        return (
          <ScatterChart width={480} height={280}>
            <CartesianGrid />
            <XAxis type="number" dataKey="ph" name="pH" />
            <YAxis type="number" dataKey="turbidity" name="Turbidity" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Samples" data={sampleData} fill="#8884d8" />
          </ScatterChart>
        );
      case "radar":
        const avgPH = (sampleData.reduce((sum, d) => sum + d.ph, 0) / sampleData.length).toFixed(2);
        const avgTurb = (sampleData.reduce((sum, d) => sum + d.turbidity, 0) / sampleData.length).toFixed(2);
        const avgHardness = (sampleData.reduce((sum, d) => sum + d.hardness, 0) / sampleData.length).toFixed(2);
        const radarData = [
          { metric: "pH", value: Number(avgPH) },
          { metric: "Turbidity", value: Number(avgTurb) },
          { metric: "Hardness", value: Number(avgHardness) }
        ];
        return (
          <RadarChart cx={240} cy={140} outerRadius={100} width={480} height={280} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis />
            <Radar name="Avg" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        );
      case "pie":
        const sumPH = sampleData.reduce((sum, d) => sum + d.ph, 0);
        const sumTurb = sampleData.reduce((sum, d) => sum + d.turbidity, 0);
        const sumHardness = sampleData.reduce((sum, d) => sum + d.hardness, 0);
        const pieData = [
          { name: "Total pH", value: sumPH },
          { name: "Total Turbidity", value: sumTurb },
          { name: "Total Hardness", value: sumHardness }
        ];
        return (
          <PieChart width={480} height={280}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );
      case "histogram":
        const histogramData = [
          { range: "6.5-6.9", count: sampleData.filter(d => d.ph >= 6.5 && d.ph < 7.0).length },
          { range: "7.0-7.4", count: sampleData.filter(d => d.ph >= 7.0 && d.ph <= 7.4).length },
        ];
        return (
          <BarChart width={480} height={280} data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <h1>🌊 HydroLens</h1>

      <div className="chart-selector">
        <label htmlFor="chartType">Chart Type: </label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="area">Area Chart</option>
          <option value="composed">Composed Chart</option>
          <option value="scatter">Scatter Chart</option>
          <option value="radar">Radar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="histogram">Histogram (pH Range)</option>
        </select>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Sensor Data</h2>
          {renderChart()}
        </div>

        <div className="card">
          <h2>Prediction</h2>
          <p>Click to simulate a prediction using the latest water sensor data.</p>
          <button className="predict-button" onClick={() => alert("Hooked up to AI logic earlier")}>Predict Water Quality</button>
        </div>
      </div>
    </div>
  );
}

export default App;
