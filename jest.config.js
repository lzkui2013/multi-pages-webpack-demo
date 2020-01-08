module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        'src(.*)': '<rootDir>/src$1',
        '@/(.*)': '<rootDir>/src/$1',
        'methods(.*)': '<rootDir>/src/public/methods$1',
        'ajaxUrl': '<rootDir>/src/public/config/ajaxUrl.js'
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ]
};