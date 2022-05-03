import React, { useEffect, useState } from "react";
import $ from "./Circle.module.css";

export default function Circle({ desc, percent, title }) {
  const [counter, setCounter] = useState(0);
  const [stop, setStop] = useState(false);
  var fullStroke = 435;
  var strokeOffset = fullStroke - fullStroke * (percent / 100);
  useEffect(() => {
    var interval;
    if (counter < percent) {
      interval = setInterval(() => {
        setCounter((counter) => counter + 1);
      }, 20);
    }
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className={$.container}>
      <p className={$.containerDisc}>{title}</p>
      <div className={$.progress}>
        <div className={$.outer}>
          <div className={$.inner}>
            <div className={$.number}>{counter}%</div>
          </div>
        </div>
        <svg className={$.svg} xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#e91e63" />
              <stop offset="100%" stopColor="#673ab7" />
            </linearGradient>
          </defs>
          <circle
            //full offset is 435
            className={$.circle}
            strokeDashoffset={strokeOffset}
            cx={80}
            cy={80}
            r={70}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className={$.progressDesc}>{desc}</p>
    </div>
  );
}
