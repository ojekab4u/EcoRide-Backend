
import morgan from "morgan";

const requestLogger = morgan((tokens, req, res) => {
    const userId = req.user?.id || "Guest";
    const role = req.user?.role || "Unauthenticated";

    return [
        `[API REQUEST]`,
        `${tokens.method(req, res)}`,
        `${tokens.url(req, res)}`,
        `Status: ${tokens.status(req, res)}`,
        `Time: ${tokens["response-time"](req, res)} ms`,
        `IP: ${tokens["remote-addr"](req, res)}`,
        `User: ${userId}`,
        `Role: ${role}`,
    ].join(" | ");
});

export default requestLogger;