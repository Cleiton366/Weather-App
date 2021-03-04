var cities = [];

//open moreInfo
$(document).on('click', '.divCity', function () {
    var contentId = $(this).attr("id");
    document.getElementById("moreInfo").style.marginTop = "-990px";
    document.getElementById("cityList").style.marginTop = "500px";
    $("#moreInfo").show();
    $("#divLogo").hide();
    $("#divSearch").hide();
    renderInfo(contentId);
})
//close moreInfo
$(document).on("click", ".backIcon", function () {
    document.getElementById("cityList").style.marginTop = "-150px";
    $("#moreInfo").hide();
    $("#divLogo").show();
    $("#divSearch").show();
    renderCities();
})
//delete city
$(document).on("click", ".fa-times", function () {
    var contentId = $(this).attr("id");
    cities.splice(contentId, 1);
    renderCities();
    console.log("City " + contentId + " removed");
})
$(document).on("keypress", function (e) {
    if (e.which == 13) {
        addCity();
        document.getElementById("searchCity").value = "";
    }
})

function addCity() {
    if (cities.length == 5) {
        alert("You can only add 5 Cities for now.");
        document.getElementById("searchCity").value = "";
        return;
    }
    if (document.getElementById("searchCity").value == "") {
        alert("No one has ever named a city with no name, you must type a valid city name >:[");
    } else {
        var cityName = document.getElementById("searchCity").value;
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey;

        $.getJSON(url, function (data) {
            cities.push(data);
            console.log("city added to the grid: "+cityName);
            renderCities();
        })
        document.getElementById("searchCity").value = "";
    }
}

function renderCities() {
    console.log("function called: renderCities");
    var render = "";
    var iconUrl = "";

    for (var i = 0; i < cities.length; i++) {
        console.log("indice:"+i);       
        iconUrl = "http://openweathermap.org/img/w/"+cities[i].weather[0].icon+".png";
        render = render +
            "<div id='" + i + "'class='divCity'>" +
            "<img class='icon' src='"+iconUrl+"'>"+
            "<h3 id='cityName'>" + cities[i].name + "</h3>" +
            "<h3 id='cityTemperature'>" + cities[i].main.temp + " °C" + "</h3>" +
            "</div>";
    }
    document.getElementById("cityList").innerHTML = render;
}

//render moreInfo Div

function renderInfo(id) {
    console.log("function called: renderInfo");
    var iconUrl = "http://openweathermap.org/img/w/"+cities[id].weather[0].icon+".png";
    var render =
        "<div id='moreInfo'>" +
        "<img class='backIcon' src='../weather-app/assets/icons/arrow-91-24.png'>" +
        "<img class='moreInfoIcon' src='"+iconUrl+"'>" +
        "<h3 class='cityName'>" + cities[id].name + "</h3>" +
        "<h4 class='cityTemp'>Current: " + cities[id].main.temp + " °C</h4>" +
        "<h4 class='cityMin'>Min: " + cities[id].main.temp_min + " °C</h4>" +
        "<h4 class='cityMax'>Max: " + cities[id].main.temp_max + " °C</h4>" +       
        "<h4 class='cityFeelsLike'>Feels like: " + cities[id].main.feels_like+ " °C</h4>" +
        "<h4 class='cityHumidity'>Humidity: "+cities[id].main.humidity+"% </h4>"+
        "<h4 class='cityDescription'>"+cities[id].weather[0].description+"</h4>"+
        "</div>";

    document.getElementById("moreInfo").innerHTML = render;
    changeBackground(id);
}

//background change function

function changeBackground(id){
    console.log("function called: changeBackground");
    var temp = cities[id].weather[0].description;
    if(temp === "snow"){
        document.body.style.backgroundImage = "url('../weather-app/assets/backgrounds/street-1209401_1920.jpg')";
    }else if(temp === "clear sky" || temp === "few clouds" || temp === "scattered clouds" || temp === "broken clouds"){
        document.body.style.backgroundImage = "url('../weather-app/assets/backgrounds/clouds-2329680_1920.jpg')";
    }else if(temp === "overcast clouds"){
        document.body.style.backgroundImage = "url('../weather-app/assets/backgrounds/storm-426787_1920.jpg')";
    }else if (temp === "shower rain" || temp === "rain"|| temp === "light rain" || temp === "moderate rain"){
        document.body.style.backgroundImage = "url('../weather-app/assets/backgrounds/rain-4806609_1920.jpg')";
    }else if(temp === "mist" || temp == "haze"){
        document.body.style.backgroundImage = "url('../weather-app/assets/backgrounds/conifers-1836582_1920.jpg')";
    }else if(temp === "thunderstorm"|| temp == "heavy intensity rain"){
        document.body.style.backgroundImage = "url('../weather-app/assets/backgrounds/lightning-1158027_1920.jpg')";
    }
}