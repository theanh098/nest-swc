module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-import-helpers",
    "@cspell"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    commonjs: true,
    browser: false
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "require-await": ["warn"],
    "no-return-await": ["warn"],
    "no-loss-of-precision": "off",
    "@typescript-eslint/await-thenable": ["warn"],
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-loss-of-precision": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@cspell/spellchecker": [
      "error",
      { customWordListFile: "./cspell-custom.txt" }
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          "module",
          ["/^@shared/", "/^~/"],
          ["parent", "sibling", "type"]
        ],
        alphabetize: {
          order: "asc",
          ignoreCase: true
        }
      }
    ]
  }
};
