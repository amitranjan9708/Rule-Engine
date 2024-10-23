// Helper function to determine if a string is an operator
const isOperator = (char) => {
    return char === 'AND' || char === 'OR';
};

// Helper function to parse a condition like 'age > 30'
const parseCondition = (condition) => {
    const operators = ['>', '<', '>=', '<=', '=', '!='];
    let operator = null;

    for (const op of operators) {
        if (condition.includes(op)) {
            operator = op;
            break;
        }
    }

    if (!operator) throw new Error(`Invalid condition: ${condition}`);

    const [left, right] = condition.split(operator).map((str) => str.trim());

    return {
        type: 'operand',
        field: left,
        operator: operator,
        value: isNaN(right) ? right.replace(/['"]+/g, '') : Number(right) // Remove quotes for strings or convert to number
    };
};

// Function to handle operator precedence and parentheses
const tokenizeWithPrecedence = (ruleString) => {
    const regex = /\(|\)|\s+(AND|OR)\s+|[^()]+/g;
    return ruleString.match(regex).map(token => token.trim());
};

// Helper function to build an AST with proper handling of parentheses
const buildAST = (tokens) => {
    const operatorStack = [];
    const operandStack = [];

    const applyOperator = () => {
        const operator = operatorStack.pop();
        const right = operandStack.pop();
        const left = operandStack.pop();
        operandStack.push({
            type: 'operator',
            operator: operator,
            left: left,
            right: right
        });
    };

    tokens.forEach(token => {
        if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                applyOperator();
            }
            operatorStack.pop(); // Remove '('
        } else if (isOperator(token)) {
            while (
                operatorStack.length &&
                operatorStack[operatorStack.length - 1] !== '('
            ) {
                applyOperator();
            }
            operatorStack.push(token);
        } else {
            operandStack.push(parseCondition(token));
        }
    });

    while (operatorStack.length) {
        applyOperator();
    }

    return operandStack[0];
};

// Main function to create the AST from a rule string
const createAST = (ruleString) => {
    const tokens = tokenizeWithPrecedence(ruleString);
    return buildAST(tokens);
};

// Function to evaluate a condition node against user data
const evaluateCondition = (field, operator, value, userData) => {
    let userValue = userData[field];

    // Handle missing fields
    if (userValue === undefined) {
        throw new Error(`Field '${field}' is missing in user data`);
    }

    // Handle data type conversions (e.g., strings vs. numbers)
    if (typeof userValue === 'string' && typeof value === 'number') {
        userValue = Number(userValue);
    } else if (typeof userValue === 'number' && typeof value === 'string') {
        value = Number(value);
    }

    // Perform the comparison
    switch (operator) {
        case '>':
            return userValue > value;
        case '<':
            return userValue < value;
        case '>=':
            return userValue >= value;
        case '<=':
            return userValue <= value;
        case '=':
            return userValue === value;
        case '!=':
            return userValue !== value;
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
};

// Function to evaluate the AST against user data with short-circuit logic
const evaluateAST = (ast, userData) => {
    if (ast.type === 'operand') {
        // If it's a leaf node (condition), evaluate the condition
        return evaluateCondition(ast.field, ast.operator, ast.value, userData);
    }

    // Recursively evaluate the left child
    const leftResult = evaluateAST(ast.left, userData);

    // Short-circuit evaluation for AND
    if (ast.operator === 'AND' && !leftResult) {
        return false; // No need to evaluate the right child
    }

    // Short-circuit evaluation for OR
    if (ast.operator === 'OR' && leftResult) {
        return true; // No need to evaluate the right child
    }

    // Recursively evaluate the right child
    const rightResult = evaluateAST(ast.right, userData);

    // Apply the logical operator (AND/OR)
    if (ast.operator === 'AND') {
        return leftResult && rightResult;
    } else if (ast.operator === 'OR') {
        return leftResult || rightResult;
    } else {
        throw new Error(`Unknown operator: ${ast.operator}`);
    }
};

// Export the functions
module.exports = { createAST, evaluateAST };
