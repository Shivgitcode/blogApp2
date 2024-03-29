import AppError from "./errors.js";
export const authenticated = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
        next(new AppError("you are not logged In first login", 401));
    }
    else {
        next();
    }
    //   console.log(username);
};
