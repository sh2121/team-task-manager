import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "../App.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    projectId: ""
  });

  const token = localStorage.getItem("token");

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);

      const [taskRes, projectRes, userRes] = await Promise.all([
        axios.get("/tasks", {
          headers: { Authorization: token }
        }),
        axios.get("/projects", {
          headers: { Authorization: token }
        }),
        axios.get("/users", {
          headers: { Authorization: token }
        })
      ]);

      setTasks(taskRes.data);
      setProjects(projectRes.data);
      setUsers(userRes.data);

    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create task
  const createTask = async () => {
    if (!form.title || !form.projectId || !form.assignedTo) {
      return alert("Please fill all required fields");
    }

    try {
      await axios.post("/task", form, {
        headers: { Authorization: token }
      });

      setForm({
        title: "",
        description: "",
        assignedTo: "",
        projectId: ""
      });

      fetchData();
    } catch (err) {
      console.log("Create task error:", err);
      alert("Error creating task");
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/task/${id}`,
        { status },
        { headers: { Authorization: token } }
      );
      fetchData();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="container">
      <h1 className="title">📝 Task Manager</h1>

      {/* Create Task */}
      <div className="task-form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        {/* Project Dropdown */}
        <select
          value={form.projectId}
          onChange={e => setForm({ ...form, projectId: e.target.value })}
        >
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* User Dropdown */}
        <select
          value={form.assignedTo}
          onChange={e => setForm({ ...form, assignedTo: e.target.value })}
        >
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <button onClick={createTask}>Create Task</button>
      </div>

      {/* Task Cards */}
      <div className="task-grid">
        {tasks.map(t => (
          <div key={t._id} className="task-card">
            <h3>{t.title}</h3>
            <p>{t.description}</p>

            <span className={`status ${t.status.replace(" ", "")}`}>
              {t.status}
            </span>

            <select
              value={t.status}
              onChange={(e) => updateStatus(t._id, e.target.value)}
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}