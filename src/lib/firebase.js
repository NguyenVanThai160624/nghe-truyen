import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID

if (messagingSenderId) {
  firebaseConfig.messagingSenderId = messagingSenderId
}

const isConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
)

let app = null
let auth = null
let db = null

if (isConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
}

export function isFirebaseConfigured() {
  return isConfigured
}

export function getFirebaseAuth() {
  return auth
}

export function getDb() {
  return db
}

export function getDataBackend() {
  return isConfigured ? 'firebase' : 'mock'
}
