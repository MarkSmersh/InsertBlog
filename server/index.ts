import express from 'express';
import fs from 'fs';
import { MiddlewareError } from './middleware';

import * as env from 'dotenv';
env.config({ path: __dirname + "/../.env" });

fs.writeFileSync(__dirname + "/.env", `DATABASE_URL="${process.env.DATABASE_URL}"`)

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("/posts", require("./routes/posts"));

app.use(MiddlewareError);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})