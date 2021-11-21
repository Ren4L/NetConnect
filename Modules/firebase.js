const serviceAccount = require('../netconnectv2-9fd5b-firebase-adminsdk-hw7qk-b8d2e74f0c.json')
const firebaseAd = require('firebase-admin');


const fbInstance = firebaseAd.initializeApp({
    credential: firebaseAd.credential.cert(serviceAccount),
    storageBucket: 'gs://netconnectv2-9fd5b.appspot.com/',
  })

module.exports = fbInstance;