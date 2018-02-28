import request from "shared/lib/request";

function get_all() {
    return request({
        url: `/categories/?format=json`,
        method: "GET" 
    });
}

const CategoryService = { 
    get_all 
};

export default CategoryService;