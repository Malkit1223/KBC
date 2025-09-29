import { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBListGroup, MDBBtn } from "mdb-react-ui-kit";
import "./App.css";
import Quiz from "./components/Quiz";
import { data, prizeMoney } from "./data";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [name, setName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [earned, setEarned] = useState("₹ 0");

  // Lifelines
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    flip: true,
    audience: true,
    phone: true,
  });

  // Track if intro audio has played
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        prizeMoney.find((item) => item.id === questionNumber - 1).amount
      );
  }, [questionNumber]);

  return (
    <div className="App">
      {!name ? (
        <Start setName={setName} setTimeOut={setTimeOut} />
      ) : (
        <MDBRow>
          <MDBCol md="9">
            <div className="main">
              {timeOut ? (
                <div style={{ textAlign: "center", marginTop: "150px" }}>
                  <h1 className="earned">You Earned Total: {earned}</h1>
                  <MDBBtn
                    color="warning"
                    style={{ marginTop: "20px" }}
                    onClick={() => {
                      setQuestionNumber(1);
                      setEarned("₹ 0");
                      setTimeOut(false);
                      setLifelines({
                        fiftyFifty: true,
                        flip: true,
                        audience: true,
                        phone: true,
                      });
                    }}
                  >
                    Try Again
                  </MDBBtn>
                </div>
              ) : (
                <>
                  <div style={{ height: "50%", position: "relative" }}>
                    <div className="timer">
                      <Timer
                        setTimeOut={setTimeOut}
                        questionNumber={questionNumber}
                      />
                    </div>
                  </div>

                  {/* Lifeline Buttons */}
                  <div className="lifelines" style={{ marginBottom: "10px" }}>
                    <MDBBtn
                      disabled={!lifelines.fiftyFifty}
                      onClick={() =>
                        setLifelines((prev) => ({
                          ...prev,
                          fiftyFifty: false,
                          use: "fiftyFifty",
                        }))
                      }
                      className="mx-2"
                    >
                      50:50
                    </MDBBtn>
                    <MDBBtn
                      disabled={!lifelines.flip}
                      onClick={() =>
                        setLifelines((prev) => ({
                          ...prev,
                          flip: false,
                          use: "flip",
                        }))
                      }
                      className="mx-2"
                    >
                      Flip
                    </MDBBtn>
                    <MDBBtn
                      disabled={!lifelines.audience}
                      onClick={() =>
                        setLifelines((prev) => ({
                          ...prev,
                          audience: false,
                          use: "audience",
                        }))
                      }
                      className="mx-2"
                    >
                      Audience Poll
                    </MDBBtn>
                    <MDBBtn
                      disabled={!lifelines.phone}
                      onClick={() =>
                        setLifelines((prev) => ({
                          ...prev,
                          phone: false,
                          use: "phone",
                        }))
                      }
                      className="mx-2"
                    >
                      Calling
                    </MDBBtn>
                  </div>

                  <div style={{ height: "50%" }}>
                    <Quiz
                      data={data}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                      setTimeOut={setTimeOut}
                      lifelines={lifelines}
                      setLifelines={setLifelines}
                      hasPlayedIntro={hasPlayedIntro}
                      setHasPlayedIntro={setHasPlayedIntro}
                    />
                  </div>
                </>
              )}
            </div>
          </MDBCol>

          <MDBCol md="3" className="money">
            <MDBListGroup className="money-list">
              <MDBRow>
                <span className="mb-2">
                  <MDBBtn
                    style={{ float: "right" }}
                    className="mx-2"
                    color="light"
                    onClick={() => setTimeOut(true)}
                  >
                    Quit
                  </MDBBtn>
                  <MDBBtn
                    style={{ float: "right" }}
                    onClick={() => {
                      setName(null);
                      setQuestionNumber(1);
                      setEarned("₹ 0");
                      setLifelines({
                        fiftyFifty: true,
                        flip: true,
                        audience: true,
                        phone: true,
                      });
                      setHasPlayedIntro(false); // reset intro for next game
                    }}
                  >
                    Exit
                  </MDBBtn>
                </span>
                <MDBCol md="6">Name: {name}</MDBCol>
                <MDBCol md="6">Total Earned: {earned}</MDBCol>
              </MDBRow>
              <hr />
              {prizeMoney.map((item) => (
                <li
                  key={item.id}
                  className={questionNumber === item.id ? "item active" : "item"}
                >
                  <h5 className="amount">{item.amount}</h5>
                </li>
              ))}
            </MDBListGroup>
          </MDBCol>
        </MDBRow>
      )}
    </div>
  );
}

export default App;
