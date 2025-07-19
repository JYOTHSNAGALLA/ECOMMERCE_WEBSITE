import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const phone = event.target.phone.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("https://ecom-server-88fq.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || data.status === "401") {
        alert("Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token); // ✅ fixed this line
        localStorage.setItem("userData", JSON.stringify(data.userData));
        navigate("/"); // ✅ redirect after login
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input type="text" id="phone" name="phone" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
