function buildGenerateCombinationsResponse(id, combinations) {
  return {
    id,
    combination: combinations
  };
}

module.exports = {
  buildGenerateCombinationsResponse
};
