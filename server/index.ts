import express from 'express';
import fs from 'fs';
import { MiddlewareError } from './middleware';
import cors from 'cors';
import path from 'path';

import * as env from 'dotenv';
env.config({ path: __dirname + "/../.env" });

fs.writeFileSync(__dirname + "/.env", `DATABASE_URL="${process.env.DATABASE_URL}"`)

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/posts', require('./routes/posts'));
app.use('/api/polls', require('./routes/polls'));
app.use('/api/images', require('./routes/images'));

app.use(MiddlewareError);

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})