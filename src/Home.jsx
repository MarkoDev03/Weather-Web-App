import React, { useLayoutEffect, useState } from "react";
import Skycons from "react-skycons";
import Hourly from "./Hourly";
import "./home.css";
import $ from "jquery";
import "swiper/swiper.min.css";
import Block from './Block'
import {ArrowUp,ArrowDown,Droplet,Sun,Sunset,Sunrise,Wind,Speedometer,Cloud,CloudRain,CloudRainHeavy,Thermometer,Eye,CloudRainFill,InfoCircle,Clock,ThermometerSun,ThermometerSnow,DropletHalf,Water} from "react-bootstrap-icons";
import RainVideos from './weather-media/rain.mp4'
import Sunny from './weather-media/sun.mp4_'
import NightSky from './weather-media/night.mp4'

export default function HomeScreen() {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December",];
  var A = new Array([]);
  A["Ё"] = "YO";A["Й"] = "I";A["Ц"] = "TS";A["У"] = "U";A["К"] = "K";A["Е"] = "E";A["Н"] = "N";A["Г"] = "G";A["Ш"] = "Š";A["Щ"] = "SCH";A["З"] = "Z";A["Х"] = "H";A["Ъ"] = "'";A["ё"] = "yo";A["й"] = "i";A["ц"] = "ts";A["у"] = "u";A["к"] = "k";A["е"] = "e"; A["н"] = "n";A["г"] = "g";A["ш"] = "š"; A["щ"] = "sch";A["з"] = "z";A["х"] = "h";A["ъ"] = "'";A["Ф"] = "F";A["Ы"] = "I";A["В"] = "V";A["А"] = "A";A["П"] = "P";A["Р"] = "R";A["О"] = "O";A["Л"] = "L";A["Д"] = "D";A["Ж"] = "ZH";A["Э"] = "E";A["ф"] = "f";A["ы"] = "i";A["в"] = "v";A["а"] = "a";A["п"] = "p";A["р"] = "r";A["о"] = "o";A["л"] = "l";A["д"] = "d";A["ж"] = "zh";A["э"] = "e";A["Я"] = "YA";A["Ч"] = "CH";A["С"] = "S";A["М"] = "M";A["И"] = "I";A["Т"] = "T";A["Ь"] = "'";A["Б"] = "B";A["Ю"] = "YU";A["я"] = "ya";A["ч"] = "ch";A["с"] = "s";A["м"] = "m";A["и"] = "i";A["т"] = "t";A["ь"] = "'";A["б"] = "b";A["ю"] = "yu";A["љ"] = "lj";A["Љ"] = "Lj";

  var dateTime = new Date();

  const [day, setDay] = useState(days[dateTime.getDay()]);
  const [dayNum, setDayNum] = useState(5);
  const [year, setYear] = useState(2019);
  const [month, setMonth] = useState(monthNames[dateTime.getMonth()]);
  const [cityName, setCityName] = useState("City");
  const [iconic, setIconic] = useState();
  const [daily, setDaily] = useState([]);
  const [hourly, setHourly] = useState(null);
  const [max, setMax] = useState("0");
  const [min, setMin] = useState("0");
  const [today, setToday] = useState(null);
  const [country, setCountry] = useState("Country");
  const [dewPoint, setDewPoint] = useState(0);
  const [temperature, setTemperature] = useState(10);
  const [region, setRegion] = useState("");
  const [clock, setClock] = useState("");
  const [dawn, setDawn] = useState(6);
  const [night, setNight] = useState(18);
  const [temperatureDescription, setTemperatureDescription] = useState("Sunny");

  useLayoutEffect(() => {
   function getData() {
    let longitudeUser, latitudeUser;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        position.enableHighAccuracy = true;
        longitudeUser = position.coords.longitude;
        latitudeUser = position.coords.latitude;

        localStorage.setItem("long",longitudeUser)
        localStorage.setItem("lat",longitudeUser)

        const proxy = "https://api.allorigins.win/raw?url=";
        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitudeUser},${longitudeUser}`;

        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setRegion(data.timezone);
            localStorage.setItem("data", JSON.stringify(data))
            setDaily(data.daily.data);
            setHourly(data.hourly);
            localStorage.setItem("hourly", JSON.stringify(data.hourly))
            setToday(data.currently);
            setDewPoint(Math.round(data.daily.data[0].dewPoint));

            setMax(
              Math.round((data.daily.data[0].temperatureMax - 32) * (5 / 9))
            );
            setMin(
              Math.round((data.daily.data[0].temperatureMin - 32) * (5 / 9))
            );

            const { summary, icon } = data.currently;

            setTemperature(
              Math.round((data.hourly.data[0].temperature - 32) * (5 / 9))
            );
            setTemperatureDescription(summary);

            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            setIconic(currentIcon);
            localStorage.setItem("rain", currentIcon)
      
            var d = new Date();
            $.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitudeUser},${longitudeUser}&pretty=1&key=572d4a63d1b040e0b11092b3f924227c`
            )
              .done((data) => {
                var word = data.results[0].components.city;
                var countryCyr = data.results[0].components.country;
                var answer = "";
                var countryLat = "";

                for (var i in word) {
                  if (A[word[i]] === undefined) {
                    answer += word[i];
                  } else {
                    answer += A[word[i]];
                  }
                }

                for (var j in countryCyr) {
                  if (A[countryCyr[j]] === undefined) {
                    countryLat += countryCyr[j];
                  } else {
                    countryLat += A[countryCyr[j]];
                  }
                }

                setCountry(countryLat);

                if (answer === "" || answer === " ") {
                  setCityName(region);

                  localStorage.setItem("city", cityName);
                  setTimeout(() => {
                    document.getElementById("city").innerText = region;
                  }, 100);
                } else {
                  localStorage.setItem("city", answer);
                }

                setCityName(answer);
              })
              .fail((xhr, status) => console.log("error:", status));

            setMonth(monthNames[d.getMonth()]);
            setDay(days[d.getDay()]);
            setDayNum(d.getDate());
            setYear(d.getFullYear());

            setDawn(new Date(daily[0].sunriseTime * 1000).getHours())
            setNight(new Date(daily[0].sunsetTime * 1000).getHours())
          });
      });

      var date = new Date();
      var h = date.getHours();
      var root = document.documentElement;

      if (h > night || h < dawn) {
        root.style.setProperty("--box-color", "rgba(140, 139, 139, 0.2)");
        root.style.setProperty("--bar-color", "rgba(71, 71, 71, 0.45)");
      } else {
        root.style.setProperty("--box-color", "rgba(0, 0, 0, 0.2)");
        root.style.setProperty("--bar-color", "rgba(37, 37, 37, 0.5)");
      }

      function showTime() {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();

        if (m < 10) {
          m = "0" + m;
        }
        if (s < 10) {
          s = "0" + s;
        }
        if (h < 10) {
          h = "0" + h;
        }

        var time = h + ":" + m + ":" + s;
        setClock(time);
      
        setTimeout(showTime, 1000);
      }
      
