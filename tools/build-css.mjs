import { execSync } from "child_process";

execSync("sass --no-source-map assets/scss/main.scss assets/css/style.css", {
  stdio: "inherit",
});
