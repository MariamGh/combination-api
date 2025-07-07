module.exports = {
  TABLES: {
    ITEMS: 'items',
    COMBINATIONS: 'combinations',
    RESPONSES: 'responses',
  },
  COLUMNS: {
    ITEMS: {
      ID: 'id',
      LABEL: 'label',
    },
    COMBINATIONS: {
      ID: 'id',
      ITEMS: 'items',
    },
    RESPONSES: {
      ID: 'id',
      RESPONSE_TEXT: 'response_text',
      CREATED_AT: 'created_at',
    },
  },
};
