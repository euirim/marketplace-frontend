import Cookies from "js-cookie";

import request from "shared/lib/request";

var default_page_size = 25;

function get(id) {
    return request({
        url: `/api/listings/${id}.json`,
        method: "GET",
    });
}

function get_most_recent(num=default_page_size, page=1) {
    return request({
        url: `/api/listings/?format=json`,
        method: "GET",
        params: {
            page_size: num,
            page: page
        }
    });
}

function get_my_listings(num=default_page_size, page=1) {
    return request({
        url: `/api/listings/user.json`,
        method: "GET",
        params: {
            page_size: num,
            page: page
        }
    });
}

function filter(params) {
    return request({
        url: `/api/listings/?format=json`,
        method: "GET",
        params: params
    });
}

function put(data) {
    return request({
            url: `/api/listings/new/`,
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