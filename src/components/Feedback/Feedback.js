import React, { useState, useEffect, useRef } from "react";

import ButtonSmall from "../ButtonSmall/ButtonSmall";
import "./Feedback.css";
import feedbackIcon from "./feedback.svg";

function Feedback() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function clickHandle() {
    setFeedbackOpen(false);
  }

  function clickHandleSent() {
    setFeedbackOpen(false);
    setFeedbackSent(true);
  }

  return (
    <div className="feedback">
      {feedbackOpen ? (
        <FeedbackOpen
          feedbackOpen={feedbackOpen}
          clickHandleSent={clickHandleSent}
          clickHandle={clickHandle}
        />
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
          {feedbackSent
            ? "Thanks! Feedback sent."
            : "Played around? Give FEEDBACK!"}
        </div>
      )}
    </div>
  );
}

const FeedbackOpen = (props) => {
  const { clickHandle, clickHandleSent } = props;
  const [formState, setFormState] = useState({
    feedbackText: "",
  });
  let ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleChange = (e) => {
    setFormState({ [e.target.name]: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "feedback", ...formState }),
    })
      .then(() => clickHandleSent())
      .catch((error) => alert("Error! Sorry, form not sent...", error));
  };

  return (
    <div className="feedback-open">
      <h3 className="feedback-h3">
        Help me build this app into one you'll love!
      </h3>
      Please leave your feedback and be part of the process:
      <form
        onSubmit={handleSubmit}
        className="feedback-form"
        name="feedback"
        action="/feedback"
        method="post"
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="feedback" />
        <textarea
          className="task-input form-input"
          name="feedbackText"
          value={formState.feedbackText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          id="feedback-text"
          cols="30"
          rows="3"
          ref={(e) => {
            ref.current = e;
          }}
          placeholder="Things I like... things I don't like... features I miss..."
          required
        ></textarea>
        <ButtonSmall title="submit" size="large" type="submit" color="red" />
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
