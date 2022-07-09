// const myKey = "41759ebdb94742f088f113131220807";
// const baseURL = "http://api.weatherapi.com/v1/forecast.json?key="+myKey;

function getIconPath(urlString) {
  return urlString.replace('//cdn.weatherapi.com/weather/64x64/', 'icons/');
}

function animateAndFetch() { 
  $(".card").css('filter', 'blur(6px)');
  $(".loader").css('display', 'block');

  const city = $("#search").val();
  fetchData(city);
}

function fetchData(query) {
  $.ajax({
    //url: `${baseURL}&q=${query}&days=2&aqi=no&alerts=no`,
    url: `request.php?city=${query}`,
    success: (res) => {

      $(".card").css('filter', 'blur(0px)');
      $(".loader").css('display', 'none');

      res = JSON.parse(res);
      //console.log(res);
      $("#city").text(res.location.name);
      $("#country").text(res.location.country);
      $("#temperature").text(
        Math.round(res.current.temp_c) + "°"
      );
      $("#feels-like").text(
        "Feels like " + Math.round(res.current.feelslike_c) + "°"
      );
      $("#condition").text(res.current.condition.text);
      $("#icon").attr("src", getIconPath(res.current.condition.icon));
      $("#wind-speed").text("Wind "+res.current.wind_kph+" km/h");
      $("#precip").text("Precip " + res.forecast.forecastday[0].day.daily_chance_of_rain +"%");

      // Forecast Row
      let timeElems = $('#forecast-times').children();
      let tempElems = $('#forecast-temps').children();
      let rainChanceElems = $('#forecast-rain-chance').children();
      const next_15_hours = res.next_15_hours;
      const next_15_hours_keys = Object.keys(next_15_hours);

      for (let i = 0; i < 5; i++) {
        $(timeElems[i]).text(next_15_hours_keys[i]);
        $(tempElems[i]).text(
          next_15_hours[next_15_hours_keys[i]][0]+"°"
        );
        $(rainChanceElems[i]).text(next_15_hours[next_15_hours_keys[i]][1]+"%");
      }
    },
    error: (err) => {
      alert("Error: City Not Found")
    }
  })
}

$(document).ready(function() {
  const searchBtn = $(".search-btn");
  searchBtn.attr('disabled', $(this).val().trim() == '');
  // Disables search button if text field is empty'ish
  $("#search").on('input', function () {
    searchBtn.attr('disabled', $(this).val().trim() == '');
  });

  searchBtn.click(function() {
    animateAndFetch();
  });
});

// Fetch on "ENTER" keypress
$(document).on('keypress',function(e) {
  if(e.which == 13 && !$(".search-btn").attr('disabled')) {
      animateAndFetch();
  }
});

