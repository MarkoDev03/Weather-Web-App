import React from "react";
import Skycons from "react-skycons";
import "./home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { CloudRain } from "react-bootstrap-icons";

export default function Info({ hourly }) {
  return (
    <div className="hourly-width border-bo mt-3 mb-3">
      <p className='headline-nxt'>Next 48 hours</p>
      <div className='bordert '></div>
      <Swiper className="hourly-width" slidesPerView={3} spaceBetween={10} freeMode={true}  breakpoints={{
              5000: { slidesPerView: 5, spaceBetween: 10 },
              2000: { slidesPerView: 5, spaceBetween: 10 },
              1920: { slidesPerView: 5, spaceBetween: 10 },
              1400: { slidesPerView: 5, spaceBetween: 10 },
              1000: { slidesPerView: 5, spaceBetween: 10 },
              700: { slidesPerView: 5, spaceBetween: 10 },
              500: { slidesPerView: 5, spaceBetween: 10 },
              400: { slidesPerView: 5, spaceBetween: 10 },
              380: { slidesPerView: 3.5, spaceBetween: 10 },
              300: { slidesPerView: 3.5, spaceBetween: 10 },
            }}>
        {hourly.data.map((item) => (
          <SwiperSlide className="d-flex justify-content-center align-items-center flex-column p-1 items">
            <span className="mb-1">
              {new Date(item.time * 1000).getHours()} : 00
            </span>
            <Skycons
              color={"yellow"}
              type={item.icon.replace(/-/g, "_").toUpperCase()}
              animate={true}
              size={40}
              key={item.icon}
              resizeClear={true}
              {...{ backgroundColor: "blue" }}
            />
            <span className="text-light m-1 weather-max-min">
              <span className="min-max-num">
                {Math.round((item.temperature - 32) * (5 / 9))}
              </span>{" "}
              <span className="deg">°</span>
            </span>
            <div className="d-flex">
              <CloudRain color="#008cff" size={25}></CloudRain>
              <span className="m-1">
                {Math.round(item.precipProbability * 100)} %
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
