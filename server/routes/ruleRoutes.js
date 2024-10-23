const express = require('express');
const { createRule, evaluateRule } = require('../controllers/ruleController');
const router = express.Router();

// POST /api/rules - Create a new rule
router.post('/rules', createRule);

// POST /api/rules/:ruleId/evaluate - Evaluate rule for given data
router.post('/rules/:ruleId/evaluate', evaluateRule);

module.exports = router;
