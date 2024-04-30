import * as fs from "fs";

export default defineEventHandler(() => {
    return JSON.parse(fs.readFileSync("./mocks/bookings.data.json", "utf8"));
});
