import React, { useState, useEffect, useRef } from "react";

import ButtonSmall from "../ButtonSmall/ButtonSmall";
import "./Feedback.css";
import feedbackIcon from "./feedback.svg";

function Feedback() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  function clickHandle() {
    setFeedbackOpen(false);
  }

  return (
    <div className="feedback">
      {feedbackOpen ? (
        <FeedbackOpen feedbackOpen={feedbackOpen} clickHandle={clickHandle} />
      ) : (
        <div
          className="feedback-closed"
          onClick={() => {
            setFeedbackOpen(true);
          }}
        >
          <img
            className="feedback-icon"
            src={feedbackIcon}
            alt="Give feedback!"
          />
          Tried this? Give feedback!
        </div>
      )}
    </div>
  );
}

const FeedbackOpen = (props) => {
  const { clickHandle } = props;
  let ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div className="feedback-open">
      <h3 className="feedback-h3">Hi! I'm still building this app.</h3>
      Please leave your feedback to help it get better:
      <form className="feedback-form" action="POST" netlify>
        <textarea
          className="task-input form-input"
          name="feedback-text"
          id="feedback-text"
          cols="30"
          rows="3"
          ref={(e) => {
            ref.current = e;
          }}
          placeholder="Things I like... things I don't like... features I miss..."
        ></textarea>
        <ButtonSmall
          onClick={(e) => {
            e.preventdefault();
          }}
          title="submit"
          size="large"
          type="submit"
          color="red"
        />
      </form>
      <div
        className="task-btn-hide"
        onClick={() => {
          clickHandle();
        }}
      ></div>
    </div>
  );
};

export default Feedback;
