const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 🛠️ Workaround para evitar errores con stream/ws en Supabase
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
