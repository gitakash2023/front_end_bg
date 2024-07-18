export const authenticateUser = (username, password) => {

    if (username === "admin" && password === "admin123") {
        return { role: "admin" };
    } else if (username === "client" && password === "client123") {
        return { role: "client" };
    } else if (username === "candidate" && password === "candidate123") {
        return { role: "candidate" };
    } else if (username === "team" && password === "team123") {
        return { role: "team" };
    } else {
        return null;
    }
};
