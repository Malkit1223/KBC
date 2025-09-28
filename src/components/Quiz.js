import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

const Quiz = ({
  data,
  questionNumber,
  setQuestionNumber,
  setTimeOut,
  lifelines,
  setLifelines,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [visibleAnswers, setVisibleAnswers] = useState([]);
  const [audiencePoll, setAudiencePoll] = useState(null);
  const [showCall, setShowCall] = useState(false);

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
    setVisibleAnswers(data[questionNumber - 1]?.answers || []);
    setAudiencePoll(null);
    setShowCall(false);
  }, [data, questionNumber]);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  // Lifeline Handlers
  useEffect(() => {
    if (!question) return;

    // 50:50
    if (lifelines.use === "fiftyFifty") {
      const correct = question.answers.find((a) => a.correct);
      const wrongs = question.answers.filter((a) => !a.correct);
      const randomWrong = wrongs[Math.floor(Math.random() * wrongs.length)];
      setVisibleAnswers([correct, randomWrong]);
      setLifelines((prev) => ({ ...prev, use: null }));
    }

    // Flip
    if (lifelines.use === "flip") {
      setQuestionNumber((prev) => prev + 1);
      setLifelines((prev) => ({ ...prev, use: null }));
    }

    // Audience Poll
    if (lifelines.use === "audience") {
      const poll = question.answers.map((a) => ({
        text: a.text,
        percent: a.correct ? 70 : Math.floor(Math.random() * 30),
      }));
      setAudiencePoll(poll);
      setLifelines((prev) => ({ ...prev, use: null }));
    }

    // Phone a Friend
    if (lifelines.use === "phone") {
      setShowCall(true);
      setTimeout(() => {
        setShowCall(false);
      }, 2000); // shows popup for 2 sec
      setLifelines((prev) => ({ ...prev, use: null }));
    }
  }, [lifelines.use, question, setLifelines, setQuestionNumber]);

  const delay = (duration, callBack) => {
    setTimeout(() => {
      callBack();
    }, duration);
  };

  const handleClick = (item) => {
    setSelectedAnswer(item);
    setClassName("answer active");

    delay(3000, () => {
      setClassName(item.correct ? "answer correct" : "answer wrong");
    });

    delay(5000, () => {
      if (item.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
      }
    });
  };

  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>

      <div className="answers">
        {visibleAnswers.map((item) => (
          <div
            key={item.text}
            className={selectedAnswer === item ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(item)}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Audience Poll Results */}
      {audiencePoll && (
        <div className="poll">
          <h4>Audience Poll</h4>
          {audiencePoll.map((p) => (
            <p key={p.text}>
              {p.text}: {p.percent}%
            </p>
          ))}
        </div>
      )}

      {/* Call a Friend Popup */}
      {showCall && (
        <div className="call-popup">
          📞 Calling your friend... <strong>Malkit</strong>
        </div>
      )}
    </div>
  );
};

export default Quiz;
