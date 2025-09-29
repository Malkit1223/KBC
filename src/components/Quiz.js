import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
import croreAudio from "../sounds/crore.mp3";
import introAudio from "../sounds/intro.mp3";

const Quiz = ({
  data,
  questionNumber,
  setQuestionNumber,
  setTimeOut,
  lifelines,
  setLifelines,
  hasPlayedIntro,
  setHasPlayedIntro,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [visibleAnswers, setVisibleAnswers] = useState([]);
  const [audiencePoll, setAudiencePoll] = useState(null);
  const [showCall, setShowCall] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [allowSelection, setAllowSelection] = useState(false);

  // Sounds
  const [playIntro] = useSound(introAudio, {
    onend: () => {
      setAllowSelection(true);    // Enable selection after intro
      setHasPlayedIntro(true);    // Mark intro as played
      playQuestionAudio();        // Play normal question audio
    },
  });
  const [playQuestionAudio] = useSound(play, { interrupt: true });
  const [playCorrect] = useSound(correct);
  const [playWrong] = useSound(wrong);
  const [playCroreSound] = useSound(croreAudio);

  // Load question and handle intro/audio
  useEffect(() => {
    const currentQuestion = data[questionNumber - 1];
    setQuestion(currentQuestion);
    setVisibleAnswers(currentQuestion?.answers || []);
    setAudiencePoll(null);
    setShowCall(false);
    setShowCongrats(false);
    setSelectedAnswer(null);

    if (!hasPlayedIntro) {
      setAllowSelection(false); // Block selection during intro
      playIntro();              // Play intro once
    } else {
      setAllowSelection(true);  // Allow selection immediately
      playQuestionAudio();      // Play question audio but don't block selection
    }
  }, [questionNumber, data, hasPlayedIntro, playIntro, playQuestionAudio]);

  // Lifelines
  useEffect(() => {
    if (!question || !lifelines.use) return;

    if (lifelines.use === "fiftyFifty") {
      const correctAns = question.answers.find((a) => a.correct);
      const wrongs = question.answers.filter((a) => !a.correct);
      const randomWrong = wrongs[Math.floor(Math.random() * wrongs.length)];
      setVisibleAnswers([correctAns, randomWrong]);
      setLifelines((prev) => ({ ...prev, use: null }));
    }

    if (lifelines.use === "flip") {
      setQuestionNumber((prev) => prev + 1);
      setLifelines((prev) => ({ ...prev, use: null }));
    }

    if (lifelines.use === "audience") {
      const poll = question.answers.map((a) => ({
        text: a.text,
        percent: a.correct ? 70 : Math.floor(Math.random() * 30),
      }));
      setAudiencePoll(poll);
      setLifelines((prev) => ({ ...prev, use: null }));
    }

    if (lifelines.use === "phone") {
      setShowCall(true);
      setTimeout(() => setShowCall(false), 2000);
      setLifelines((prev) => ({ ...prev, use: null }));
    }
  }, [lifelines.use, question, setLifelines, setQuestionNumber]);

  const handleClick = (item) => {
    if (!allowSelection || selectedAnswer) return;

    // Immediately mark as selected
    setSelectedAnswer(item);
    setClassName("answer active");

    // Show correct/wrong after short delay
    setTimeout(() => {
      setClassName(item.correct ? "answer correct" : "answer wrong");
    }, 300);

    // Move to next question or Try Again
    setTimeout(() => {
      if (item.correct) {
        playCorrect();

        if (questionNumber === data.length) {
          // Last question correct
          playCroreSound();
          setShowCongrats(true);
          setTimeOut(true); // End game and show final score
        } else {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        }
      } else {
        playWrong();
        // Wrong answer → Try Again from start
        setQuestionNumber(1);
        setSelectedAnswer(null);
        setTimeOut(true);
      }
    }, 1500);
  };

  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>

      <div className="answers">
        {visibleAnswers.map((item) => (
          <div
            key={item.text}
            className={selectedAnswer === item ? className : "answer"}
            onClick={() => handleClick(item)}
            style={{
              pointerEvents: allowSelection ? "auto" : "none",
              opacity: allowSelection ? 1 : 0.5,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

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

      {showCall && (
        <div className="call-popup">
          📞 Calling <strong>Malkit</strong>
        </div>
      )}

      {showCongrats && (
        <div className="congrats-popup">
          🎉 Congratulations! You may get extra marks from sir! 🎉
        </div>
      )}
    </div>
  );
};

export default Quiz;
