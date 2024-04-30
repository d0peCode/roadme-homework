import * as fs from "fs";

export default defineEventHandler(() => {
  return JSON.parse(fs.readFileSync("./mocks/travels.data.json", "utf8"));
});
