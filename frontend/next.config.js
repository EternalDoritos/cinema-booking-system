module.exports = {
  reactStrictMode: true,
  env: {
    apiKey: process.env.API_KEY,
  },
  serverRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
  },
  images: {
    domains: [
      "www.posterhub.com.sg",
      "www.cwfilms.jp",
      "sportshub.cbsistatic.com",
      "m.media-amazon.com",
      "i.ebayimg.com",
      "www.themoviedb.org",
      "i2.wp.com",
      "m.media-amazon.com",
      "assets-prd.ignimgs.com",
    ],
  },
};
