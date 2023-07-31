import express from "express";
import cors from 'cors';
import generate from "/Users/nikhilmukherjee/Desktop/OPENAI-API-SQL/server/generate.js";

const app = express();

app.use(express.json());
app.use(cors({origin: "*"}));

const port = process.env.PORT || 3005;

app.get("/", (req,res) => {
    res.send("Hello World from our API");
});

app.post("/generate", async (req, res) => {
    const queryDescription = req.body;
    try {
        const sqlQuery = await generate(queryDescription);
        res.json({sqlQuery});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
    //console.log("received description: ", queryDescription);
    //res.json({response: `you sent this: ${queryDescription}`});
});

app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});