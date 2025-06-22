// src/InputField.js

import React, { useState } from 'react';

function InputField() {
  // 1. Initialize state for the input text.
  // We start with an empty string.
  const [inputText, setInputText] = useState('');

  // 2. Event handler to update the state on every keystroke.
  // The new value is available in the event object (e.target.value).
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div className="component-container">
      <h2>Live Input Display</h2>
      <input
        type="text"
        value={inputText} // The input's value is tied to our state
        onChange={handleChange} // The state is updated when the input changes
        placeholder="Type something here..."
      />
      {/* Display the text only if it's not empty */}
      {inputText && (
        <p className="display-text">
          You are typing: <strong>{inputText}</strong>
        </p>
      )}
    </div>
  );
}

export default InputField;