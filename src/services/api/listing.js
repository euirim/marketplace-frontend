import Cookies from "js-cookie";

import request from "shared/lib/request";

function get(id) {
    return request({
        url: `/listings/${id}.json`,
        method: "GET",
    });
}

function get_most_recent(num) {
    return request({
        url: `/listings/?format=json`,
        method: "GET"
    });
}

function get_my_listings(num) {
    return request({
        url: `/listings/user.json`,
        method: "GET"
    });
}

function filter(params) {
    return request({
        url: `/listings/?format=json`,
        method: "GET",
        params: params
    });
}

function put(data) {
    return request({
            url: `/listings/new/?format=json`,
        method: "PUT",
        headers: {
            "X-CSRFToken": Cookies.get("csrftoken")
        },
        data: data
    }); 
}

const ListingService = { 
    get, 
    get_most_recent,
    get_my_listings,
    put,
    filter
};

export default ListingService;