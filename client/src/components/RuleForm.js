// components/RuleForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RuleForm = () => {
    const [ruleString, setRuleString] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/rules', { ruleString });
            alert(response.data.message);
            const { ruleId } = response.data;
            alert(ruleId);
            setRuleString(''); // Clear the input field after submission
        } catch (error) {
            console.error(error);
            alert('Error creating rule: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Create a Rule</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ruleString}
                    onChange={(e) => setRuleString(e.target.value)}
                    placeholder="Enter rule string"
                    required
                />
                <button type="submit">Create Rule</button>
            </form>
        </div>
    );
};

export default RuleForm;
