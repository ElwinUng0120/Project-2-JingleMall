function buildHTML(data){
    $('#wishList, #boughtList, #wrappedList').empty();
    data.map(i => i.stage == 1).forEach(function(i){
        $("#wishList").append(`
            <li id='${i.id}' data-stage='${i.stage}'>${i.name}</li>
        `);
    });
    data.map(i => i.stage == 2).forEach(function(i){
        $("#boughtList").append(`
            <li id='${i.id}' data-stage='${i.stage}'>${i.name}</li>
        `);
    });
    data.map(i => i.stage == 3).forEach(function(i){
        $("#wrappedList").append(`
            <li id='${i.id}' data-stage='${i.stage}'>${i.name}</li>
        `);
    });
}

function getRequest(){
    // getting all data from the database when the page is loaded/reloaded
    $.ajax("/api/...", {
        type: "GET"
    }).then(function(response){
        console.log("Recived response from GET request! \nBuilding HTML now...");
        response.forEach(i => buildHTML(i));
    }).catch(function(err){
        console.log(err);
    });
}

$(document).ready(function(){
    getRequest();
    $('.move').on('click', function(event){
        const id = event.target.parentElement.id;
        const stage = $(`#${id}`).data("stage");
        if(stage === 1) stage = 2;
        else if (stage === 2) stage = 3;
        var data = {
            id: id,
            stage: stage
        }
        $.ajax("/api/...", {
            type: "POST",
            data: data
        }).then(function(response){
            console.log(response);
            getRequest();
        }).catch(function(err){
            console.log(err);
        });
    });

    $('.delete').on('click', function(event){
        const id = event.parent.id;
        $.ajax("/api/.../" + id, {
            type: "DELETE"
        }).then(function(response){
            console.log(response);
            getRequest();
        }).catch(function(err){
            console.log(err);
        });
    })
});