import { useNavigate } from 'react-router';

function RegisterPage() {
   const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
        const name = event.target.username.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        const phone = event.target.phone.value;
   
        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = await fetch('http://localhost:5000/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password, phone }),
            }
        ); 
        console.log("User data:", user);
        if (user.ok) {
            const data = await user.json();
            console.log('Registration successful:', data);
            navigate('/login'); // Redirect to login page after successful registration
        } else {
            console.error('Registration failed');
            // Handle registration failure (e.g., show an error message)
        }

    }
  
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
            <label htmlFor="phone">Phone Number:</label>
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
