const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
  watchman: false, // Make sure this line is included to use watchman
  // watchFolders: [
  //   // List the folders you want Metro to watch, for example:
  //   '/node_modules',
  //   '/src',
  // ],
};

module.exports = mergeConfig(defaultConfig, config);
