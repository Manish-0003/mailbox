import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        const checkEmailVerification = async () => {
            try {
               
                const idToken = localStorage.getItem('idToken');
                if (!idToken) return;

                const response = await fetch(
                    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBE8PDk08I4DVaeEO6auZ9E486cUtvX1pQ`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idToken,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                const user = data.users[0];

               
                setIsEmailVerified(user.emailVerified);
            } catch (error) {
                console.error('Error checking email verification:', error);
            }
        };

        checkEmailVerification();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBE8PDk08I4DVaeEO6auZ9E486cUtvX1pQ", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    password,
                    returnSecureToken: true,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error.message);
            }

            const data = await response.json();
            const idToken = data.idToken; 

           
            localStorage.setItem('idToken', idToken);

           
            setUsername('');
            setPassword('');
            setError('');
            console.log("User logged in successfully");
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    required 
                    value={username} 
                    onChange={(event) => setUsername(event.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
            {isEmailVerified && <p>Email is verified. You're ready to go!</p>}
            {!isEmailVerified && (
                <p>
                    Your email is not verified. Please verify your email to continue. 
                   
                    <Link to="/verify-email">Resend verification email</Link>
                </p>
            )}
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
}

export default Login;