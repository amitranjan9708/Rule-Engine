import React from 'react';
import RuleForm from './components/RuleForm';
import EvaluateRule from './components/EvaluateRule';
import './styles.css'; // Import the CSS styles

const App = () => {
    return (
        <div className="App">
            <h1>Rule Engine</h1>
            


            <RuleForm />
            <p style={{ textAlign: "Left" }}>
  Ensure proper parenthesis between each AND and OR
</p>
            <EvaluateRule />
        </div>
    );
};

export default App;
