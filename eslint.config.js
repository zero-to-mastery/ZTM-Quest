import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        languageOptions: { globals: globals.browser },
        files: ['src/**/*.js'],
        ignores: ['.github/*', 'node_modules/*', 'public/*', 'dist/*'],
        rules: {
            'no-console': 'off',
            'no-unused-vars': [
                'error',
                {
                    vars: 'local',
                    args: 'none',
                    caughtErrors: 'all',
                    ignoreRestSiblings: false,
                    reportUsedIgnorePattern: false,
                },
            ],
            'no-undef': 'off',
            'no-prototype-builtins': 'off',
            'no-constant-condition': 'off',
            'no-async-promise-executor': 'off',
            'no-unsafe-optional-chaining': 'off',
            'no-unsafe-negation': 'off',
            'no-unsafe-regex': 'off',
            'no-unsafe-return': 'off',
            'no-unsafe-finally': 'off',
            'no-unsafe-assignment': 'off',
            'no-unsafe-member-access': 'off',
            'no-unsafe-call': 'off',
            'no-unsafe-argument': 'off',
            'no-unsafe-regular-expressions': 'off',
        },
    },
    pluginJs.configs.recommended,
];
