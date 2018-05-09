import request from "shared/lib/request";

var default_page_size = 25;

function get_most_recent(num=default_page_size, page=1) {
    return request({
        url: `/api/promotions/?format=json`,
        method: "GET",
        params: {
            page_size: num,
            page: page
        }
    });
}

const PromotionService = { 
    get_most_recent
};

export default PromotionService;