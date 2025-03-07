const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";


const getLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

const setLocalStorage = (key: string, value: string | object) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

const clearLocalStorage = () => {
    localStorage.clear();
};

export { ACCESS_TOKEN, REFRESH_TOKEN, getLocalStorage, setLocalStorage, removeLocalStorage, clearLocalStorage }