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

function init(){
    var storedCities = JSON.parse(localStorage.getItem("cities"));
        if (storedCities !== null) {
         cities = storedCities;
          }
}

function storeCities(){
   localStorage.setItem("cities", JSON.stringify(cities));
   console.log(localStorage);
 }

 