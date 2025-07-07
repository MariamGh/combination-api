const service = require('../services/generate.service');
const { validateGenerateCombinationsRequest, buildGenerateCombinationsResponse } = require('../dtos/request/generate-combinations.dto');

exports.generate = async (req, res, next) => {
  try {
    const { valid, errors } = validateGenerateCombinationsRequest(req.body);
    if (!valid) {
      return res.status(400).json({ errors });
    }

    const { items, length } = req.body;
    const result = await service.generate(items, length);

    return res.status(201).json(buildGenerateCombinationsResponse(result.id, result.combination));
  } catch (err) {
    next(err);
  }
};
