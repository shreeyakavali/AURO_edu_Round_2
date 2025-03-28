module.exports = {
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: 'commonjs' // Ensure this is set for Jest
    }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    // Add this plugin to transform ESM to CommonJS
    '@babel/plugin-transform-modules-commonjs'
  ],
  env: {
    test: {
      // Only apply these settings for test environment
      plugins: ['@babel/plugin-transform-modules-commonjs'],
      // Ensure node_modules (except react-markdown) are transformed
      ignore: [
        'node_modules/(?!(react-markdown|remark-parse|remark-gfm|etc)/)'
      ]
    }
  }
};