import React, { useEffect, useState } from 'react';

const Home = () => {
    const [screens, setScreens] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token inside useEffect:", token);

        const fetchScreens = async () => {
            const res = await fetch('http://localhost:8000/api/me/screens', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log("API Response:", data);
            setScreens(data);
        };

        fetchScreens();
    }, []);

    return (
        <div>
            <h1>🏠 Home yeii!! 👌🥰</h1>
            <h3>Fetched Screens (raw JSON):</h3>
            <pre>{JSON.stringify(screens, null, 2)}</pre>
        </div>
    );
};

export default Home;
