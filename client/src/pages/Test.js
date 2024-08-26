import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

import Loader from "../components/Loader";
import Button from "../components/Button";
import AnswerList from "../components/AnswerList";
import Question from "../components/Question";
import ResultPage from "./protected/ResultPage";

const api_url = "https://the-trivia-api.com/api/questions";

const Test = () => {
  const { testId } = useParams();
  const [tests, setTests] = useState([]);
  const [testNo, setTestNo] = useState(0);
  const [choice, setChoice] = useState("");
  const [score, setScore] = useState(0);
  const [isloading, setIsloading] = useState(true);

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    fetchData(api_url).then((data) => {
      setTests(data);
      setIsloading(false);
      setTestNo(parseInt(testId)); // Start from the specific test based on the URL parameter
    });
  }, [testId]);

  const handleSelectAnswer = (answer) => setChoice(answer);

  const handleClickNext = () => {
    checkAnswer();
    setTestNo(testNo + 1);
  };

  const handleClickTry = () => {
    setIsloading(true);
    setScore(0);
    setChoice("");
    setTestNo(0);
    fetchData(api_url).then((data) => {
      setTests(data);
      setIsloading(false);
    });
  };

  const currentTest = tests.length > 0 && tests[testNo];
  const correctAnswer = currentTest?.correctAnswer;
  const incorrectAnswers = currentTest?.incorrectAnswers;
  const answers = correctAnswer &&
    incorrectAnswers && [correctAnswer, ...incorrectAnswers];

  const isCorrect = correctAnswer === choice;

  const checkAnswer = () => isCorrect && setScore(score + 1);

  const testTitleStyle =
    " w-full text-slate-800 dark:text-slate-100 fixed top-0 left-0 p-5 tracking-widest flex items-center justify-between";

  return (
    <div className="mx-auto md:max-w-lg mt-24">
      <h1 className={testTitleStyle}>Test</h1>

      {tests.length === 0 || isloading ? (
        <Loader />
      ) : testNo === tests.length ? (
        <ResultPage score={score} tests={tests} onClickTry={handleClickTry} />
      ) : (
        <div>
          <div className="flex justify-between mb-3">
            <span>{currentTest?.category}</span>
            <span>
              {testNo + 1}/{tests.length}
            </span>
          </div>

          <Question currentTest={currentTest} />

          <AnswerList
            answers={answers}
            choice={choice}
            onSelectAnswer={handleSelectAnswer}
          />

          <Button onClickButton={handleClickNext}>
            Next
            <RiArrowRightLine />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Test;
