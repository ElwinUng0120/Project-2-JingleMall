const APIKEY = "15ad446b41msh4622def0c5c90dbp163500jsnb9c008697134";

function builtURL(type){
    var url;
    switch(type){
        case "amazon":
            const sortBy = "relevanceblender" || "price-asc-rank" || "price-desc-rank" || "review-rank" || "date-desc-rank"
            const keyword = ;
            return url = `sortBy=${sortBy}&domainCode=ca&keyword=${keyword}&page=1`;
        case "walmart":
            const sortBy = "best_seller" || "price_low" || "price_high" || "rating_high" || "new"
            const keyword = ;
            return url = `sortBy=${sortBy}&page=2&keyword=${keyword}&type=text`;
        default:
            break;
    }
}

//Amazon.ca
function amazonRequest(){
    const url = builtURL("amazon");
    $.ajax({
        url: "https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-search-by-keyword-asin?" + url,
        method: "GET",
        headers: {
            "x-rapidapi-host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com",
            "x-rapidapi-key": APIKEY
        }
    }).done(function(response) {
        console.log(response);
        getAmazonDetails(response.asin);
    }).catch(function(err){
        console.log(err);
    });
}

function getAmazonDetails(ASIN){
    const url = "https://www.amazon.ca/dp/" + ASIN;
    $.ajax({
        url: "https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-lookup-product?url=" + url,
        method: "GET",
        headers: {
            "x-rapidapi-host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com",
            "x-rapidapi-key": APIKEY
        }
    }).done(function(response) {
        console.log(response);
    }).catch(function(err){
        console.log(err);
    });
}

//Walmart.com
function walmartRequest(){
    const url = builtURL("walmart");
    $.ajax({
        url: "https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?" + url,
        method: "GET",
        headers: {
            "x-rapidapi-host": "axesso-walmart-data-service.p.rapidapi.com",
            "x-rapidapi-key": APIKEY
        }
    }).then(function(response){
        console.log(response);
        getWalmartDetails(response.foundProducts[1]);
    // .catch for printing error detials
    }).catch(function(err){
        console.log(err);
    });
}

function getWalmartDetails(URL){
    // product URL, can be used as "Link to Buy"
    url = "https://www.walmart.com" + URL;
    $.ajax({
        url: "https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-lookup-product?url=" + url,
        method: "GET",
        headers: {
            "x-rapidapi-host": "axesso-walmart-data-service.p.rapidapi.com",
            "x-rapidapi-key": APIKEY
        }
    }).then(function (response) {
        console.log(response);
    // .catch for printing error detials
    }).catch(function(err){
        console.log(err);
    });
}

$(document).ready(function(){

});