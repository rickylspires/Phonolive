const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

// setting up config files
dotenv.config({ path: 'backend/config/config.env' })

//connecting to Database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})