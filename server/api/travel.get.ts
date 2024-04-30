import * as fs from 'fs';
import { H3Event } from 'h3';

export default defineEventHandler((event: H3Event) => {
    return fs.readFileSync('./mocks/data.json', "utf8")
})
