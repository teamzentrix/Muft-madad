require('dotenv').config();
const express = require('express');

const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/auth.routes')
const cors = require('cors')
const userReviewRoutes = require('./routes/userReview.routes');
const AddTreatment = require('./routes/treatments.routes')
const hospitalRoutes = require('./routes/hospitals.routes'); // ✅ added
const doctorsRoutes = require('./routes/doctors.routes');


const PORT = process.env.PORT || 4000
const app = express();


app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
    credentials: true,
}));


const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10
});


app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users/', userReviewRoutes);
app.use('/api/admin/', AddTreatment);
app.use('/api/auth/', hospitalRoutes);
app.use('/api/doctors', doctorsRoutes);




const StartServer = () => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log('🐘 Database ready');
    });
};


StartServer();
