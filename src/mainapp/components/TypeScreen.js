import React, { useState, useEffect, useRef } from "react";
import Result from "./Result";

const TypeScreen = () => {
  const inputRef = useRef();
  const [playStart, setPlayStart] = useState(false);
  const [inPlay, setInPlay] = useState(false);

  const [userInput, setUserInput] = useState("");
  const [wrong, setWrong] = useState([]);
  const [right, setRight] = useState([]);
  const [inputPos, setInputPos] = useState(-1);
  const [inc, setInc] = useState(0);

  const textsList = [
    `That's all the note said. There was no indication from where it came or who may have written it. Had it been meant for someone else? Meghan looked around the room, but nobody made eye contact back. For a brief moment, she thought it might be a message for her to follow her dreams, but ultimately decided it was easier to ignore it as she crumpled it up and threw it away.`,
    `What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life.`,
    `What was beyond the bend in the stream was unknown. Both were curious, but only one was brave enough to want to explore. That was the problem. There was always one that let fear rule her life.`,
    `He looked at the sand. Picking up a handful, he wondered how many grains were in his hand. Hundreds of thousands? "Not enough," the said under his breath. I need more.`,
    `Things aren't going well at all with mom today. She is just a limp noodle and wants to sleep all the time. I sure hope that things get better soon.`,
    `It was going to rain. The weather forecast didn't say that, but the steel plate in his hip did. He had learned over the years to trust his hip over the weatherman. It was going to rain, so he better get outside and prepare.`,
  ];
  const randomNumberGen = () => {
    return Math.floor(Math.random() * textsList.length);
  };

  const typer = (e) => {
    setInPlay(true);
    setPlayStart(true);
    if (e.key === "Backspace") {
      if (inputPos > -1) {
        setRight(right.filter((item) => item !== inputPos));
        setWrong(wrong.filter((item) => item !== inputPos));
        setInputPos(inputPos - 1);
        setUserInput(userInput.slice(0, -1));
      }
    } else {
      if (e.key !== "Shift") {
        if (text.split("")[inputPos + 1] === e.key) {
          setRight([...right, inputPos + 1]);
        } else if (text.split("")[inputPos + 1] !== e.key) {
          setWrong([...wrong, inputPos + 1]);
          setInc(inc + 1);
        }
        setUserInput(userInput + e.key);
        setInputPos(inputPos + 1);
      }
    }
  };

  // const [text, setText] = useState("Hello");
  const [text, setText] = useState(textsList[randomNumberGen()]);

  useEffect(() => {
    if (userInput.split("").length === text.split("").length) {
      setInPlay(false);
    } else {
      window.addEventListener("keydown", typer);
    }

    return () => {
      window.removeEventListener("keydown", typer);
    };
  }, [inputPos]);

  return (
    <div>
      <div className="test-texts">
        <div className="new-texts-btn">
          <i
            onClick={() => {
              setText(textsList[randomNumberGen()]);
              setUserInput("");
              setInputPos(-1);
              setRight([]);
              setWrong([]);
              setInc(0);
            }}
          >
            <ion-icon name="refresh-outline"></ion-icon>
          </i>
        </div>
        <div className="texts">{text}</div>
      </div>
      <div className="textarea" ref={inputRef} spellCheck={false}>
        {text.split("").map((item, ind) => {
          return (
            <span
              key={ind}
              className={inputPos === ind - 1 ? "type-bar" : ""}
              style={{
                color: `${
                  right.includes(ind)
                    ? "rgb(240, 240, 240)"
                    : wrong.includes(ind)
                    ? "rgb(202, 72, 72)"
                    : "rgb(192, 192, 192)"
                }`,
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
      <div className="result" style={{ color: "white" }}>
        {<Result data={{ inPlay, userInput, text, inc, playStart }} />}
      </div>
    </div>
  );
};

export default TypeScreen;
