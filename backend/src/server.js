import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js'

import db from './models/index.js';
// import leaderboardRoutes from './routes/leaderboard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/user', userRoutes);

try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("❌ Unable to connect to the database:", error);
}