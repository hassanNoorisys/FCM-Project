import admin from 'firebase-admin'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(__dirname, '../../fcm-project-8f5bd-firebase-adminsdk-fbsvc-299092604b.json')

const serviceAccount = fs.readFileSync(serviceAccountPath, 'utf-8')

admin.initializeApp({

    credential: admin.credential.cert(JSON.parse(serviceAccount))
})

const messeging = admin.messaging()


export default messeging