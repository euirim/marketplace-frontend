import request from "shared/lib/request";

function get_all() {
    return request({
        url: `/api/categories/?format=json`,
        method: "GET" 
    });
}

const CategoryService = { 
    get_all 
};

export default CategoryService;