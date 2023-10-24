/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
}
const { i18n } = require('./next-i18next.config')

module.exports = {
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://panicky-trunks-dove.cyclic.app",
  },
  images: {
      domains: ['cdn.discordapp.com'],
  },
  i18n,
  
}
module.exports = nextConfig
