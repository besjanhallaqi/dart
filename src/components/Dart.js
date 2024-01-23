import React, { useEffect, useState } from "react";

export default function Dart({ player, updatePoints, playerScore }) {
  const numbers = [
    { value: 20, rotate: 261 },
    { value: 1, rotate: 279 },
    { value: 18, rotate: 297 },
    { value: 4, rotate: 315 },
    { value: 13, rotate: 333 },
    { value: 6, rotate: 351 },
    { value: 10, rotate: 9 },
    { value: 15, rotate: 27 },
    { value: 2, rotate: 45 },
    { value: 17, rotate: 63 },
    { value: 3, rotate: 81 },
    { value: 19, rotate: 99 },
    { value: 7, rotate: 117 },
    { value: 16, rotate: 135 },
    { value: 8, rotate: 153 },
    { value: 11, rotate: 171 },
    { value: 14, rotate: 189 },
    { value: 9, rotate: 207 },
    { value: 12, rotate: 225 },
    { value: 5, rotate: 243 },
  ];
  const dartsDefaultPosition = [
    {
      throw: 0,
      points: 0,
      position: { bottom: "48px", left: "calc(50% - 96px)" },
    },
    {
      throw: 1,
      points: 0,
      position: { bottom: "48px", left: "calc(50% - 32px)" },
    },
    {
      throw: 2,
      points: 0,
      position: { bottom: "48px", left: "calc(50% + 32px)" },
    },
  ];
  const [firstPoint, setFirstPoint] = useState();
  const [secondPoint, setSecondPoint] = useState();
  const [movingDart, setMovingDart] = useState(false);
  const [moveDone, setMoveDone] = useState(false);
  const [dartThrowIndex, setDartThrowIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [scorePoints, setScorePoints] = useState([]);
  const [darts, setDarts] = useState(dartsDefaultPosition);

  let content, height, width;
  if (typeof document !== "undefined") {
    content = document.getElementById("dart-content");
    if (content) {
      height = content.offsetHeight;
      width = content.offsetWidth;
    }
  }

  const refreshStates = () => {
    setScore(0);
    setScorePoints([]);
    setDartThrowIndex(0);
    setFirstPoint();
    setSecondPoint();
    setMovingDart(false);
    setMoveDone(false);
    setDarts(dartsDefaultPosition);
  };

  const writeFirstPoint = (e) => {
    if (!movingDart) {
      const positionX = parseFloat(((e.clientX * 100) / width).toFixed(0));
      const positionY = parseFloat(((e.clientY * 100) / height).toFixed(0));
      setFirstPoint((prev) => (prev = { x: positionX, y: positionY }));
    }
  };

  const writeSecondPoint = (e) => {
    if (!movingDart && firstPoint) {
      const positionX = parseFloat(((e.clientX * 100) / width).toFixed(0));
      const positionY = parseFloat(((e.clientY * 100) / height).toFixed(0));
      setSecondPoint((prev) => (prev = { x: positionX, y: positionY }));
      setMovingDart(true);
    }
  };

  const throwDart = () => {
    const xPercentage = secondPoint.x - firstPoint.x;
    const yPercentage = (secondPoint.y - firstPoint.y) * -1;
    const x = (width * (xPercentage / 100)).toFixed(0);
    const y = (height * ((100 - yPercentage) / 100)).toFixed(0);
    if (y < height) {
      setMoveDone(true);
      setDarts((prev) => {
        prev[dartThrowIndex].position = {
          bottom: height - y - 10 + "px",
          left: "calc(50% + " + x + "px - 10px)",
        };
        return prev;
      });
      setDartThrowIndex(dartThrowIndex + 1);
      returnValue((width / 2 + parseInt(x)).toFixed(0), y);
    } else {
      console.log("Try again...");
    }
    setFirstPoint();
    setSecondPoint();
  };

  const returnValue = (x, y) => {
    const element = document.elementFromPoint(x, y);
    const timer = setTimeout(() => {
      if (element && element.classList.contains("dartPoint")) {
        const points = parseInt(element.getAttribute("value"));
        const totalScore = score + points;
        setScore(totalScore);
        setScorePoints([...scorePoints, points]);
        checkScore(totalScore);
      } else {
        setScorePoints([...scorePoints, 0]);
      }
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  };

  const checkScore = (score) => {
    if (dartThrowIndex === 2) {
      updatePoints(score);
    } else {
      if (playerScore < score) {
        updatePoints(0);
      } else if (playerScore === score) {
        updatePoints(score);
      }
    }
  };

  useEffect(() => {
    if (secondPoint) {
      if (JSON.stringify(firstPoint) !== JSON.stringify(secondPoint)) {
        throwDart();
      }
    }
  }, [secondPoint]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMovingDart(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [movingDart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshStates();
    }, 750);
    return () => clearTimeout(timer);
  }, [player]);

  return (
    <div
      id="dart-content"
      onMouseDown={writeFirstPoint}
      onMouseUp={writeSecondPoint}
      className="relative w-full flex justify-center items-center pb-[10%] select-none h-screen bg-white"
    >
      <div className="relative h-[60%] aspect-square">
        {numbers.map((item) => (
          <React.Fragment key={item.value}>
            <svg
              style={{ rotate: item.rotate + "deg" }}
              className={`absolute pointer-events-none`}
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="dartPoint pointer-events-auto"
                value={0}
                cx="220"
                cy="250"
                r="200"
                strokeWidth="25"
                strokeDasharray="59.7 1400"
              />
            </svg>
            <p
              style={{ rotate: 99 + item.rotate + "deg" }}
              className="w-full pointer-events-none h-full absolute text-center z-20 scale-[1.25] text-[32px] text-white"
            >
              {item.value}
            </p>
          </React.Fragment>
        ))}
        {numbers.map((item, index) => (
          <svg
            key={item.value}
            style={{ rotate: item.rotate + "deg" }}
            className={`absolute z-0 pointer-events-none`}
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="dartPoint pointer-events-auto"
              value={item.value * 2}
              cx="200"
              cy="200"
              fill="none"
              r="190"
              strokeWidth="15"
              stroke={index % 2 === 0 ? "red" : "green"}
              strokeDasharray="59.7 1400"
            />
          </svg>
        ))}
        {numbers.map((item, index) => (
          <svg
            key={item.value}
            style={{ rotate: item.rotate + "deg" }}
            className={`absolute z-1 pointer-events-none`}
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="dartPoint pointer-events-auto"
              value={item.value}
              cx="200"
              cy="200"
              fill="none"
              r="153.5"
              strokeWidth="58"
              stroke={index % 2 === 1 ? "white" : "black"}
              strokeDasharray="49 1400"
            />
          </svg>
        ))}
        {numbers.map((item, index) => (
          <svg
            key={item.value}
            style={{ rotate: item.rotate + "deg" }}
            className={`absolute z-2 pointer-events-none`}
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="dartPoint pointer-events-auto"
              value={item.value * 3}
              cx="200"
              cy="200"
              fill="none"
              r="117"
              strokeWidth="15"
              stroke={index % 2 === 0 ? "red" : "green"}
              strokeDasharray="39 1400"
            />
          </svg>
        ))}
        {numbers.map((item, index) => (
          <svg
            key={item.value}
            style={{ rotate: item.rotate + "deg" }}
            className={`absolute z-3 pointer-events-none`}
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="dartPoint pointer-events-auto"
              value={item.value}
              cx="200"
              cy="200"
              fill="none"
              r="70"
              strokeWidth="80"
              stroke={index % 2 === 1 ? "white" : "black"}
              strokeDasharray="23 1400"
            />
          </svg>
        ))}
        <svg
          className={`absolute z-4 pointer-events-none`}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="dartPoint pointer-events-auto"
            value={25}
            cx="200"
            cy="200"
            fill="none"
            r="22.5"
            strokeWidth="15"
            stroke={"green"}
            strokeDasharray="1400 1400"
          />
        </svg>
        <svg
          className={`absolute z-5 pointer-events-none`}
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="dartPoint pointer-events-auto"
            value={50}
            cx="200"
            cy="200"
            fill="none"
            r="7.6"
            strokeWidth="15"
            stroke={"red"}
            strokeDasharray="1400 1400"
          />
        </svg>
      </div>
      {darts.map((dart) => (
        <div
          key={dart.throw}
          style={{
            left: dart.position.left,
            bottom: dart.position.bottom,
            width:
              dartThrowIndex - 1 >= dart.throw && moveDone ? "20px" : "64px",
            height:
              dartThrowIndex - 1 >= dart.throw && moveDone ? "20px" : "64px",
          }}
          className={`absolute z-10 rounded-full transition-all duration-[2500ms] ease`}
        >
          <img
            src="./dart.png"
            className="rotate-[160deg] ml-[-10px] mt-[-4px] pointer-events-none w-full h-full hue-rotate-180"
          />
        </div>
      ))}
      <p className="absolute z-0 top-12 text-2xl">
        Score: {score} {scorePoints.length > 0 && `(${scorePoints.join(", ")})`}
      </p>
    </div>
  );
}
