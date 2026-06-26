// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable require.context — required for Expo Router / Metro web bundler
config.transformer.unstable_allowRequireContext = true;

module.exports = config;
