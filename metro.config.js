const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const sentryConfig = getSentryExpoConfig(__dirname);

module.exports = sentryConfig;
