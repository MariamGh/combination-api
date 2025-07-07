const Joi = require('joi');

const generateCombinationsSchema = Joi.object({
  items: Joi.array()
    .items(Joi.number().integer().positive().label("Each item"))
    .min(1)
    .required()
    .label("items"),

  length: Joi.number()
    .integer()
    .positive()
    .required()
    .label("length")
});

function validateGenerateCombinationsRequest(body) {
  const { error } = generateCombinationsSchema.validate(body, { abortEarly: false });

  return {
    valid: !error,
    errors: error ? error.details.map(detail => detail.message) : []
  };
}

function buildGenerateCombinationsResponse(id, combinations) {
  return {
    id,
    combination: combinations
  };
}

module.exports = {
  validateGenerateCombinationsRequest,
  buildGenerateCombinationsResponse
};