setTimeout(() => {
  console.log(daily)
}, 2000);
      showTime();
      console.log(new Date().getHours() < night || new Date().getHours() > dawn
      ? iconic == "RAIN" || iconic == "rain" 
      ? "RainVideo"
      : "Sunny"
      : "NightSky")
    }   }
    getData()
    return ( ()=>{
      getData()
   })
 
  },[]);
  return (
    <React.Fragment>
      <div
        className={
          new Date().getHours() > night || new Date().getHours() < dawn
            ? "body "
            : iconic === "RAIN" 
            ? "body "
            : "body "
        }
        id="body"
      >
      {iconic !== undefined ? (
         (new Date().getHours() > night || new Date().getHours() < dawn ?  (<video autoPlay 
           muted loop className="wrap"><source src={NightSky} type="video/mp4" /></video>) : iconic === "RAIN" ? 
         (<video autoPlay  muted loop className="wrap" ><source src={RainVideos} type="video/mp4" /></video>) : 
         (<video autoPlay  muted loop className="wrap"><source src={Sunny} type="video/mp4" /></video>) 
       )
      ) : ""}
        <div className="header">
      
        </div>
        <div className="mobile-center-screen">
          <span className="text-light moby-big">{cityName}</span>
          <span className="text-light moby-temp">{temperature}°c</span>
          <span className="text-light moby-desc">{temperatureDescription}</span>
          <span className="data-min-max-mob mt-1">
            <span className="d-flex" style={{ marginRight: "5px" }}>
              <ArrowUp color="yellow" size={25}></ArrowUp>
              {max}°c
            </span>
            <span className="d-flex">
              <ArrowDown color="lightblue" size={25}></ArrowDown>
              {min}°c
            </span>
          </span>
          {today !== null ? (
            <span className="d-flex text-light mt-2">
              <CloudRain
                color="#008cff"
                size={25}
                style={{ marginRight: "7px" }}
              ></CloudRain>
              {Math.round(daily[0].precipProbability * 100)} %
            </span>
          ) : (
            <span className="d-flex">
              <CloudRain color="#008cff" size={25}></CloudRain>Loading...
            </span>
          )}

          <Skycons
            color="white"
            type={iconic}
            animate={true}
            size={60}
            resizeClear={true}
            className="mt-3"
            {...{ backgroundColor: "blue" }}
          />
        </div>
        <section className="main-section">
          <div className="city-name">
            <h2 className="display-1 text-light" id="city">
              {cityName}
            </h2>
            <h2 className="country-h2">{country}</h2>
          </div>
          <div className="weatherInfo">
            <div className="d-flex justify-content-start align-items-start flex-column ">
              <h2 className="clock">{clock}</h2>
              <h2 id="date">
                {day}, {month} {dayNum}, {year}
              </h2>
            </div>
            <h1 className="text-light " id="temperature">
              {temperature}°c
            </h1>
          </div>
        </section>
        {/*BOTTOM SHEET */}
        {today !== null ? (
          <div className="more-certain-info justify-content-center align-items-center flex-column pt-2 ">
            <div className="mt-5  block-in-menu">
              <Skycons
                color="white"
                type={iconic}
                animate={true}
                size={150}
                resizeClear={true}
                className="icon"
                {...{ backgroundColor: "blue" }}
              />
              <h1 id="temperature-word" className="text-light">
                {temperatureDescription}
              </h1>
            </div>
            <Hourly hourly={hourly}></Hourly>
            <div className="d-flex mt-1 mb-3 wrapper">
              <p className="headline-nxt days-7">Next 7 days</p>
              {daily.map((item, index) => (
                <div className="slide  text-light">
                  <span className="text-light day-name">
                    {" "}
                    {days[new Date(item.time * 1000).getDay()].substring(0, 3)}
                  </span>
                  <Skycons
                    color={index === 0 ? "yellow" : "white"}
                    type={item.icon.replace(/-/g, "_").toUpperCase()}
                    animate={true}
                    size={30}
                    key={item.icon}
                    resizeClear={true}
                    {...{ backgroundColor: "blue" }}
                  />
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="text-light m-1 day-name-2">
                      <span className="">
                        {Math.round((item.temperatureLow - 32) * (5 / 9)) <
                        10 ? (
                          <span>
                            &nbsp;{" "}
                            {Math.round((item.temperatureLow - 32) * (5 / 9))}
                          </span>
                        ) : (
                          Math.round((item.temperatureLow - 32) * (5 / 9))
                        )}
                      </span>
                      <span className="deg">°c</span>
                    </span>
                    <span className="text-light m-1">/</span>
                    <span className="text-light m-1 day-name-2">
                      <span className=" ">
                        {" "}
                        {Math.round((item.temperatureMax - 32) * (5 / 9))}
                      </span>{" "}
                      <span className="deg">°c</span>
                    </span>
                  </div>
                  <div className="d-flex cloud">
                    <span className="m-1">
                      {Math.round(item.precipProbability * 100) < 10 ? (
                        <span>
                          {" "}
                          &nbsp; {Math.round(item.precipProbability * 100)}
                        </span>
                      ) : (
                        Math.round(item.precipProbability * 100)
                      )}{" "}
                      %
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center flex-row flex-grow mt-3 mb-3 custom-width">
              <Sun color="yellow" className="w-25 h-auto"></Sun>

              <div className="d-flex justify-content-between align-items-center flex-column flex-grow w-75">
                <div className="w-100 d-flex justify-content-between align-items-center block ">
                  <span className="txt">Max Temperature</span>
                  <span>{max} °c</span>
                </div>

                <div className="w-100 d-flex justify-content-between align-items-center block border-0">
                  <span className="txt">Min Temperature</span>
                  <span>{min} °c</span>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center flex-row flex-grow mt-3 mb-3 custom-width">
               <div className=" d-flex justify-content-center align-items-center flex-row w-50">
               <Sunrise color="yellow"  size={50} style={{marginRight:'20px'}} />
               <div className="d-flex justify-content-center align-items-start flex-column  ">
               <span className="sun-time">Sunrise</span>
               <span className='sun-time-span'>
               {new Date(daily[0].sunriseTime * 1000).getHours() < 10
                  ? "0" + new Date(daily[0].sunriseTime * 1000).getHours()
                  : new Date(daily[0].sunriseTime * 1000).getHours()}{" "}
                :{" "}
                {new Date(daily[0].sunriseTime * 1000).getMinutes() < 10
                  ? "0" + new Date(daily[0].sunriseTime * 1000).getMinutes()
                  : new Date(daily[0].sunriseTime * 1000).getMinutes()}
              </span>
               </div>
               </div>
               <div className="w-50 d-flex justify-content-center align-items-center flex-row w-50">
               <Sunset color="yellow" size={50} style={{marginRight:'20px'}} />
               <div className="d-flex justify-content-center align-items-start flex-column ">
               <span className="sun-time">Sunset</span>
               <span className='sun-time-span'>
                {new Date(daily[0].sunsetTime * 1000).getHours()} :{" "}
                {new Date(daily[0].sunsetTime * 1000).getMinutes() < 10
                  ? "0" + new Date(daily[0].sunsetTime * 1000).getMinutes()
                  : new Date(daily[0].sunsetTime * 1000).getMinutes()}{" "}
              </span>
              </div>
               </div>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-row flex-grow mt-3 mb-3 custom-width pt-0">
               <div className="d-flex justify-content-center align-items-center flex-row w-50 ">
               <ThermometerSun color="#fc5000"  size={50} style={{marginRight:'20px'}} />
               <div className="d-flex justify-content-center align-items-start flex-column  ">
               <span className="sun-time">High at</span>
               <span className='sun-time-span'>
               {(new Date(daily[0].apparentTemperatureHighTime * 1000).getHours()) < 10
                  ? "0" + (new Date(daily[0].apparentTemperatureHighTime * 1000).getHours())
                  : (new Date(daily[0].apparentTemperatureHighTime * 1000).getHours())}{" "}
                :{" "}
                {new Date(daily[0].apparentTemperatureHighTime * 1000).getMinutes() < 10
                  ? "0" + new Date(daily[0].apparentTemperatureHighTime * 1000).getMinutes()
                  : new Date(daily[0].apparentTemperatureHighTime * 1000).getMinutes()}
              </span>
               </div>
               </div>
               <div className="w-50 d-flex justify-content-center align-items-center flex-row w-50 ">
               <ThermometerSnow color="#9eedff" size={50} style={{marginRight:'20px'}} />
               <div className="d-flex justify-content-center align-items-start flex-column ">
               <span className="sun-time">Low at</span>
               <span className='sun-time-span'>
               {(new Date(daily[0].apparentTemperatureLowTime * 1000).getHours()) < 10
                  ? "0" + (new Date(daily[0].apparentTemperatureLowTime * 1000).getHours())
                  : (new Date(daily[0].apparentTemperatureLowTime * 1000).getHours())}{" "}
                :{" "}
                {new Date(daily[0].apparentTemperatureLowTime * 1000).getMinutes() < 10
                  ? "0" + new Date(daily[0].apparentTemperatureLowTime * 1000).getMinutes()
                  : (new Date(daily[0].apparentTemperatureLowTime * 1000).getMinutes())}
              </span>
              </div>
               </div>
            </div>

            <p className="headline-nxt days-7 w-100">More Details</p>
            <div className="w-100 h-auto d-flex"></div>
         
            <Block text="Humidity" icon={<Droplet color="lightblue" size={25}></Droplet>} value={`${Math.round(today.humidity * 100)} %`} />
            <Block text="UV Index" icon={<Sun color="yellow" size={25}></Sun>} value={today.uvIndex <= 2? "Low": today.uvIndex > 2 && today.uvIndex < 6? "Midium": "High"} />
            <Block text="UV Index Time" icon={<Clock color="#ff1f1f" size={25}></Clock>} value={`${new Date(daily[0].uvIndexTime * 1000).getHours()} :${new Date(daily[0].uvIndexTime * 1000).getMinutes() < 10? "0" + new Date(daily[0].uvIndexTime * 1000).getMinutes(): new Date(daily[0].uvIndexTime * 1000).getMinutes()}`} />
            <Block text="Wind" icon={<Wind color="grey" size={25}></Wind>} value={`${Math.round(today.windSpeed * 1.609344)} km/h`} />
            <Block text="Pressure" icon={<Speedometer color="green" size={25}></Speedometer>} value={`${today.pressure} hPa`} />
            <Block text="Clouds" icon={<Cloud color="#8ba1b3" size={25}></Cloud>} value={`${Math.round(today.cloudCover * 100)} %`} />
            <Block text="Rain" icon={<CloudRain color="#008cff" size={25}></CloudRain>} value={`${Math.round(daily[0].precipProbability * 100)} %`} />
            <Block text="Precip Intensity" icon={<CloudRainHeavy color="#00a1db" size={25}></CloudRainHeavy>} value={`${Math.round(daily[0].precipIntensity * 100)}`} valuetype={(<span>l/m <sup>2</sup></span>)} />            
            <Block text="Max Precip Intensity" icon={ <CloudRainFill color="#1f8fff" size={25}></CloudRainFill>} value={`${Math.round(daily[0].precipIntensityMax * 100)}`} valuetype={(<span>l/m <sup>2</sup></span>)} />
            <Block text="Precip Type" icon={<DropletHalf color="#dbfffa" size={25}></DropletHalf>} value={`${daily[0].precipType}`} />
            <Block text="Feeling" icon={<Thermometer color="red" size={25}></Thermometer>} value={`${Math.round((today.apparentTemperature - 32) * (5 / 9))}`} valuetype="°c" />
            <Block text="Visibility" icon={<Eye color="#00ff84" size={25}></Eye>} value={`${Math.round(today.visibility)}`} />
            <Block text="Dew Point" icon={<Water color="#12c9c0" size={25}></Water>} value={`${dewPoint < 50? "Dry": dewPoint >= 50 && dewPoint <= 55? "Pleasant": dewPoint >= 56 && dewPoint <= 60? "Comfortable": dewPoint >= 61 && dewPoint <= 65? "Sticky": dewPoint >= 66 && dewPoint <= 70? "Uncomfortable": dewPoint >= 71 && dewPoint <= 75? "Oppressive": dewPoint >= 76? "Miserable": ""}`} />

            <div className="block">
              <div className="d-flex justify-content-center align-items-center">
                <InfoCircle color="darkorange" size={25}></InfoCircle>
                <span className="txt">{daily[0].summary} </span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
}
