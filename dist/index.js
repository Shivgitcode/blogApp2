import express from "express";
import router from "./routes/userroutes.js";
import dotenv from "dotenv";
dotenv.config();
const userRoutes = router;
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use("/api/v1/", userRoutes);
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
