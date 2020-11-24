const express = require("express");
const app = express();
const port = 5000;
const userRoute = require("./routes/user");
app.get("/", (req, res) => res.send("Hi Express"));

app.use("/api/users",userRoute);

app.listen(port, () => console.log("hi express!!"));