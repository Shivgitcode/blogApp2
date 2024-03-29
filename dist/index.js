import express from "express";
import router from "./routes/userroutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import { router as postRoutes } from "./routes/postRoutes.js";
import { cloudinaryConnect } from "./config/cloudinary.js";
dotenv.config();
const userRoutes = router;
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
cloudinaryConnect();
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", postRoutes);
app.use((err, req, res, next) => {
    const { message = "Internal server error", status = 500 } = err;
    res.status(status).json({
        message: message,
        success: false,
    });
    next(err);
});
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
