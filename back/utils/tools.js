const getBearerToken = (authHeader) => {
    if(!authHeader){
        return null;
    }
    const header = authHeader.split(" ");
    if(header[0] == "Bearer"){
        return header[1];
    }
    return null;
};

module.exports = { getBearerToken }