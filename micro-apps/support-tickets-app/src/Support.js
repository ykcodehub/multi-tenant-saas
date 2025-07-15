import React, { useEffect, useState } from 'react';

const Support = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    // Token hardcoded (for demo). Production mei use Context ya localStorage.
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODc2MmE2YmJmMDllODYyNTA1OTAwMmMiLCJjdXN0b21lcklkIjoiSG9wZUludGVybiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTc1MjU3NDU5OSwiZXhwIjoxNzUyNTc4MTk5fQ.VKq4MbrvvW_kP85AgvGtjFcOCMkPqWzQAWf39bzIDVA";

    useEffect(() => {
        console.log("Using token:", token);

        const fetchTickets = async () => {
            try {
                // API URL from .env or fallback to localhost
                const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

                const response = await fetch(`${apiUrl}/api/me/screens`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched data:", data);

                // Flexible: handle data.screens OR data.tickets OR array itself
                if (Array.isArray(data)) {
                    setTickets(data);
                } else if (Array.isArray(data.screens)) {
                    setTickets(data.screens);
                } else if (Array.isArray(data.tickets)) {
                    setTickets(data.tickets);
                } else {
                    setTickets([]);
                }
            } catch (err) {
                console.error("Error fetching tickets:", err);
                setTickets([]);
            }
            setLoading(false);
        };

        fetchTickets();
    }, [token]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>🎟 Support Tickets</h2>
            {loading ? (
                <p>Loading...</p>
            ) : tickets.length === 0 ? (
                <p>No tickets found</p>
            ) : (
                <ul>
                    {tickets.map((ticket, idx) => (
                        <li key={ticket.id || idx}>
                            {(ticket.subject || ticket.name || "Unnamed")} - {(ticket.status || "N/A")}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Support;
