module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/hsTrainTime/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/color-variables.scss";
        `
      }
    }
  }
};
