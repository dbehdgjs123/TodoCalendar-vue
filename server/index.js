const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const port = 5000;
const userRoute = require("./routes/user");
app.get("/", (req, res) => res.send("Hi Express"));
app.use(express.json()); //서버 요청의 값은 body로 들어온다. body에 넣어주기 위해 사용한다.
app.use(cookieParser());
app.use("/api/users",userRoute);

app.listen(port, () => console.log("hi express!!"));