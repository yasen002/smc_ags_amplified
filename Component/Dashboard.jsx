import React, { useState, useEffect } from "react";
import Circle from "./Circle";
import $ from "./Dashboard.module.scss";

export default function Dashboard({ data }) {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const negative = negativeProgress(data.negative);
    const vivo = vivoProgress(data.vivo);
    const committee = committeeProgress(data.committeeCredit);
    const socials = socialsProgress(data.socials);
    const workshops = workshopsProgress(data.workshops);
    const payment = paymentProgress(data.payment);
    setProgress({ negative, vivo, committee, socials, workshops, payment });
    return () => {
      setProgress(null);
    };
  }, []);

  return (
    <>
      {!!progress && (
        <div className={$.dashboard}>
          <div className={$.nav}>
            <p className={$.navHeader}>AGS Member Summary</p>
            <div className={$.navStudentInfo}>
              <p>SMC ID: {data.studentID}</p>
              <p>Name: {data.officialName}</p>
            </div>
          </div>
          <div className={$.progressContainer}>
            <Circle desc={progress.vivo.desc} percent={progress.vivo.percent} title="vivo" />
            <Circle desc={progress.committee.desc} percent={progress.committee.percent} title="committee credit" />
            {/* <Circle desc={progress} percent={50} title="attendance" /> */}
            <Circle desc={progress.socials.desc} percent={progress.socials.percent} title="socials" />
            <Circle desc={progress.workshops.desc} percent={progress.workshops.percent} title="workshops" />
            <Circle desc={progress.negative.desc} percent={progress.negative.percent} title="negative one" />
            <Circle desc={progress.payment.desc} percent={progress.payment.percent} title="scholarship dues" />
          </div>
        </div>
      )}
    </>
  );
}

function vivoProgress(data) {
  data = Number(data);
  const totalVivo = 5.0;
  const vivoPercent = data / totalVivo;
  vivoPercent *= 100;
  const vivoDesc = `${data}/${totalVivo} vivo complete `;
  return { percent: vivoPercent, desc: vivoDesc };
}

function committeeProgress(data) {
  const isCommitteeMember = data?.toLowerCase().includes("committee");

  return {
    percent: isCommitteeMember === true ? 100 : 0,
    desc: isCommitteeMember === true ? "is a committee member" : "not a committee member",
  };
}

function paymentProgress(data) {
  const paymentStatus = data?.toLowerCase() === "received" ? true : false;

  return {
    percent: !!paymentStatus ? 100 : 0,
    desc: !!paymentStatus ? "Payment Received" : "payment NOT received",
  };
}

function socialsProgress(data) {
  data = Number(data);
  const total = 2.0;
  const percent = data / total;
  percent *= 100;
  const desc = `${data}/${total} socials complete `;
  return { percent: percent, desc: desc };
}

function workshopsProgress(data) {
  data = Number(data);
  const total = 2.0;
  const percent = data / total;
  percent *= 100;
  const desc = `${data}/${total} workshops complete `;
  return { percent: percent, desc: desc };
}

function negativeProgress(data) {
  data = Number(data);
  const total = 3.0;
  const percent = data / total;
  percent *= 100;
  const desc = `${data} negative violation `;
  return { percent: percent, desc: desc };
}
