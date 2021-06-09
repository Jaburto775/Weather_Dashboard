var key = "509442dd782b4eae6dcca9e4317199c9";
var cList =$("#city-list");
var cities = [];

function getDay(date){
    var date = new Date();
    console.log(date);
    var month = date.getMonth()+1;
    var day = date.getDate();
    
    var showDate = date.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    return showDate;
}

init();

function init(){
    var storedCities = JSON.parse(localStorage.getItem("cities"));
        if (storedCities !== null) {
         cities = storedCities;
          }
          renderCities();
}

function storeCities(){
   localStorage.setItem("cities", JSON.stringify(cities));
   console.log(localStorage);
 }

 function renderCities() {
    cList.empty();
        for (var i = 0; i < cities.length; i++) {
        var city = cities[i];  
        var li = $("<li>").text(city);
        li.attr("id","listC");
        li.attr("data-city", city);
        li.attr("class", "list-group-item");
        console.log(li);
        cList.prepend(li);
        }
   
        if (!city){
            return
        } 
        else{
        getResponse(city);        
    };
}   

$("#add-city").on("click", function(event){
    event.preventDefault();
  var city = $("#city-input").val().trim();
    if (city === "") {
      return;
  }
  cities.push(city);
storeCities();
renderCities();
});

function getResponse(cityName){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key; 

    $("todWeather").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        
      cityTitle = $("<h3>").text(response.name + " "+ getDay());
      $("#todWeather").append(cityTitle);
      var TempetureToNum = parseInt((response.main.temp)* 9/5 - 459);
      var cityTemperature = $("<p>").text("Tempeture: "+ TempetureToNum + " °F");
      $("#todWeather").append(cityTemperature);
      var cityHumidity = $("<p>").text("Humidity: "+ response.main.humidity + " %");
      $("#todWeather").append(cityHumidity);
      var cityWindSpeed = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
      $("todWeather").append(cityWindSpeed);
      var CoordLon = response.coord.lon;
      var CoordLat = response.coord.lat;
    
    
        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid="+ key+ "&lat=" + CoordLat +"&lon=" + CoordLon;
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(responseuv) {
            var cityUV = $("<span>").text(responseuv.value);
            var cityUVp = $("<p>").text("UV Index: ");
            cityUVp.append(cityUV);
            $("#todWeather").append(cityUVp);
            console.log(typeof responseuv.value);
        });
    
        
    });
    
  }


  $(document).on("click", "#listC", function() {
    var thisCity = $(this).attr("data-city");
    getResponse(thisCity);
  });
