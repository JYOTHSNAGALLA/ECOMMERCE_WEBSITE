import {NavLink, useNavigate } from "react-router";

function LoginPage() {
const navigate = useNavigate();
async function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target);
    const phone = event.target.phone.value;
    const password = event.target.password.value;
    // Here you would typically handle the login logic, e.g., API call
    console.log('Phone:', phone);
    console.log('Password:', password);
    const user = await fetch('http://localhost:5000/login',
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
                    localStorage.setItem('token', data.token);
                    console.log('Token stored in localStorage:', data.token);
                }
                const token = localStorage.getItem('token'); // Retrieve token from local storageInside api call
        navigate("/")
        // Redirect or update state as needed
            }else {
        console.error('Login failed');
        // Handle login failure (e.g., show an error message)
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
