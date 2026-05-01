import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "../App.css";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("/dashboard", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => setData(res.data));
  }, []);

  return (
    <div className="container">
      <h1 className="title">📊 Team Dashboard</h1>

      <div className="card-container">
        <div className="card total">
          <h3>Total Tasks</h3>
          <p>{data.total || 0}</p>
        </div>

        <div className="card completed">
          <h3>Completed</h3>
          <p>{data.completed || 0}</p>
        </div>

        <div className="card progress">
          <h3>In Progress</h3>
          <p>{data.inProgress || 0}</p>
        </div>

        <div className="card todo">
          <h3>Todo</h3>
          <p>{data.todo || 0}</p>
        </div>

        <div className="card overdue">
          <h3>Overdue</h3>
          <p>{data.overdue || 0}</p>
        </div>
      </div>
    </div>
  );
}