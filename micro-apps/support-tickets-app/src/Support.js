import React, { useEffect, useState } from "react";

const Support = () => {
  const [screens, setScreens] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODc5NWE3YzI5NjdjMjFmMmI4NWYzMWMiLCJjdXN0b21lcklkIjoidGVuYW50MSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1Mjc4MzUwNiwiZXhwIjoxNzUyODY5OTA2fQ.eZl6EXYyzoPmuzvk5sNYaT7UxNXiXHZSymLWJUmlpUY"; 
  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const response = await fetch(`${API_URL}/api/me/screens`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to fetch screens");
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setScreens(data.screens || []);
      } catch (err) {
        console.error("Error fetching screens:", err.message);
        setError(err.message);
      }
    };

    fetchScreens();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Support Dashboard</h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <ul>
          {screens.length > 0 ? (
            screens.map((screen) => (
              <li key={screen._id}>{screen.name}</li>
            ))
          ) : (
            <p>Loading or no screens available...</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Support;
