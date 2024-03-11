const express = require("express");
const { testQueue } = require('./worker');
//const morgan = require("morgan");

const app = express();

app.use(express.json());
//app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
    const time = req.params.t;
    const data = await testQueue.add('getdelay', time);
    res.json({ "res": data});
})

app.listen(3001, () => { 
    console.log("Connected");
});

module.exports = {testQueue};