import React, { useState } from 'react'
import clearSky from '../Images/clear-sky.png'
import Clouds from '../Images/Clouds.png'
import Smoke from '../Images/Smoke.png'
import Haze from '../Images/Haze.png'
import Mist from '../Images/Mist.png'
import Rain from '../Images/Rain.png'
import Sunny from '../Images/Sunny.png'
import Sunset from '../Images/sunset.png'
import humidityIcon from '../Images/humidity.png'
import pressureIcon from '../Images/pressure.png'
import windIcon from '../Images/wind.png'
import { useEffect } from 'react'

const Weather = (props) => {

  const [city, setCity] = useState("mumbai")
  const [weatherIcon, setweatherIcon] = useState()
  const [temperature, setTemperature] = useState()
  const [country, setCountry] = useState()
  const [weather, setWeather] = useState("")
  const [sunrise, setSunrise] = useState()
  const [sunset, setSunset] = useState()
  const [humidity, setHumidity] = useState()
  const [pressure, setPressure] = useState()
  const [wind, setWind] = useState()

  useEffect(() => {
    getdefaultData();
  }, [])

  useEffect(() => {
    if (weather) {
      switch (weather) {
        case "Clear":
          setweatherIcon(clearSky)
          break;

        case "Clouds":
          setweatherIcon(Clouds)
          break;

        case "Smoke":
          setweatherIcon(Smoke)
          break;

        case "Haze":
          setweatherIcon(Haze)
          break;
        case "Mist":
          setweatherIcon(Mist)
          break;
        case "Rain":
          setweatherIcon(Rain)
          break;

        default:
          setweatherIcon(Sunny)
          break;
      }
    }
  }, [weather])


  const getdefaultData = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=10974e47467b3d03353caf46ce220a44&units=metric`;
      let fetchedData = await fetch(url);
      let parsedData = await fetchedData.json();
      setCity(parsedData.name)
      setTemperature(parsedData.main.temp)
      setWeather((parsedData.weather[parsedData.weather.length - 1].main))
      setCountry(parsedData.sys.country)
      setHumidity(parsedData.main.humidity)
      setPressure(parsedData.main.pressure)
      setWind(parsedData.wind.speed)

      // Getting sunrise and sunset timing from offsets
      let sec1 = parsedData.sys.sunset
      let date1 = new Date(sec1 * 1000)
      let sunset_time = `${date1.getHours()}:${date1.getMinutes()}`
      setSunset(sunset_time)

      let sec2 = parsedData.sys.sunrise
      let date2 = new Date(sec2 * 1000)
      let sunrise_time = `${date2.getHours()}:${date2.getMinutes()}`
      setSunrise(sunrise_time)

    } catch (error) {
      console.log("Sorry!! We are unable to fetch the given data...")
    }
  }

  const getuserData = async () => {
    try {

      let input_text = document.getElementById("text").value.toLowerCase();
      if (input_text === "") {
        getdefaultData();
      }
      else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input_text}&appid=10974e47467b3d03353caf46ce220a44&units=metric`;
        let fetchedData = await fetch(url);
        let parsedData = await fetchedData.json();
        setCity(parsedData.name)
        setTemperature(parsedData.main.temp)
        setWeather((parsedData.weather[parsedData.weather.length - 1].main))
        setCountry(parsedData.sys.country)
        setHumidity(parsedData.main.humidity)
        setPressure(parsedData.main.pressure)
        setWind(parsedData.wind.speed)

        // Getting sunrise and sunset timing from offsets
        let sec1 = parsedData.sys.sunset
        let date1 = new Date(sec1 * 1000)
        let sunset_time = `${date1.getHours()}:${date1.getMinutes()}`
        setSunset(sunset_time)

        let sec2 = parsedData.sys.sunrise
        let date2 = new Date(sec2 * 1000)
        let sunrise_time = `${date2.getHours()}:${date2.getMinutes()}`
        setSunrise(sunrise_time)
      }
    }
    catch (error) {
      console.log("Sorry!! We are unable to fetch the given data...")
    }

  }

  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>

        <div className="input-group mb-3" id='input' style={{width:'50%'}}>
          <input type="text" id="text" className="form-control" placeholder="Search by City" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button className="btn btn-success" type="button" id="button-addon2" onClick={getuserData}>Search</button>
        </div>

        {/* Setting Weather Icon */}
        <div className="container pe-0 ps-0 rounded-4" style={{ height: '460px', width: '700px', fontFamily: 'Quicksand' }}>
          <div className=' bg-white d-flex justify-content-center rounded-top-4' style={{ height: '190px', padding: '5px' }}>
            <img src={weatherIcon} alt="" width={190} />
          </div>

          <div className="container pe-0 ps-0 d-flex flex-row" style={{ height: '180px' }}>

            {/* Fetching temperature and weather */}
            <div className="div1 d-flex align-items-center bg-black" style={{ width: '70%', height: '180px', fontFamily: 'Quicksand' }}>
              <div className="degree text-light mx-3" style={{ fontSize: '80px', width: 'fit-content' }}>{temperature}&#176;</div>

              {/* City & Country */}
              <div className="div2 text-light mx-3 mt-3">
                <h2>{weather.toUpperCase()}</h2>
                <p>{city} , {country}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="div2 text-light d-flex flex-column justify-content-center fw-semibold" style={{ backgroundColor: '#28c897', height: '180px', width: '30%', fontSize: '35px', paddingLeft: '10px' }}>
              <div className="date">{`${props.date}/${props.month < 10 ? `0${props.month}` : props.month}/${props.year}`}</div>
              <div className="time">{props.get_date()}</div>
            </div>
          </div>

          <div className="container bg-white rounded-bottom-4 d-flex align-items-center " style={{ height: '90px', width: '100%'}}>
            {/* Sunset */}
            <div className="sunset d-flex justify-content-evenly align-items-center w-25" style={{ height: '80px'}}>
              <div className="img d-flex align-items-center">
                <img src={Sunset} alt="" width={40} />
              </div>
              <div className='d-flex flex-column justify-content-center text-dark mt-1' style={{ fontSize: '15px', fontFamily: 'Quicksand' ,fontWeight:'bold'}}>
                <div>{`${props.hour < 20 ? `${sunset} PM` : `${sunrise} AM`}`}</div>
                <div>{`${props.hour < 20 ? "Sunset" : "Sunrise"}`}</div>
              </div>
            </div>
            {/* Humidity */}
            <div className="humidity d-flex justify-content-evenly align-items-center w-25" style={{ height: '80px' }}>
              <div className="img d-flex align-items-center">
                <img src={humidityIcon} alt="" width={40} />
              </div>
              <div className='d-flex flex-column justify-content-center text-dark mt-1' style={{ fontSize: '15px', fontFamily: 'Quicksand', fontWeight: 'bold' }}>
                <div>{humidity}</div>
                <div>Humidity</div>
              </div>
            </div>

            {/* pressure */}
            <div className="pressure d-flex justify-content-evenly align-items-center w-25" style={{ height: '80px' }}>
              <div className="img d-flex align-items-center">
                <img src={pressureIcon} alt="" width={40} />
              </div>
              <div className='d-flex flex-column justify-content-center text-dark mt-1' style={{ fontSize: '15px', fontFamily: 'Quicksand', fontWeight: 'bold' }}>
                <div>Pressure</div>
                <div>{pressure} MM</div>
              </div>
            </div>

            {/* wind */}
            <div className="wind d-flex justify-content-evenly align-items-center w-25" style={{ height: '80px' }}>
              <div className="img d-flex align-items-center">
                <img src={windIcon} alt="" width={40} />
              </div>
              <div className='d-flex flex-column justify-content-center text-dark mt-1' style={{ fontSize: '15px', fontFamily: 'Quicksand', fontWeight: 'bold' }}>
                <div>Wind</div>
                <div>{wind}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Weather;
