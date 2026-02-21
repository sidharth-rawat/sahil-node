const express = require("express");
const authRoutes = require("./routes/authRoutes");
const AppError = require("./utils/AppError");
const globalError = require("./middlewares/globalError");
const todoRoutes = require("./routes/todoRoutes")
const cors= require("cors")
const { checkConnection } = require("./config/db")
const app = express();

app.use(express.json())
app.use(cors({ origin: "https://mytodoapp-beige.vercel.app" }))
app.use("/api/v1/users", authRoutes)
app.use("/api/v1/todo", todoRoutes)

app.get("/app", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running 🚀"
    });
});

app.get("/health", async (req, res) => {
    try {
        const healthStatus = await checkConnection();
        return res.status(200).json(healthStatus);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.use((req, res, next) => {
    next(new AppError(`path not found ${req.originalUrl}`, 404));
});



app.use(globalError)



module.exports = app;