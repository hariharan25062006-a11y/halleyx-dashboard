const dashboardModel = require('../models/dashboardModel');

const getConfig = async (req, res, next) => {
  try {
    const config = await dashboardModel.getConfig();
    if (!config) {
      return res.json({ config_json: [], date_filter: 'all' });
    }
    res.json({
      config_json: typeof config.config_json === 'string' ? JSON.parse(config.config_json) : config.config_json,
      date_filter: config.date_filter,
    });
  } catch (err) {
    next(err);
  }
};

const saveConfig = async (req, res, next) => {
  try {
    const { config_json, date_filter } = req.body;
    await dashboardModel.saveConfig(config_json, date_filter);
    res.json({ message: 'Dashboard config saved successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getConfig, saveConfig };
