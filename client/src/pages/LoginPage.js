import {NavLink, useNavigate } from "react-router";
import { useEffect } from "react";

function LoginPage() {
const navigate = useNavigate();
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
async function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target);
    const phone = event.target.phone.value;
    const password = event.target.password.value;
    // Here you would typically handle the login logic, e.g., API call
    console.log('Phone:', phone);
    console.log('Password:', password);
    try {
    const user = await fetch(`${process.env.REACT_APP_API_URL}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, password }),
        }
    );
    if (user.ok) {
        const data = await user.json();
if(data.status === "401"){
            console.error("Unauthorized access:", data.message);
            alert("Unauthorized access. Please check your credentials.");
            return;
        }
        console.log('Login successful:', data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem('userData', JSON.stringify(data.userData));
          navigate("/"); // ✅ Redirect after login
        }
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again later.");
    }
  
}

    return (
    <div className="auth-page">
      <div className="auth-box login-box">
        <h1>Login</h1>
        <form onSubmit={e=>{handleSubmit(e)}}>
            <div>
            <label htmlFor="phone">Phone Number:</label>
            <input type="text" id="phone" name="phone" required />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
         <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
}
export default LoginPage;
