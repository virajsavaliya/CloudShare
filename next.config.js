// next.config.js
module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  experimental: {
    runtime: 'experimental-edge',
  },
    devIndicators: {
      autoPrerender: false,
    },
  };
