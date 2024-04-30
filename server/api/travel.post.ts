import * as fs from 'fs';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    const mockDataPath = './mocks/data.json'
    const db = JSON.parse(fs.readFileSync(mockDataPath, "utf8"))
    body.id = db.length + 2
    db.push(body)
    fs.writeFileSync(mockDataPath, JSON.stringify(db))
    return db
})
