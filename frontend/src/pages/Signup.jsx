import { useState } from "react";
import axios from "../axiosConfig";
import "../App.css";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member"
  });

  const signup = async () => {
    try {
      if (!data.name || !data.email || !data.password) {
        return alert("Please fill all fields");
      }

      const res = await axios.post("/signup", data);

      console.log(res.data);

      alert("Signup successful! Now login.");

      // redirect to login
      window.location.href = "/";

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <select
          onChange={(e) =>
            setData({ ...data, role: e.target.value })
          }
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        <button onClick={signup}>Signup</button>
      </div>
    </div>
  );
}