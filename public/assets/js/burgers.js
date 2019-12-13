$(function () {
    $.ajax("/burgers", {
        type: "GET"
    }).then(function (data) {
        // console.log(JSON.stringify(data));
        var burgerElem = $("#burgers");
        var devouredBurgerElem = $("#devouredBurgers");

        //Get all the Burgers in the array
        // var burgersNames = data.burgers[i].burger_names;
        // var burgerID = data.burgers[i].ID;
        var burgers = data.burgers
        var len = burgers.length;

        for (var i = 0; i < len; i++) {
            var burgerStatus = data.burgers[i].devoured
            switch (burgerStatus) {
                case 0:
                    waitingBurgers(burgerStatus);
                    break;     
                case 1:
                    devouredBurger();
                    break;     
            }
        }

        function devouredBurger() {
            var new_elem = `<li> ${burgers[i].id}. ${burgers[i].burger_names} <button class='delete-burger' data-id=${burgers[i].id}>DELETE</button></li>`;
            devouredBurgerElem.append(new_elem);
        }

        function waitingBurgers(burgerStatus) {
            var new_elem = `<li> ${burgers[i].id}. ${burgers[i].burger_names} <button class='devour-burger' data-id=${burgers[i].id} data-newstate=${burgerStatus}>Devour</button></li>`;
            burgerElem.append(new_elem);
            // console.log(burgerStatus);
        }
    })

    $(document).on("click", ".devour-burger", function(event) {
        var id = $(this).data("id");
        // console.log($(this).attr("data-newstate"))
        var newState = $(this).attr("data-newstate")==false;
        // console.log(newState)
        var newBurgerState = {
            devoured: newState
        }
        // console.log(JSON.stringify(newBurgerState))
        // console.log(newBurgerState)
        // console.log($(this).data("id"))
        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: JSON.stringify(newBurgerState),
            dataType:'json',
            contentType: 'application/json'
        }).then(function() {
            console.log("burger devoured", id);
            location.reload();
        })
    })

    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        var addBurger = $("#addBurger").val().trim();
        var newBurger = {
            burger_names: addBurger,
            devoured: 0,
        }
        // console.log(newBurger);
        $.ajax("/burgers", {
            type: "POST",
            data: JSON.stringify(newBurger),
            dataType: 'json',
            contentType: "application/json"
        })
            .then(function () {
                location.reload();
            })
    });

    $(document).on("click", ".delete-burger", function(event) {

        var id = $(this).data("id");

        $.ajax("/burgers/" + id, {
            type: "DELETE"
        }).then(function() {
            console.log("Burger has been deleted");
            location.reload();
        });
    });
});