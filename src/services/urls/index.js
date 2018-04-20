function genSiteURL(path) {
    return ROOT_URL + path;
}

function genMediaURL(path) {
    return ROOT_URL + path;
}

function genStaticURL(path) {
    return S3_URL + path;
}

const URLService = {
    genSiteURL,
    genMediaURL,
    genStaticURL
};

export default URLService;