module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ["plugin:react/recommended", "eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["react", "prettier"],
    rules: {
        semi: "off",
        "react/prop-types": "off",
        "react/jsx-no-target-blank": "off",
        "react/jsx-no-comment-textnodes": "off",
        "react/react-in-jsx-scope": "off",
    },
}
