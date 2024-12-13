const express = require("express");
const { createServer } = require("http"); // Use 'require' instead of 'import'
const { Server } = require("socket.io");

const mongoose = require("mongoose");
const { connectToSocket } = require("./controllers/socketManager");

const cors = require("cors");
const userRoutes = require("./routes/users.routes");

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user");
    const connectionDb = await mongoose.connect("mongodb+srv://imdigitalashish:imdigitalashish@cluster0.cujabk4.mongodb.net/");

    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8000");
    });
}

start();
