const db = require('../config/db');

const getConfig = async () => {
  const [rows] = await db.execute('SELECT * FROM dashboard_config WHERE id = 1');
  return rows[0];
};

const saveConfig = async (config_json, date_filter) => {
  const jsonPayload = typeof config_json === 'string' ? config_json : JSON.stringify(config_json);
  
  const [existing] = await db.execute('SELECT id FROM dashboard_config WHERE id = 1');
  if (existing.length === 0) {
    const [result] = await db.execute(
      'INSERT INTO dashboard_config (id, config_json, date_filter) VALUES (1, ?, ?)',
      [jsonPayload, date_filter || 'all']
    );
    return result;
  }
  const [result] = await db.execute(
    'UPDATE dashboard_config SET config_json = ?, date_filter = ?, updated_at = NOW() WHERE id = 1',
    [jsonPayload, date_filter || 'all']
  );
  return result;
};

module.exports = { getConfig, saveConfig };
