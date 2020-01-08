// 对于vue中的规则如果有不明白的，可以访问：https://github.com/vuejs/eslint-plugin-vue/tree/master/docs/rules
module.exports = {
    plugins: [
        'vue'
    ],
    env: {
        'browser': true,
        'node': true,
        'es6': true,
    },
    parserOptions: {
        'parser': 'babel-eslint',
        'ecmaVersion':6,
        'sourceType':'module',
        'ecmaFeatures':{'jsx':true,'modules':true}
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    rules: {
        'no-var': 'error', // 不使用var，而应该使用let, const
        'no-unused-vars': 'off', // 关闭已定义，但未使用的提示
        'quotes': [2, 'single'], // 必须使用单引号
        'semi': [2, 'always'],//语句强制分号结尾
        'operator-linebreak': [2, 'before'],//换行时运算符在行尾还是行首
        'padded-blocks': 0,//块语句内行首行尾是否要空行
        'space-before-function-paren': [2, 'always'],//函数定义时括号前面要不要有空格
        // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        'array-bracket-spacing': [2, 'always'],
        // 'camelcase': 2,// 双峰驼命名格式
        'no-console': 'off',
        'callback-return': 1,//避免多次调用回调什么的
        // 'eqeqeq': 2,//必须使用全等
        'no-else-return': 2, //在else代码块中return，else是多余的
        'no-multi-spaces': 2, //不允许多个空格
        'space-infix-ops': 2, //操作符前后空格
        'indent': ['error', 4], // 缩进，最后一个参数是用于设置switch的缩进，默认缩进有些问题
        // 'indent': 'off', // 缩进，最后一个参数是用于设置switch的缩进，默认缩进有些问题
        'vue/script-indent': ['error', 4, {
            'baseIndent': 1,
            'switchCase': 1
        }],
        'vue/html-indent': ['error', 4, {
            'baseIndent': 1
        }],
        'vue/max-attributes-per-line': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/mustache-interpolation-spacing': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'array-bracket-spacing': ['error', 'never'], // 数组首位空格
    },
    overrides: [
        {
          'files': ['*.vue'],
          'rules': {
            'indent': 'off'
          }
        }
      ]
};
