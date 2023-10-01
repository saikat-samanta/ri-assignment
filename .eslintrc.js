module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array",
      },
    ],
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-shadow": "off",
    "no-undef": "off",
    "no-console": "warn",
    "dot-notation": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/prefer-stateless-function": "error",
    "react/button-has-type": "error",
    "react/no-unused-prop-types": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-no-script-url": "error",
    "react/no-children-prop": "error",
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    "react/jsx-fragments": "error",
    "react/destructuring-assignment": ["error", "always", { destructureInSignature: "always" }],
    "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
    "react/jsx-max-depth": ["error", { max: 5 }],
    "react/jsx-key": [
      "error",
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    "react/jsx-no-useless-fragment": "warn",
    "react/jsx-curly-brace-presence": "warn",
    "react/no-typos": "warn",
    "react/display-name": "warn",
    "react/self-closing-comp": "warn",
    "react/jsx-sort-props": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off",
  },
};
