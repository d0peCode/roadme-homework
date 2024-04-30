import * as fs from 'fs';
import type { H3Event } from 'h3';
import type { Travel } from '@/types/travel';

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    const mockDataPath = './mocks/data.json'
    const db = JSON
        .parse(fs.readFileSync(mockDataPath, "utf8"))
        .filter((e: Travel) => e.id !== body.id)
    fs.writeFileSync(mockDataPath, JSON.stringify(db))
    return db
})
