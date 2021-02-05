module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  return {
    pathPrefix:
      process.env.NODE_ENV === "production" ? "/textblock-tiler/" : "/",
    dir: {
      output: process.env.NODE_ENV === "production" ? "dist" : "_site",
    },
  };
};
