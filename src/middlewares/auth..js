const adminAuth = (req, res) => {
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("unauthorised access");
    } else{
        next();
    }
}

const userAuth = (req, res) => {
    const userId = "abc";
    const isAuthUser = userId == "abc";
    if(!isAuthUser) {
        res.status(401).send("unauthorised access");
    } else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}