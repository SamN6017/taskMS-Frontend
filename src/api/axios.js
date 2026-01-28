import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔐 Attach JWT before request is sent
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("Attaching token to request:", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token invalid / expired — avoid a full page reload here so the app
            // can handle the session loss in an SPA-friendly way. Dispatch a
            // custom event that React can listen for and navigate internally.
            console.warn("API returned 401 — emitting app:unauthorized event", error.response);
            // Optionally remove token locally
            // localStorage.removeItem("token");
            try {
                window.dispatchEvent(new CustomEvent("app:unauthorized", { detail: error.response }));
            } catch (e) {
                // Older browsers may not support CustomEvent constructor
                const ev = document.createEvent("Event");
                ev.initEvent("app:unauthorized", true, true);
                window.dispatchEvent(ev);
            }
        }

        return Promise.reject(error);
    }
);


export default api;
