import * as fs from "fs";
import type { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);
    const mockDataPath = "./mocks/bookings.data.json";
    const db = JSON.parse(fs.readFileSync(mockDataPath, "utf8"));
    body.id = db.length + 2;
    db.unshift(body);
    fs.writeFileSync(mockDataPath, JSON.stringify(db));
    return db;
});
