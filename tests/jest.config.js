export default {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(chai|chai-http)/)', // Transform chai and chai-http
    ],
  };
  