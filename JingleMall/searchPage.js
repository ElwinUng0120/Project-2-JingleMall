var APIKEY;
if(process.env.APIKEY) APIKEY = process.env.APIKEY;
else APIKEY = "15ad446b41msh4622def0c5c90dbp163500jsnb9c008697134";

const amazonOpt = ["Most Relevence", "Price: Low to High", "Price: High to Low", "Customer Reviews", "Date: Latest to Oldest"];
const walmartOpt = ["Best Seller", "Price: Low to High", "Price: High to Low", "Ratings", "Newest"];

function builtURL(type){
    var sortBy;
    switch(type){
        case "amazon":
            switch ($('.').val()){
                case "Price: Low to High": sortBY = "price-asc-rank"; break;
                case "Price: High to Low": sortBY = "price-desc-rank"; break;
                case "Customer Reviews": sortBY = "review-rank"; break;
                case "Date: Latest to Oldest": sortBY = "date-desc-rank"; break;
                default: sortBY = "relevanceblender"; break;
            };
            const keyword = $(".input").val().trim();
            amazonRequest(`sortBy=${sortBy}&domainCode=ca&keyword=${keyword}&page=1`);
            break;
        case "walmart":
            switch ($('.').val()){
                case "Price: Low to High": sortBY = "price_low"; break;
                case "Price: High to Low": sortBY = "price_high"; break;
                case "Ratings": sortBY = "rating_high"; break;
                case "Newest": sortBY = "new"; break;
                default: sortBY = "best_seller"; break;
            };
            const keyword = $(".input").val().trim();
            walmartRequest(`sortBy=${sortBy}&page=1&keyword=${keyword}&type=text`);
            break;
        default:
            break;
    }
}

//Amazon.ca
function amazonRequest(url){
    $.ajax({
        url: "https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-search-by-keyword-asin?" + url,
        method: "GET",
        headers: {
            "x-rapidapi-host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com",
            "x-rapidapi-key": APIKEY
        }
    }).done(function(response) {
        console.log(response);
        response.foundProducts.forEach( i => getAmazonDetails(i) );
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
        $('.').empty();
        buildList(response, url);
    }).catch(function(err){
        console.log(err);
    });
}

//Walmart.com
function walmartRequest(url){
    $.ajax({
        url: "https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?" + url,
        method: "GET",
        headers: {
            "x-rapidapi-host": "axesso-walmart-data-service.p.rapidapi.com",
            "x-rapidapi-key": APIKEY
        }
    }).then(function(response){
        console.log(response);
        response.foundProducts.forEach( i => getWalmartDetails(i) );
    // .catch for printing error detials
    }).catch(function(err){
        console.log(err);
    });
}

function getWalmartDetails(URL){
    // product URL, can be used as "Link to Buy"
    const url = "https://www.walmart.com" + URL;
    $.ajax({
        url: "https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-lookup-product?url=" + url,
        method: "GET",
        headers: {
            "x-rapidapi-host": "axesso-walmart-data-service.p.rapidapi.com",
            "x-rapidapi-key": APIKEY
        }
    }).then(function (response) {
        console.log(response);
        $('.').empty();
        buildList(respsonse, url);
    // .catch for printing error detials
    }).catch(function(err){
        console.log(err);
    });
}

function buildList(data, prodURL){
    switch($('.').val()){
        case "amazon":
            $('.').append(`
                <li> ${data.productTitle} ${data.price} ${data.imageUrlList[0]}</li>
            `);
            break;
        case "walmart":
            $('.').append(`
                <li> ${data.productTitle} ${data.price} ${data.imageUrlList[0]}</li>
            `)
            break;
    }
}

$(document).ready(function(){
    $(".searchBtn").on("click", function(){
        builtURL($('.').val());
    });

    // adding new products to the wishlist
    $(".").on("click", function(event){
        $.ajax("/api/...", {
            type: "POST",
            data: "..."
        }).then(function(response){
            console.log(response);
        }).catch(function(err){
            console.log(err);
        })
    });

    $(".choice").on("change", function(event){
        var choice = $(".").val();
        $('.').empty();
        if (choice == "amazon"){
            amazonOpt.forEach( i => function(i){
                $('.').append(`
                    <option>${i}</option>
                `);
            });
        } else {
            walmartOpt.forEach( i => function(i){
                $('.').append(`
                    <option>${i}</option>
                `);
            });
        };
    })
});