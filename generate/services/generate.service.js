const db = require('../../database/database');
const { TABLES, COLUMNS } = require('../../database/database.schema');
const { DatabaseError } = require('../../errors');

function getLetterPrefix(index) {
  let result = '';
  while (index >= 0) {
    result = String.fromCharCode((index % 26) + 65) + result;
    index = Math.floor(index / 26) - 1;
  }
  return result;
}

function mapInputToItems(countsArray) {
  const items = [];
  countsArray.forEach((count, index) => {
    const prefix = getLetterPrefix(index); 
    for (let i = 1; i <= count; i++) {
      items.push(`${prefix}${i}`);
    }
  });
  return items;
}

function generateValidCombinations(items, length) {
  const results = [];

  function backtrack(start, path) {
    if (path.length === length) {
      results.push([...path]);
      return;
    }

    for (let i = start; i < items.length; i++) {
      const current = items[i];
      if (path.some(p => p[0] === current[0])) continue; 
      path.push(current);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return results;
}

exports.generate = async (inputItems, comboLength) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const itemLabels = mapInputToItems(inputItems);

    const labelToId = {};
    for (const label of itemLabels) {
      try {
        const [rows] = await connection.query(
          `SELECT id FROM ${TABLES.ITEMS} WHERE ${COLUMNS.ITEMS.LABEL} = ?`,
          [label]
        );

        if (rows.length > 0) {
          labelToId[label] = rows[0].id;
        } else {
          const [result] = await connection.query(
            `INSERT INTO ${TABLES.ITEMS} (${COLUMNS.ITEMS.LABEL}) VALUES (?)`,
            [label]
          );
          labelToId[label] = result.insertId;
        }
      } catch (err) {
        throw new DatabaseError(`Error storing/retrieving item label '${label}': ${err.message}`);
      }
    }

    const combinations = generateValidCombinations(itemLabels, comboLength);

    for (const combo of combinations) {
      const itemIds = combo.map(label => labelToId[label]);

      try {
        await connection.query(
          `INSERT INTO ${TABLES.COMBINATIONS} (${COLUMNS.COMBINATIONS.ITEMS}) VALUES (?)`,
          [JSON.stringify(itemIds)]
        );
      } catch (err) {
        throw new DatabaseError(`Error inserting combination [${combo.join(', ')}]: ${err.message}`);
      }
    }

    const responseText = JSON.stringify(combinations);
    let responseResult;
    try {
      [responseResult] = await connection.query(
        `INSERT INTO ${TABLES.RESPONSES} (${COLUMNS.RESPONSES.RESPONSE_TEXT}, ${COLUMNS.RESPONSES.CREATED_AT}) VALUES (?, NOW())`,
        [responseText]
      );
    } catch (err) {
      throw new DatabaseError(`Error saving response: ${err.message}`);
    }

    await connection.commit();
    connection.release();

    return {
      id: responseResult.insertId,
      combination: combinations
    };
  } catch (err) {
    await connection.rollback();
    connection.release();

    if (err.name === 'DatabaseError') {
      throw err;
    }

    throw new DatabaseError(`Unexpected error during generation: ${err.message}`);
  }
};
