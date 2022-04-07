import React, { useState, useEffect } from "react";
import Circle from "../../Component/Circle";
import $ from "./dashboard.module.css";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [studentData, setStudentData] = useState(null);
  const [progress, setProgress] = useState(null);
  useEffect(() => {
    const data = JSON.parse(Cookies.get("student"))[0];
    setStudentData(data);
    const negative = negativeProgress(data.negative);
    const vivo = vivoProgress(data.vivo);
    const committee = committeeProgress(data.committeeCredit);
    const socials = socialsProgress(data.socials);
    const workshops = workshopsProgress(data.workshops);
    setProgress({ negative, vivo, committee, socials, workshops });
    return () => {
      Cookies.remove("student");
    };
  }, []);

  return (
    <>
      {progress !== null && (
        <div className={$.dashboard}>
          <div className={$.nav}>
            <p className={$.navDisc}>AGS Member Summary</p>
            <div className={$.navStudentInfo}>
              <p>SMC ID: {studentData.studentID}</p>
              <p>Name: {studentData.officialName}</p>
            </div>
          </div>
          <div className={$.progressWrapper}>
            <div className={$.progressContainer}>
              <Circle
                desc={progress.vivo.desc}
                percent={progress.vivo.percent}
                title="vivo"
              />
              <Circle
                desc={progress.committee.desc}
                percent={progress.committee.percent}
                title="committee credit"
              />
              {/* <Circle desc={progress} percent={50} title="attendance" /> */}
              <Circle
                desc={progress.socials.desc}
                percent={progress.socials.percent}
                title="socials"
              />
              <Circle
                desc={progress.workshops.desc}
                percent={progress.workshops.percent}
                title="workshops"
              />
              <Circle
                desc={progress.negative.desc}
                percent={progress.negative.percent}
                title="negative one"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function vivoProgress(data) {
  const totalVivo = 5.0;
  const vivoPercent = data / totalVivo;
  vivoPercent *= 100;
  const vivoDesc = `${data}/${totalVivo} vivo complete `;
  return { percent: vivoPercent, desc: vivoDesc };
}

function committeeProgress(data) {
  const isCommitteeMember = data.toLowerCase().includes("committee");
  console.log(isCommitteeMember, "...");

  return {
    percent: isCommitteeMember === true ? 100 : 0,
    desc:
      isCommitteeMember === true
        ? "is a committee member"
        : "not a committee member",
  };
}

function socialsProgress(data) {
  const total = 2.0;
  const percent = data / total;
  percent *= 100;
  const desc = `${data}/${total} socials complete `;
  return { percent: percent, desc: desc };
}

function workshopsProgress(data) {
  const total = 2.0;
  const percent = data / total;
  percent *= 100;
  const desc = `${data}/${total} workshops complete `;
  return { percent: percent, desc: desc };
}

function negativeProgress(data) {
  const total = 3.0;
  const percent = data / total;
  percent *= 100;
  const desc = `${data} negative violation `;
  return { percent: percent, desc: desc };
}
