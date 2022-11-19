import React, { useState, useEffect } from "react";

const Result = ({ data }) => {
  const [timerValue, setTimerValue] = useState(0);
  const [showResult, setShowResult] = useState(null);

  const wpmCalc = () => {
    let correctWords = 0;
    data.userInput.split(" ").map((item) => {
      correctWords = data.text.split(" ").includes(item) ? correctWords + 1 : 0;
    });

    setShowResult({
      wpm: (correctWords / (timerValue === 0 ? 1 : timerValue)) * 60,
      acc:
        ((data.text.split("").length - data.inc) / data.text.split("").length) *
        100,
      resultTime: timerValue,
    });
    if (localStorage.getItem("typTest")) {
      if (
        JSON.parse(localStorage.getItem("typTest")).pb <
        (correctWords / (timerValue === 0 ? 1 : timerValue)) * 60
      ) {
        localStorage.setItem(
          "typTest",
          JSON.stringify({
            pb: (correctWords / (timerValue === 0 ? 1 : timerValue)) * 60,
          })
        );
      }
    } else {
      localStorage.setItem(
        "typTest",
        JSON.stringify({
          pb: (correctWords / (timerValue === 0 ? 1 : timerValue)) * 60,
        })
      );
    }
  };

  useEffect(() => {
    if (data.inPlay) {
      const timer = setInterval(() => {
        setTimerValue(timerValue + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      wpmCalc();
      setShowResult(null);
    }
  }, [data.inPlay, timerValue]);

  return (
    <div>
      {data.inPlay && (
        <>
          <div className={`timer ${data.inPlay ? "tick-tock" : ""}`}>
            <i>
              <ion-icon name="stopwatch-outline"></ion-icon>
            </i>
            {`${
              Math.floor(timerValue / 60) < 10
                ? `0${Math.floor(timerValue / 60)}`
                : `${Math.floor(timerValue / 60)}`
            }:${
              timerValue - Math.floor(timerValue / 60) * 60 < 10
                ? `0${timerValue - Math.floor(timerValue / 60) * 60}`
                : `${timerValue - Math.floor(timerValue / 60) * 60}`
            }`}
          </div>
          <div className="pb">
            {localStorage.getItem("typTest")
              ? `Personal Best: ${parseInt(
                  JSON.parse(localStorage.getItem("typTest")).pb
                )}`
              : ""}
          </div>
        </>
      )}
      {data.playStart && !data.inPlay ? (
        <div className="after-results">
          <h5>Result</h5>
          <div className="after-result">
            <div>
              <i>
                <ion-icon name="stopwatch-outline"></ion-icon>
              </i>
              {`${
                Math.floor(showResult.resultTime / 60) < 10
                  ? `0${Math.floor(showResult.resultTime / 60)}`
                  : `${Math.floor(showResult.resultTime / 60)}`
              }:${
                showResult.resultTime -
                  Math.floor(showResult.resultTime / 60) * 60 <
                10
                  ? `0${
                      showResult.resultTime -
                      Math.floor(showResult.resultTime / 60) * 60
                    }`
                  : `${
                      showResult.resultTime -
                      Math.floor(showResult.resultTime / 60) * 60
                    }`
              }`}
            </div>
            <div className="wpm-result">WPM: {parseInt(showResult.wpm)}</div>
            <div className="acc-result">
              Accuracy: {parseInt(showResult.acc)}%
            </div>
          </div>
        </div>
      ) : (
        showResult && `Last Result: WPM:${showResult.wpm}`
      )}
    </div>
  );
};

export default Result;
