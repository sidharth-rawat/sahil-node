require("dotenv").config({path:".env", quiet:true})


const app = require("./app");
const {connectDB,checkConnection} = require("./config/db");
const port = process.env.PORT;


app.get("/app", (req, res) => {
    console.log("Route hit");
    res.status(200).json({
        success: true,
        message: "Server is running 🚀"
    });
});
app.get('/health', async (req, res) => {
    try {
        const healthStatus = await checkConnection();
        return res.status(200).json(healthStatus);
    } catch (error) {
        return res
            .status(400)
            .json({ message: error.message });
    }
});

app.get("/app", (req, res) => {
    console.log("Route hit");
    res.status(200).json({
        success: true,
        message: "Server is running 🚀"
    });
});


connectDB();

app.listen(port, (err)=>{
    if(err) throw err;
    
})


