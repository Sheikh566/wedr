<?php
$city = "Karachi";
$key = "41759ebdb94742f088f113131220807";

if ($_GET['city']) {
  $city = $_GET['city'];
  $url = "http://api.weatherapi.com/v1/forecast.json?key=$key&q=$city&days=2&aqi=no&alerts=no";

  // '@' stops echo of warning (if any)
  $result = @file_get_contents($url);
  if ($result === FALSE) {
    var_dump(http_response_code(404));
  } else {
    $data = json_decode($result);

    $currHour = getHourFromTime($data->current->last_updated);
    $forecastDaysArray = $data->forecast->forecastday;

    $forecastHours = [];
    $i = $currHour + 3;
    foreach ($forecastDaysArray as $day) {
      foreach ($day->hour as $hour) {
        if ($i >= 24) {
          $i = $i % 24;
        }
        //consoleLog("i: ".$i);
        // consoleLog("getHourFromTime: ".getHourFromTime($hour->time));
        if (getHourFromTime($hour->time) == $i) {
          // example: 3 => '03:00', 13 => '13:00'
          $key = sprintf('%02d', $i) . ":00";
          $forecastHours[$key] = [$hour->temp_c, $hour->chance_of_rain];
          $i += 3;
        }
      }
    }
    $data->next_15_hours = $forecastHours;
    //consoleLog($data);
    echo json_encode($data);
  }
}

// example: '2022-07-09 02:00' => 2
function getHourFromTime($timeStr)
{
  $currTime = explode(" ", $timeStr)[1];
  return (int)explode(":", $currTime)[0];
}

function consoleLog($msg)
{
  $msg = json_encode($msg);
  echo "<script>console.log($msg)</script>";
}
