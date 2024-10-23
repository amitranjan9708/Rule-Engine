// components/EvaluateRule.js
import React, { useState } from 'react';
import axios from 'axios';

const EvaluateRule = () => {
    const [ruleId, setRuleId] = useState('');
    const [userData, setUserData] = useState({ age: '', department: '', salary: '', experience: '' });
    const [result, setResult] = useState('');

    const handleEvaluate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/rules/${ruleId}/evaluate`, { userData });
            setResult(response.data.result);
        } catch (error) {
            console.error(error);
            alert('Error evaluating rule: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Evaluate a Rule</h2>
            <form onSubmit={handleEvaluate}>
                <input
                    type="text"
                    value={ruleId}
                    onChange={(e) => setRuleId(e.target.value)}
                    placeholder="Enter rule ID"
                    required
                />
                <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                    placeholder="Age"
                    required
                />
                <input
                    type="text"
                    value={userData.department}
                    onChange={(e) => setUserData({ ...userData, department: e.target.value })}
                    placeholder="Department"
                    required
                />
                <input
                    type="number"
                    value={userData.salary}
                    onChange={(e) => setUserData({ ...userData, salary: e.target.value })}
                    placeholder="Salary"
                    required
                />
                <input
                    type="number"
                    value={userData.experience}
                    onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
                    placeholder="Experience"
                    required
                />
                <button type="submit">Evaluate Rule</button>
            </form>
            {result && <h3>Result: {result}</h3>}
        </div>
    );
};

export default EvaluateRule;
