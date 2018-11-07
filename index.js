$(document).ready(function(){
    const  appId = "appid=53415d9cef9a459f30b29800bbc87ec5";
    const units = "metric";
    var city = " ";
    var cityArr = ["Miami", "London", "Ankara"];
    var weatherIconName = "";
    
    // Default citys
    cityArr.forEach(element => {
        getWeatherAJAX(element);
    });

    //  main click event to get weather
    $("#btn-search").on('click', function(event) {
        event.preventDefault();
        city = $("input").val();
        // cityArr.push method not necessarily
        cityArr.push(city);
        if (!city) {
            // If search area is empty.
            $('.popup>p').text('Please add city');
            $('.cover').fadeIn('slow');
            $('.container').fadeIn('slow');
            return;
        } else {
            getWeatherAJAX(city);
        }

    });

    // Event delegation solution for this project
    $(document).on('click', 'img', function () {
        $(this).parent('.child').remove();
    });

    // Search again button options
    $('.options>a').click(function() {
        $('.cover').fadeOut('slow');
        $('.container').fadeOut('slow');
    })

    //takes the weather data from ajax function and return a weather icon class from erikflowers.github.io/weather-icons/
    function setWeatherIcon(weath){
        switch(weath) {
            case "Clear sky":
                weatherIconName = "wi wi-day-sunny";
                break;
            case "Broken clouds":
            case "Few clouds":
            case "Scattered clouds":
                weatherIconName = "wi wi-day-cloudy";
                break;
            case "Light rain":
                weatherIconName = "wi wi-showers";
                break;
            case "Overcast clouds":
                weatherIconName = "wi wi-cloudy";
                break;
            case "Mist":
            case "Fog":
                weatherIconName = "wi wi-day-fog";
                break;
            case "Snow":
                weatherIconName = "wi wi-snow";
                break;
            default:
                weatherIconName = "wi wi-cloud"; 
        }//switchend
        return weatherIconName; 
    }

    function getWeatherAJAX(city){
        $.ajax({
            type: "GET",
            url : "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&" + appId,
            datatype: "jsonp",
            crossDomain: true,
            error: function(error) {
                $('.cover').fadeIn('slow');
                $('.container').fadeIn('slow');
            },
            success: function(response) {
                let weather = response.weather[0].description;
                weather = (weather[0].toUpperCase() + weather.slice(1)); 
                let weatherIco = setWeatherIcon(weather);
                let tempToInt = Math.round(response.main.temp);
                $(".parent").append(` 
                            <div class="child">
                                <img src="close.svg" alt="">
                                <div class="content">
                                    <h2>${response.name} ,${response.sys.country}</h2>
                                    <br/>
                                    <br/>
                                    <h3>${weather}</h3>
                                    <h3>${tempToInt} &#8451;</h3>
                                    <i class="${weatherIco}"></i>
                                </div>
                            </div>`);
            }              
        });
    }
});