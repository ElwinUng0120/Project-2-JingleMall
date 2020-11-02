var APIKEY = "15ad446b41msh4622def0c5c90dbp163500jsnb9c008697134"; // need to be changed 

const amazonOpt = ["Most Relevence", "Price: Low to High", "Price: High to Low", "Customer Reviews", "Date: Latest to Oldest"];
const walmartOpt = ["Best Seller", "Price: Low to High", "Price: High to Low", "Ratings", "Newest"];

var id;

function builtURL(type){
    var sortBy;
    var keyword;
    switch(type){
        case "amazon":
            switch ($('.form-control').val()){
                case "Price: Low to High": sortBY = "price-asc-rank"; break;
                case "Price: High to Low": sortBY = "price-desc-rank"; break;
                case "Customer Reviews": sortBY = "review-rank"; break;
                case "Date: Latest to Oldest": sortBY = "date-desc-rank"; break;
                default: sortBY = "relevanceblender"; break;
            };
            keyword = $(".form-control").val().trim();
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
            keyword = $(".form-control").val().trim();
            walmartRequest(`sortBy=${sortBy}&page=1&keyword=${keyword}&type=text`);
            break;
        default:
            break;
    }
}

// Amazon.ca
// linked to getAmazonDetails()
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
        $('.productList').empty(); // empty everything that was in list
        id = 0;
        response.foundProducts.forEach( i => getAmazonDetails(i) );
    }).catch(function(err){
        console.log(err);
    });
}

// linked to buildList()
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
        buildList(response, url);
    }).catch(function(err){
        console.log(err);
    });
}

// Walmart.com
// linked to getWalmarDetails()
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
        $('.productList').empty(); // empty everything that was in list
        id = 0;
        response.foundProducts.forEach( i => getWalmartDetails(i) ); // for each product in the response, get its details
    // .catch for printing error detials
    }).catch(function(err){
        console.log(err);
    });
}

// linked to buildList()
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
        buildList(response, url);
    // .catch for printing error detials
    }).catch(function(err){
        console.log(err);
    });
}

// takes input from getWalmartDetails()/getAmazonDetails()
function buildList(data, prodURL){
    id++;
    switch($("#storeList").val()){
        case "amazon":
            $('.productList').append(`
                <li class="list-group-item">
                    <h3 id='${id}'>
                        <span>${data.productTitle}</span>
                        <a href="${prodURL}" target="blank" style="font-size: 20px">Link to Buy</a>
                        <span style="float: right">$${data.price} <button type="button" class="badge badge-primary addBtn"><i class="fas fa-plus"></i></button></span>
                    </h3>
                </li>
            `);
            break;
        case "walmart":
            $('.productList').append(`
                <li class="list-group-item">
                    <h3 id='${id}'>
                        <span>${data.productTitle}</span>
                        <a href="${prodURL}" target="blank" style="font-size: 20px">Link to Buy</a>
                        <span style="float: right">$${data.price} <button type="button" class="badge badge-primary addBtn" data-id='${id}'><i class="fas fa-plus"></i></button></span>
                    </h3>
                </li>
            `)
            break;
    }
}

$(document).ready(function(){

    // checking if user pressed enter while focused in input
    $('.form-control').on('keydown', function(event){
        if(event.keyCode != 13) return; // if key pressed is not enter, prevent sending API calls
        if($('.form-control').val().trim() === "") return; // if user didn't enter anything, prevent sending API calls
        builtURL($('.form-control').val().trim());
    })

    // checking if user has pressed the serach button
    $(".searchBtn").on("click", function(event){
        if($('.form-control').val().trim() === "") return; // if user didn't enter anything, prevent sending API calls
        builtURL($('.form-control').val().trim());
    });

    // adding new products to the wishlist
    $(document).on("click", ".addBtn", function(event){
        const children = $(`#${$(this).data('id')}`).children(); // getting all the info
        $.ajax("/api/items", {
            type: "POST",
            data: {
                name: children[0].innerText,
                link: children[1].getAttribute("href")
            }
        }).then(function(response){
            if(response.changedRows > 0) console.log('[200]: Successful');
            else {
                console.log('[400]: Check data ');
                return;
            }
        }).catch(function(err){
            console.log(err);
        });
    });

    // check the selected value when the user selected something in the dropdown list
    $('#storeList').on('change', function(){
        $('#sortList').removeAttr("disabled"); // enable the sorting option dropdown list 
        $('#sortList').empty(); // empty every options that were in the list
        // based on which store the user has selected, print corresponding sorting to the sorting option dropdown list
        switch ($('#storeList').val()){
            case 'amazon':
                amazonOpt.forEach(function(i){
                    $('#sortList').append(`<option>${i}</option>`);
                });
                break;
            case 'walmart':
                walmartOpt.forEach(function(i){
                    $('#sortList').append(`<option>${i}</option>`);
                });
                break;
            default:
                // user selected the first option in the store dropdown list, sorting option dropdown list becomes disabled
                $('#sortList').empty(); // empty every options that were in the list
                $('#sortList').attr("disabled", true); // disabling the sorting option dropdown list
                break;
            }
    });
});