const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cron = require('node-cron');
const flashSaleController = require('./controllers/flashSaleController');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true
}));
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();
initRoutes(app);

// Cron job để gửi thông báo mỗi phút một lần
cron.schedule('*/1 * * * *', flashSaleController.sendNotification);

app.use('/', (req, res) => {
    res.send('Server on');
});

app.listen(port, () => {
    console.log('Server on port ' + port);
});
