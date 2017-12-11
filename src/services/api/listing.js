import request from "shared/lib/request";

function get(id) {
    return request({
        url: `/listings/${id}`,
        method: "GET" 
    });
}

function get_most_recent(num) {
    return request({
        url: `/listings`,
        method: "GET"
    });
}

const ListingService = { get, get_most_recent };

export default ListingService;