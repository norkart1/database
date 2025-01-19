const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    // Your existing webpack configuration
    // For example:
    config.resolve.alias['@components'] = path.join(__dirname, 'components');

    return config;
  },
};
