import React from 'react';

function VerifyEmail() {
    const handleResendVerificationEmail = async () => {
        
        try {
            
            const idToken = localStorage.getItem('idToken');
            if (!idToken) return;

            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBE8PDk08I4DVaeEO6auZ9E486cUtvX1pQ`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        requestType: 'VERIFY_EMAIL',
                        idToken,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to resend verification email');
            }

            console.log('Verification email resent successfully');
        } catch (error) {
            console.error('Error resending verification email:', error);
        }
    };

    return (
        <div>
            <h2>Verify Email</h2>
            <p>
                Please click on verify link button to verify your's email id 
            </p>
            <button onClick={handleResendVerificationEmail}>Verify email </button>
        </div>
    );
}

export default VerifyEmail;