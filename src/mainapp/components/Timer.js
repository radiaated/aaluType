import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appAction } from "../features/appSlice";

const Timer = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.mainApp);
  const { timerValue, inPlay } = appState;

  useEffect(() => {
    const timer = setInterval(() => {
      if (inPlay) {
        dispatch(appAction.setTimer());
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [inPlay]);

  return (
    <>
      {inPlay && (
        <div className={`timer flex-box ${inPlay ? "tick-tock" : ""}`}>
          <div className="timer-icon">
            <i>
              <ion-icon name="stopwatch-outline"></ion-icon>
            </i>
          </div>
          {Math.floor(timerValue / 60) < 10 ? (
            <>
              <div>0</div>
              <div>{Math.floor(timerValue / 60)}</div>
            </>
          ) : (
            <div>{Math.floor(timerValue / 60)}</div>
          )}
          <div>:</div>
          {timerValue - Math.floor(timerValue / 60) * 60 < 10 ? (
            <>
              <div>0</div>
              <div>{timerValue - Math.floor(timerValue / 60) * 60}</div>
            </>
          ) : (
            <>
              <div>
                {String(timerValue - Math.floor(timerValue / 60) * 60)[0]}
              </div>
              <div>
                {String(timerValue - Math.floor(timerValue / 60) * 60)[1]}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Timer;
