const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const ESLintPlugin = require('eslint-webpack-plugin');
const withImages = require('next-images');

const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    API_URL: process.env.API_URL,
  },

  i18n,

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },

  webpack: (config) => {
    // config.resolve.fallback = {
    //   ...config.resolve.fallback,
    //   fs: false,
    // };

    config.plugins.push(
      new ESLintPlugin({
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        failOnError: true,
        failOnWarning: false,
        emitWarning: true,
        emitError: true,
        exclude: ['node_modules/**', '.next/**', 'dist/**', 'build/**', '.out/**'],
      })
    );

    return config;
  },
};

module.exports = () => {
  const plugins = [withBundleAnalyzer, withImages];

  return plugins.reduce((acc, next) => {
    if (next.name === 'withSentryConfig') {
      return next(acc, { silent: true });
    }

    return next(acc);
  }, nextConfig);
};
