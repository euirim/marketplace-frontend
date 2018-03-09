function genMediaURL(path) {
    return ROOT_URL + path;
}

function genStaticURL(path) {
    return S3_URL + path;
}

const URLService = {
    genMediaURL,
    genStaticURL
};

export default URLService;