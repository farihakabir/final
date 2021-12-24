var REMOTEURL = "https://api.openweathermap.org/data/2.5/";
var REMOTEURLGEO = "https://api.openweathermap.org/geo/1.0/direct";
var ICONURL = "https://openweathermap.org/img/wn/";
$(function () {
    init('Dhaka');
    getGEO("Dhaka");
    $('#search-string').val("");

    $('#search-weather-btn').click(function () {
        var val = $('#search-string').val();
        if(val==""){
            alert("Please type proper name");
            return false;
        }
        init($('#search-string').val());
        getGEO($('#search-string').val());
    });

    function init(country) {
        $.ajax({
            url: REMOTEURL + "weather?appid=1e693b3f714b04deb25c03e4d67b391f" + "&q="+country,
            dataType: "json",
            success: function (response) {
                generateCurrentWeather(response);
            }
        });
    };

    function getGEO(country){
        $.ajax({
            url: REMOTEURLGEO + "?q="+country+"&appid=1e693b3f714b04deb25c03e4d67b391f",
            dataType: "json",
            success: function (response) {
                var lat = response[0]['lat'];
                var lon = response[0]['lon'];
                GenerateDailyForecast(lat, lon);
            }
        });
    }

    function GenerateDailyForecast(lat, lon) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+lon+"&exclude=current,minutely,hourly,alerts&appid=1e693b3f714b04deb25c03e4d67b391f",
            dataType: "json",
            success: function (response) {
                // console.log(response);
                gernrateForecastCard(response['daily']);
            }
        });
    };

    function generateCurrentWeather(response) {
        $('#weather-content').empty();
        var dt = new Date(response.dt * 1000);
        var country = response.name;
        var condition = response['weather'][0]['description'].toUpperCase();
        var icon = 'http://openweathermap.org/img/wn/' + response['weather'][0]['icon'] + '.png';
        var temperature = parseFloat(response['main']['temp'] - 273.15).toFixed(2);
        var feelsLike = parseFloat(response['main']['feels_like'] - 273.15).toFixed(2);
        var template = `<h5 id="time">${dt}</h5>
        <h3>${country}</h3>
        <p><span><img src=${icon} /></span> ${temperature}&#8451</p>
        <p>Feels like: ${feelsLike}&#8451</p>`;
        $('#weather-content').append(template);
    }

    function gernrateForecastCard(response) {
        $('.forecast-content').empty();
        $.each(response, function (i, d) {
            console.log(d);
            var img = 'https://openweathermap.org/img/wn/' + d['weather'][0]['icon'] + '.png';
            var dt = new Date(d['dt'] * 1000);
            var maxTemperature = parseFloat(d['temp']['max'] - 273.15).toFixed(2);
            var minTemperature = parseFloat(d['temp']['min'] - 273.15).toFixed(2);
            var template = `<div class="col-md-4 mt-1">
            <div class="card">
                <img class="card-img-top" style="height:auto;width:auto;" src="${img}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${dt}</h5>
                  <p class="card-text">Max Temperature: ${maxTemperature}&#8451</p>
                  <p class="card-text">Min Temperature: ${minTemperature}&#8451</p>
                </div>
              </div>
        </div>`;
            $('.forecast-content').append(template);
        })
    };

    function generateMealCard(response) {
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