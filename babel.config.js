module.exports = function babel(api) {
  api.cache(true);

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['babel-plugin-styled-components']
  };
};