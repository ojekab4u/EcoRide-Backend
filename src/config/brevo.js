import axios from "axios";

export const brevo = axios.create({
    baseURL: "https://api.brevo.com/v3",
    headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});