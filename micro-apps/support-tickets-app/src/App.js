// support-ticket-app/src/App.js
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token"); // Make sure token is stored
        const response = await fetch("http://localhost:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchMe();
  }, []);

  return (
    <div className="App">
      <h1>Support Dashboard</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {userData && (
        <div>
          <p><strong>User ID:</strong> {userData.userId}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          <p><strong>Customer ID:</strong> {userData.customerId}</p>
        </div>
      )}
    </div>
  );
}

export default App;
