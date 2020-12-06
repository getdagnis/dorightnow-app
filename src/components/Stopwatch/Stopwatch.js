import React, { useEffect } from "react";
import ReactStopwatch from "react-stopwatch";

const Stopwatch = () => {
  useEffect(() => {});

  return (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      // limit="00:00:10"
      onChange={({ hours, minutes, seconds }) => {
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        const formatted = "🔥" + hours + ":" + minutes + ":" + seconds;
        document.title = formatted;
        // document.title =
        // const localCounterData = localStorage.getItem("counterData")
        //   ? localStorage.getItem("counterData")
        //   : null;
        // localCounterData &&
        // (localCounterData.minutes > 0 || localCounterData.hours > 0)
        //   ? console.log("local hours", localCounterData.minutes)
        //   : console.log("empty local storage");
        // const counterData = {
        //   id: mainTask.id,
        //   hours: hours,
        //   minutes: minutes,
        // };
        // console.log("counterData", {
        //   id: mainTask.id,
        //   hours: hours,
        //   minutes: minutes,
        // });
      }}
      onCallback={() => console.log("Finish")}
      render={({ formatted, hours, minutes, seconds }) => {
        return (
          <div className="countdown">
            <span className="countdown-units">{hours}h</span>
            <span className="countdown-units">{minutes}m</span>
            <span className="countdown-units">{seconds}s</span>
          </div>
        );
      }}
    />
  );
};

export default Stopwatch;
