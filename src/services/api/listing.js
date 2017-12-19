import request from "shared/lib/request";

function get(id) {
    return request({
        url: `/listings/${id}.json`,
        method: "GET" 
    });
}

function get_most_recent(num) {
    return request({
        url: `/listings.json`,
        method: "GET"
    });
}

function get_my_listings(num) {
    return request({
        url: `/listings/user.json`,
        method: "GET"
    });
}

const ListingService = { 
    get, 
    get_most_recent,
    get_my_listings
};

export default ListingService;