import express from "express";

import { connectToDatabaqse } from "./helpers.js";

const app = express();

app.get('/', (req, res) => {
    return res.send('<h1>Hello</h1>');
});

await connectToDatabaqse();

app.listen(3000);