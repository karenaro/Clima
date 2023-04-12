const api = {
    key: '006557f9709e44a8a45f69e986988e05',
    url: `https://api.weatherbit.io/v2.0/current`
  }
  
  const card = document.getElementById('card')
  
  const city = document.getElementById('city');
  const date = document.getElementById('date');
  const tempImg = document.getElementById('temp-img');
  const temp = document.getElementById('temp');
  const weather = document.getElementById('weather');
  const range = document.getElementById('range');
  const body = document.getElementById('body');
  const icontemp = document.getElementById('icon-temp');
  const prec = document.getElementById('prec');
  const sol = document.getElementById('sol');
  const lat = document.getElementById('lat');
  const lon = document.getElementById('lon');

  
  function updateImages(data) {
    const temp = data.weather.code;
    const temperatura = data.temp;
    const f = new Date(data.ob_time)
    switch (true) {
        case temp <= 299: //tormenta electrica
          body.style.backgroundImage = "url(images/tormenta_electrica.jpg)"
          icontemp.innerHTML ='thunderstorm'
          break;
        case temp >= 300 && temp<= 499: //llovizna
          body.style.backgroundImage = "url(images/lovizna.jpg)"
          icontemp.innerHTML ='cloudy_snowing'
          break;
        case temp >= 500 && temp<= 599://lluvia
          body.style.backgroundImage = "url(images/lluvia_background.jpg)"
          icontemp.innerHTML ='rainy'
          break;
        case temp >= 600 && temp<= 699://nieve
          body.style.backgroundImage = "url(images/nieve.jpg)"
          icontemp.innerHTML ='snowing'
          break;
        case temp >= 700 && temp<= 799: //neblina
        body.style.backgroundImage = "url(images/neblina.jpg)"
        icontemp.innerHTML ='cloudy'
        break;
        case temp >= 800 && temp<= 899://cielo desplejado
        
        if (f.getHours() <= 18) {
          body.style.backgroundImage = "url(images/soleado.jpg)"
          icontemp.innerHTML = 'sunny'
        } else {
          body.style.backgroundImage = "url(images/cielo_despejado_noche.jpg)"
          icontemp.innerHTML = 'clear_night'
        }
          break;
        case temp = 900: //precipitaciones
          body.style.backgroundImage = "url(images/lluvia_background.jpg)"
          icontemp.innerHTML = 'umbrella'
          break;
    }
  }

  async function search(query) {
    try {
      const response = await fetch(`${api.url}?&city=${query},CO&key=${api.key}&lang=es`);
      const info = await response.json();
      const data = info.data[0]
      console.log(data)
      card.style.display = 'block';
      city.innerHTML = `${data.city_name}, ${data.country_code}`;
      const fechaHora = new Date(data.ob_time)
      date.innerHTML = fechaHora ;
      temp.innerHTML = `${data.temp}°c`;
      weather.innerHTML = data.weather.description;
      prec.innerHTML = data.precip;
      sol.innerHTML = data.solar_rad;
      lat.innerHTML = data.lat;
      lon.innerHTML = data.long;
      updateImages(data);
    } catch (err) {
      console.log(err);
      alert('Hubo un error');
    }
  }
  
  function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }
  
  function onSubmit(event) {
    event.preventDefault();
    search(searchbox.value);
  }

  function geolocalizacion(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position){
    console.log(position);
    const {geocoder} = await google.maps.importLibrary("geocoding")
    geocoder.geocode({
      'location':"5.06889,-75.51738"
       // ej. "-34.653015, -58.674850"
    }, function(results, status) {
        // si la solicitud fue exitosa
        if (status === google.maps.GeocoderStatus.OK) {
          // si encontró algún resultado.
          if (results[1]) {
            console.log(results[1].formatted_address);
          }
        }
  });
    
    
  })
}}


  const searchform = document.getElementById('search-form');
  const searchbox = document.getElementById('searchbox');
  searchform.addEventListener('submit', onSubmit, true);