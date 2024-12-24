module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.js$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        'node_modules/(?!@vue/test-utils)',
    ],
};
