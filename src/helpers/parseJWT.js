const parseJwt = (token) => {
    if (!token) {
        return;
    }
    const base64Url = token.split(".")[1]; // Obtiene la segunda parte del token (payload)
    const base64 = base64Url.replace("-", "+").replace("_", "/"); // Decodifica el base64Url para que tenga el formato estándar
    
    return JSON.parse(window.atob(base64)); // Convierte el base64 a JSON y lo parsea
}

export const userToken = () => {
    // Si está activo el httpOnly
    if(document.cookie){
        const token = document.cookie.split('; ').find(row => row.startsWith('Bearer=')).split('=')[1];
        const user = parseJwt(token);
        return user;
    } else {
        const token = localStorage.getItem("token");
        if(!token) return null;

        const user = parseJwt(token);
        return user;
    }
};