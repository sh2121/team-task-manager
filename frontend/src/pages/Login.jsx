import { useState } from "react";
import axios from "../axiosConfig";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      console.log("Sending data:", data);
      if (!data.email || !data.password) {
        return alert("Please enter email and password");
      }

      const res = await axios.post("/login", data);

      console.log("Response:", res.data); 

      localStorage.setItem("token", res.data.token);

      window.location.href = "/dashboard";

    } catch (err) {
      console.log("Error:", err.response?.data || err.message);

      alert(
        err.response?.data?.msg || "Login failed. Check credentials."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

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

        <button onClick={login}>Login</button>
        <p style={{ marginTop: "10px" }}>
  Don't have an account?{" "}
  <a href="/signup">Signup</a>
</p>
      </div>
    </div>
  );
}