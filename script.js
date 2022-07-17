const myKey = "41759ebdb94742f088f113131220807";
const baseURL = "http://api.weatherapi.com/v1/forecast.json?key="+myKey;

function getIconPath(urlString) {
  return urlString.replace('//cdn.weatherapi.com/weather/64x64/', 'icons/');
}

function animateAndFetch() { 
  $(".card").css('filter', 'blur(6px)');
  $(".loader").css('display', 'block');

  const city = $("#search").val();
  fetchAndUpdateUI(city);
}

// example: '2022-07-09 02:00' => 2
function getHourFromTime(timeStr) {
  const currTime = timeStr.split(" ")[1];
  return currTime.split(':')[0];
}

function generateForecast(data) {
  let currHour = getHourFromTime(data.current.last_updated);
  let forecastDaysArray = data.forecast.forecastday;

  let forecastHours = [];
  let i = currHour + 3;
  for (const day of forecastDaysArray) {
    for (const hour of day.hour) {
      if (i >= 24) {
        i = i % 24;
      }
      if (getHourFromTime(hour.time) == i) {
        // example: 3 => '03:00', 13 => '13:00'
        const key = ('0' + i).slice(-2) + ":00";
        forecastHours[key] = [hour.temp_c, hour.chance_of_rain];
        i += 3;
      }
    }
  }
  return forecastHours
}

function fetchAndUpdateUI(query) {
  $.ajax({
    url: `${baseURL}&q=${query}&days=2&aqi=no&alerts=no`,
    success: (res) => {

      $(".card").css('filter', 'blur(0px)');
      $(".loader").css('display', 'none');

      res.next_15_hours = generateForecast(res);

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
      const alertBox = $('#alert-box')
      alertBox.removeClass('off');
      setTimeout(() => {
        alertBox.addClass('off')
      }, 3000)
    }
  })
}

$(document).ready(function() {
  $('#alert-box').addClass('off');
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

// search on "ENTER" keypress
$(document).on('keypress',function(e) {
  if(e.which == 13 && !$(".search-btn").attr('disabled')) {
      animateAndFetch();
  }
});

