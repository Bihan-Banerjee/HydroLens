import { useState } from "react";
import Papa from "papaparse";
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



function App() {
  const COLORS = ["#8884d8", "#82ca9d", "#ff7300"];
  const [chartType, setChartType] = useState("line");
  const [prediction, setPrediction] = useState("");

const fallbackData = [
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

<<<<<<< HEAD
function App() {
  const [chartType, setChartType] = useState("line");
  const [data, setData] = useState(fallbackData);
=======


  function predictWaterQuality(data) {
    const latest = data[data.length - 1];
    const { ph, turbidity, hardness } = latest;

    let score = 0;

    if (ph >= 6.5 && ph <= 8.5) score++;
    if (turbidity <= 1.5) score++;
    if (hardness <= 0.7) score++;

    let result = "";
    if (score === 3) result = "Excellent";
    else if (score === 2) result = "Good";
    else if (score === 1) result = "Bad";
    else result = "Terrible";

    setPrediction(`Latest water quality is: ${result}`);
  }
>>>>>>> 5806928707a4e0be66a949069622ca8bc9165d00

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const raw = result.data.map(row => ({
          ph: parseFloat(row.ph),
          turbidity: parseFloat(row.turbidity),
          hardness: parseFloat(row.hardness),
        }));
  
        // Normalize hardness using min-max normalization
        const hardnessValues = raw.map(r => r.hardness);
        const minHardness = Math.min(...hardnessValues);
        const maxHardness = Math.max(...hardnessValues);
  
        const normalized = raw.map(r => ({
          ...r,
          hardness: (r.hardness - minHardness) / (maxHardness - minHardness)
        }));
  
        setData(normalized);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      }
    });
  };
  
  const renderChart = () => {
    if (!data || data.length === 0) return <p>No data available</p>;

    switch (chartType) {
      case "line":
        return (
          <LineChart width={480} height={280} data={data}>
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
          <BarChart width={480} height={280} data={data}>
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
          <AreaChart width={480} height={280} data={data}>
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
          <ComposedChart width={480} height={280} data={data}>
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
            <Scatter name="Samples" data={data} fill="#8884d8" />
          </ScatterChart>
        );
      case "radar":
        const avgPH = (data.reduce((sum, d) => sum + d.ph, 0) / data.length).toFixed(2);
        const avgTurb = (data.reduce((sum, d) => sum + d.turbidity, 0) / data.length).toFixed(2);
        const avgHardness = (data.reduce((sum, d) => sum + d.hardness, 0) / data.length).toFixed(2);
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
        const sumPH = data.reduce((sum, d) => sum + d.ph, 0);
        const sumTurb = data.reduce((sum, d) => sum + d.turbidity, 0);
        const sumHardness = data.reduce((sum, d) => sum + d.hardness, 0);
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
          { range: "6.5-6.9", count: data.filter(d => d.ph >= 6.5 && d.ph < 7.0).length },
          { range: "7.0-7.4", count: data.filter(d => d.ph >= 7.0 && d.ph <= 7.4).length },
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

      <div className="upload-container">
  <label className="upload-label">Upload Water Quality CSV File</label>
  <div className="custom-file-input">
    Choose File
    <input type="file" accept=".csv" onChange={handleFileUpload} />
  </div>
</div>


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
          <button className="predict-button" onClick={() => predictWaterQuality(sampleData)}>Predict Water Quality</button>
          <p className="prediction-result">{prediction}</p>

        </div>
      </div>
    </div>
  );
}

export default App;
