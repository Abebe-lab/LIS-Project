// EditAccount.jsx
import React, { useState, useEffect } from "react";

export default function EditUserAccount({ userId }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details from the backend
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setEmail(data.email);
        } else {
          setError("Error fetching user details.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("An error occurred while fetching user details.");
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });

      if (response.ok) {
        // Handle successful update (e.g., display a message)
        console.log("User updated successfully!");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("Update error:", error);
      setError("An error occurred during update.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Account</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      {/* ... other input fields for email */}
      <button type="submit">Save Changes</button>
    </form>
  );
}
