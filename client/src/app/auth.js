import axios from "axios";

const checkAuth = () => {
    const TOKEN = localStorage.getItem("token");
    const PUBLIC_ROUTES = ["/login", "/forgot-password", "/register", "/documentation", "/"];

    const currentPath = window.location.pathname;

    const isPublicPage = PUBLIC_ROUTES.includes(currentPath);

    if (!TOKEN && !isPublicPage) {
        if (currentPath !== '/') {
            window.location.href = '/';  // Redirect to root only if not already there
        }
        return null;
    } else if (TOKEN) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

        axios.interceptors.request.use(function (config) {
            document.body.classList.add('loading-indicator');
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            document.body.classList.remove('loading-indicator');
            return response;
        }, function (error) {
            document.body.classList.remove('loading-indicator');
            return Promise.reject(error);
        });

        return TOKEN;
    }

    return null;
}

export default checkAuth;
