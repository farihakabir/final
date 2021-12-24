var REMOTEURL = "https://www.themealdb.com/api/json/v1/1/";
$(function () {
    init();

    $('#meal-content').on('click', '.category-id-btn', function () {
        getMeals($(this).attr('id'));
    });

    $('#search-meal-btn').click(function () {
        searchMeals($('#search-string').val());
    });

    $('#reset-meal-btn').click(function () {
        init();
    });

    function init () {
        $.ajax({
            url: REMOTEURL + "categories.php",
            dataType: "json",
            success: function (response) {
                gernrateCategoryCard(response["categories"]);
            }
        });
    };

    function getMeals (id) {
        $.ajax({
            url: REMOTEURL + "filter.php?c=" + id,
            dataType: "json",
            success: function (response) {
                generateMealCard(response["meals"]);
            }
        });
    };

    function searchMeals (str) {
        $.ajax({
            url: REMOTEURL + "search.php?s=" + str,
            dataType: "json",
            success: function (response) {
                generateMealCard(response["meals"]);
            }
        });
    };

    function gernrateCategoryCard (response) {
        $('#meal-content').empty();
        $.each(response, function (i, d) {
            var template = `<div class="col-md-4 mt-1">
            <div class="card">
                <img class="card-img-top" src="${d['strCategoryThumb']}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${d['strCategory']}</h5>
                  <p class="card-text">${d['strCategoryDescription']}</p>
                  <div href="#" id='${ d['strCategory'] }' class="btn btn-primary category-id-btn">Details</div>
                </div>
              </div>
        </div>`;
            $('#meal-content').append(template);
        })
    };

    function generateMealCard (response) {
        $('#meal-content').empty();
        $.each(response, function (i, d) {
            var template = `<div class="col-md-4 mt-1">
            <div class="card">
                <img class="card-img-top" src="${d['strMealThumb']}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${d['strMeal']}</h5>
                </div>
              </div>
        </div>`;
            $('#meal-content').append(template);
        })
    };
});