import axios from "axios";

const axiosApi=axios.create({
    baseURL:import.meta.env.VITE_FIREBASE_DB_URL,
});

export default axiosApi;