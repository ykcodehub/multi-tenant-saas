const app = require('./app');

app.listen(8000, () => {
    console.log("...............API running on port 8000.............\n");
});

const connectDB = require(`./config/db`);
require(`dotenv`).config();
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
});


