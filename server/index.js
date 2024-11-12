const express = require("express");
const http = require("http")
const cors = require("cors")
const app = express();
const { Server } = require("socket.io");
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authMiddleware');
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
require("dotenv").config();

const server = http.createServer(app);


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB:", err));


app.use('/api/auth', authRoutes);

app.get('/api/protected', protect, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
});

server.listen(3001, () => {
    console.log("Server running on port 3001");
});



