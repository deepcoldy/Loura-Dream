module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 75,
      unitPrecision: 5,
      propWhiteList: [
        'font', 'font-size', 'line-height', 'letter-spacing', 'min-height',
        'height', 'width', 'max-width', 'padding', 'margin',
        'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'left', 'right', 'top', 'bottom', 'max-height', 'border-top', 'border-left', 'border-top-left-radius', 'border-bottom-left-radius'],
      selectorBlackList: ['mint'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
};