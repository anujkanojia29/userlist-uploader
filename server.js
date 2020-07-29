const dotenv = require('dotenv');
// Load env vars
dotenv.config({ path: './config/config.env'});

const app = require('./src/app');

const PORT = process.env.PORT || 4800;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode at port ${PORT}`);
});

//Handled unhandled rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    console.log(`Closing server...`);
    // close server
    server.close(() => process.exit(1));
});