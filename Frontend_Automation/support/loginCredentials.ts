import "dotenv/config";

const password = process.env["DEFAULT_PASSWORD"];

if (!password) {
  throw new Error("DEFAULT_PASSWORD is not set in the environment");
}

export const loginCredentials = {
  standardUser: {
    username: "standard_user",
    password: password,
  },
  lockedOutUser: {
    username: "locked_out_user",
    password: password,
  },
  problemUser: {
    username: "problem_user",
    password: password,
  },
  performanceGlitchUser: {
    username: "performance_glitch_user",
    password: password,
  },
  errorUser: {
    username: "error_user",
    password: password,
  },
  visualUser: {
    username: "visual_user",
    password: password,
  },
};
