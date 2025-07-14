import { useNavigate } from 'react-router';

function RegisterPage() {
   const navigate = useNavigate();

    const handleSubmit = async (event) => {
  event.preventDefault();

  const name = event.target.username.value;
  const password = event.target.password.value;
  const confirmPassword = event.target.confirmPassword.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;

  if (!email && !phone) {
    alert("Please provide at least an email or a phone number.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, phone, email }),
    });

    const data = await response.json();
    console.log("User data:", data);

    if (response.ok) {
      console.log('Registration successful:', data);
      alert("Registration successful!");
      navigate('/login');
    } else {
      // Show server error message if available
      alert(data.message || "Registration failed.");
      console.error("Registration failed:", data.message);
    }

  } catch (err) {
    console.error("Registration error:", err);
    alert("Server error. Please try again later.");
  }
};

  
    return (
    <div>
        <div className="auth-page">
           <div className="auth-box register-box">
           <h1>Register</h1>
        <form onSubmit={handleSubmit}> 
            <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            </div>
            <div>
            <label htmlFor="email">Email (optional):</label>
            <input type="email" id="email" name="email" required />
            </div>
            <div>
            <label htmlFor="phone">Phone Number (optional):</label>
            <input type="phone" id="phone" name="phone" />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            </div>
            <div>
            <label htmlFor="confirmPassword" onI>Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
            <button type="submit">Register</button>
            <div className="register-page">
            </div>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    </div>
    </div>
  );
}

export default RegisterPage;
