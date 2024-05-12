import React, { useState, useEffect } from "react";

function Profile({ idToken }) {
  const [profileName, setProfileName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchProfileData = async () => {
      try {
        
        const token = idToken;

        
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBE8PDk08I4DVaeEO6auZ9E486cUtvX1pQ",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: token,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        const userProfile = data.users[0];

        
        setProfileName(userProfile.displayName || "");
        setPhotoUrl(userProfile.photoUrl || "");
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        setLoading(false); 
      }
    };

    fetchProfileData(); 
  }, [idToken]); 

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
     
      const token = idToken;

      
      const requestBody = {
        displayName: profileName,
        photoURL: photoUrl,
      };

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBE8PDk08I4DVaeEO6auZ9E486cUtvX1pQ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
            ...requestBody,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error.message || "Failed to update profile");
      }

      
      console.log("User profile updated successfully!");
    } catch (error) {
      
      console.error("Error updating user profile:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label htmlFor="profileName">Profile Name:</label>
          <input
            type="text"
            id="profileName"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="photoUrl">Photo URL:</label>
          <input
            type="text"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;