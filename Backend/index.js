const express = require("express");
const app = express();
const MongoDb = require("./src/config/Database");
const userRoute = require("./src/routes/User.routes");
const cors = require("cors");

app.use(cors({
    origin: "*",
}));
app.use(express.json());

MongoDb.then(
    app.listen(3000, () => {
        console.log("Server Started at 3000");
    })
).catch(() => {
    console.error("Server Error");
})

app.use("/api/v1/users", userRoute)