function buildHTML(data){
    $('.wishList, .boughtList, .wrappedList').empty();
    data.forEach(function(i){
        if(i.stage == 1) {
            $(".wishList").append(`
                <li id='${i.id}' data-stage='${i.stage}'>${i.name}
                    <button type="button" class="badge badge-primary deleteBtn" data-id='${i.id}' style="float: right; background-color: #A9DF9C; color: #FFFFE4;"><i class="fas fa-minus"></i></button>
                    <button type="button" class="badge badge-primary nextBtn" data-id='${i.id}' style="float: right; background-color: #A9DF9C; color: #FFFFE4;"><i class="fas fa-arrow-down"></i></button>
                </li>
            `);
        } else if (i.stage == 2) {
            $(".boughtList").append(`
                <li id='${i.id}' data-stage='${i.stage}'>${i.name}
                    <button type="button" class="badge badge-primary deleteBtn" data-id='${i.id}' style="float: right; background-color: #A9DF9C; color: #FFFFE4;"><i class="fas fa-minus"></i></button>
                    <button type="button" class="badge badge-primary nextBtn" data-id='${i.id}' style="float: right; background-color: #A9DF9C; color: #FFFFE4;"><i class="fas fa-arrow-down"></i></button>
                    <button type="button" class="badge badge-primary previousBtn" data-id='${i.id}' style="float: right; background-color: #A9DF9C; color: #FFFFE4;"><i class="fas fa-arrow-up"></i></button>
                </li>
            `);
        } else {
            $(".wrappedList").append(`
                <li id='${i.id}' data-stage='${i.stage}'>${i.name}
                    <button type="button" class="badge badge-primary deleteBtn" data-id='${i.id}' style="float: right; background-color: #A9DF9C; color: #FFFFE4;"><i class="fas fa-minus"></i></button>
                    <button type="button" class="badge badge-primary previousBtn" data-id='${i.id}' style="float: right; background-color: #A9DF9C; color: #FFFFE4;"><i class="fas fa-arrow-up"></i></button>
                </li>
            `);
        }
    });
}

function getRequest(){
    // getting all data from the database when the page is loaded/reloaded
    $.ajax("/api/items", {
        type: "GET"
    }).then(function(response){
        buildHTML(response);
    }).catch(function(err){
        console.log(err);
    });
}

$(document).ready(function(){
    getRequest();
    $(document).on('click', '.nextBtn', function(event){
        const id = $(this).data('id');
        const stage = $(`#${id}`).data("stage") + 1;
        $.ajax("/api/items/" + id, {
            type: "PUT",
            data: {
                id: id,
                stage: stage
            }
        }).then(function(response){
            if(response.changedRows > 0) console.log('[200]: Successful');
            else {
                console.log('[400]: Check id and/or stage');
                return;
            }
            getRequest();
        }).catch(function(err){
            console.log(err);
        });
    });

    $(document).on('click', '.previousBtn', function(event){
        const id = $(this).data('id');
        const stage = $(`#${id}`).data("stage") - 1;
        $.ajax("/api/items/" + id, {
            type: "PUT",
            data: {
                id: id,
                stage: stage
            }
        }).then(function(response){
            if(response.changedRows > 0) console.log('[200]: Successful');
            else {
                console.log('[400]: Check id and/or stage');
                return;
            }
            getRequest();
        }).catch(function(err){
            console.log(err);
        });
    });

    $(document).on('click', '.deleteBtn', function(event){
        const id = $(this).data('id');
        $.ajax("/api/items/" + id, {
            type: "DELETE"
        }).then(function(response){
            if(response.affectedRows > 0) console.log('[200]: Successful');
            else {
                console.log('[400]: Check id');
                return;
            }
            getRequest();
        }).catch(function(err){
            console.log(err);
        });
    })
});