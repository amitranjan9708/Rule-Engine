const Rule = require('../models/Rule');
const { createAST, evaluateAST } = require('../utils/ruleUtils');

// Create a rule
// Rule controller
const createRule = async (req, res) => {
    try {
        const { ruleString } = req.body;
        const ast = createAST(ruleString); // Convert rule string to AST
        const rule = new Rule({ ruleString, ast });
        await rule.save();
        console.log(ast);
        res.status(201).json({ message: 'Rule created', ruleId: rule._id, rule }); // Include rule ID in the response
    } catch (error) {
        res.status(400).json({ message: 'Error creating rule', error: error.message });
    }
};


// Evaluate a rule against user data
const evaluateRule = async (req, res) => {
    try {
        const { ruleId } = req.params;
        const { userData } = req.body;

        // Find the rule by its ID
        const rule = await Rule.findById(ruleId);
        if (!rule) {
            return res.status(404).json({ message: 'Rule not found' });
        }
        
        

        // Pass the AST (not the whole rule object) to the evaluateAST function
        const isEligible = evaluateAST(rule.ast, userData); 
        
        

        let message = isEligible ? "User is eligible" : "User is not eligible";

        res.status(200).json({ result:message});
    } catch (error) {
        res.status(400).json({ message: 'Error evaluating rule', error: error.message });
    }
};

module.exports = { createRule, evaluateRule };
