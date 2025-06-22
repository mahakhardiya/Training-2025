import Counter from './Counter';
import InputField from './InputField';
import ToggleVisibility from './ToggleVisibility';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>React Hooks Interactive Components</h2>
      <Counter />
      <InputField />
      <ToggleVisibility />
    </div>
  );
}

export default App;