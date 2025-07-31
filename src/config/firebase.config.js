import admin from 'firebase-admin'

const serviceAccount = '../../fcm-project-ba073-firebase-adminsdk-fbsvc-e7301eefb7.json'

admin.initializeApp({

    credential: admin.credential.cert(serviceAccount)
})

const messeging = admin.messaging()

export default messeging