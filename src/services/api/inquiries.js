import Cookies from "js-cookie";
import request from "shared/lib/request";


function put(data) {
    return request({
        url: `/inquiries/send/`,
        method: "PUT",
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        data: data
    }); 
}

const InquiryService = {
    put
};

export default InquiryService;