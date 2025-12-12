export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation only changes
        "style", // Changes that don't affect code meaning (white-space, formatting)
        "refactor", // Code change that neither fixes a bug nor adds a feature
        "perf", // Performance improvement
        "test", // Adding missing tests or correcting existing tests
        "chore", // Changes to build process or auxiliary tools
        "revert", // Reverts a previous commit
        "build", // Changes that affect build system or dependencies
        "ci", // Changes to CI configuration files and scripts
      ],
    ],
    "subject-case": [0], // Allow any case for subject
  },
};
