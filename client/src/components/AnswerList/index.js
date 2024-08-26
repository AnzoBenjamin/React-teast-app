import React from "react";
import { v4 as uuidv4 } from "uuid";
import Answer from "../Answer";
const AnswerList = ({ answers, choice, onSelectAnswer }) => (
	<div className="my-8">
		{answers &&
			answers.map((ans) => (
				<Answer
					key={uuidv4()}
					choice={choice}
					text={ans}
					onSelectAnswer={onSelectAnswer}
				/>
			))}
	</div>
);

export default AnswerList;
