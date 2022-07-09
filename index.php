<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="./icons/favicon.ico" type="image/x-icon">
  <title>Wedr | Weather App</title>

  <link rel="stylesheet" href="style.css">

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
  <div class="container">
    <div class="navbar">
      <img src="./icons/default.svg" alt="logo" height="50px">
      <h4>github: <a href="https://github.com/Sheikh566/wedr">sheikh566</a></h4>
    </div>
    <div class="search-box">
      <input 
        type="text" 
        name="search" 
        id="search" 
        placeholder="Type the city name" 
        autocomplete="off" 
      >
      <button class="btn btn-primary search-btn">Search</button>
    </div>
    <div class="loader"></div>
    <div class="card">
      <h2 id="city">Lorem</h2>
      <h2 id="country">Ipsum</h2>
      <div id="condition-row">
        <span id="condition">Cloudy</span>
        <div class="details">
          <span id="wind-speed">Wind 10km/h</span>
          <span class="dot">•</span>
          <span id="precip">Precip 10%</span>
        </div>
      </div>
      <div id="temperature-box">
        <h1 id="temperature">23°</h1>
        <h3 id="feels-like">Feels Like 23°</h3>
      </div>
      <div id="icon-box">
        <img src="" alt="icon" id="icon">
      </div>
      <table>
        <tr id="forecast-times">
          <?php echo str_repeat("<td class='time' ></td>", 5); ?>
        </tr>
        <tr id="forecast-temps">
          <?php echo str_repeat("<td class='temp' ></td>", 5); ?>
        </tr>
        <tr id="forecast-rain-chance">
          <?php echo str_repeat("<td class='rain-chance'></td>", 5); ?>
        </tr>
      </table>
    </div>
  </div>

</body>

<script src="script.js"></script>

</html>