export default function requestLogger(req, res, next) {
    console.log("=================================");
    console.log(`${new Date().toISOString()}`);
    console.log(`${req.method} ${req.originalUrl}`);
    console.log("IP:", req.ip);
    console.log("User-Agent:", req.headers["user-agent"]);
    console.log("Authorization:", req.headers.authorization || "None");
    console.log("Body:", req.body);
    console.log("=================================");

    next();
}