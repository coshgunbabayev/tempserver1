require("dotenv").config()

const express = require("express");
const app = express();

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
})

// connection with DB
const { connection } = require("./database/connection");
connection();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

// middlewares
const { reqWrite } = require("./middlewares/notify");

// routes
const pageRoute = require("./routes/pageRouter").router;
const userRoute = require("./routes/userRouter").router;
const postRoute = require("./routes/postRouter").router;

// urls
app.use("/", reqWrite, pageRoute);
app.use("/api/user", reqWrite, userRoute);
app.use("/post", reqWrite, postRoute);