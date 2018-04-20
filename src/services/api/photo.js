import Cookies from "js-cookie";
import request from "shared/lib/request";

// function uploadPhoto(file):
function put(file) {
    return request({
        url: `/api/photos/upload/${file.name}`,
        method: "PUT",
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        data: file
    }); 
}

const PhotoService = {
    put
};

export default PhotoService;