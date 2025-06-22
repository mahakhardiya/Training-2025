import { useState } from 'react';

function ToggleVisibility() {
  // 1. Initialize state for visibility.
  // 'isVisible' will be either true or false. We start with true.
  const [isVisible, setIsVisible] = useState(true);

  // 2. Event handler to flip the boolean state.
  const handleToggle = () => {
    setIsVisible(currentVisibility => !currentVisibility);
  };

  return (
    <div className="component-container">
      <h2>Visibility Toggle</h2>
      <div className="button-group">
        <button onClick={handleToggle}>
          {/* Change button text based on the state */}
          {isVisible ? 'Hide Paragraph' : 'Show Paragraph'} 
        </button>
      </div>

      {/* 
        Conditional Rendering:
        The <p> tag is only rendered to the DOM if 'isVisible' is true.
      */}
      {isVisible && (
        <p className="toggle-text">
          This paragraph can be hidden and shown!
        </p>
      )}
    </div>
  );
}

export default ToggleVisibility;