import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appAction } from "../features/appSlice";

const Result = ({ data }) => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.mainApp);
  const { timerValue, inPlay, result, playStart } = appState;

  useEffect(() => {
    if (!inPlay && playStart) {
      dispatch(
        appAction.setResult({
          text: data.text,
          inc: data.inc,
          userInput: data.userInput,
        })
      );
    }
  }, [inPlay, playStart]);

  return (
    <>
      {playStart && !inPlay && result ? (
        <>
          <h2>Result</h2>
          <div className="after-result flex-box">
            <div className="result-item flex-box">
              <h5>
                <i>
                  <ion-icon name="stopwatch-outline"></ion-icon>
                </i>
                <span>Time</span>
              </h5>

              <div className="result-value">
                {`${
                  Math.floor(result.resultTime / 60) < 10
                    ? `0${Math.floor(result.resultTime / 60)}`
                    : `${Math.floor(result.resultTime / 60)}`
                }:${
                  result.resultTime - Math.floor(result.resultTime / 60) * 60 <
                  10
                    ? `0${
                        result.resultTime -
                        Math.floor(result.resultTime / 60) * 60
                      }`
                    : `${
                        result.resultTime -
                        Math.floor(result.resultTime / 60) * 60
                      }`
                }`}
              </div>
            </div>
            <div className="result-item flex-box">
              <h5>WPM</h5>
              <div className="result-value"> {parseInt(result.wpm)}</div>
            </div>
            <div className="result-item flex-box">
              <h5> Accuracy</h5>
              <div className="result-value"> {parseInt(result.acc)}%</div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Result;
