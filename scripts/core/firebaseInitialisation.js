import FirebaseTokenGenerator from 'firebase-token-generator'
import Firebase from 'firebase'
import config from '../config'
import uuid from 'node-uuid'

export default function firebaseInitialisation() {
  const tokenGenerator = new FirebaseTokenGenerator(config.firebaseSecret)
  const token = tokenGenerator.createToken({uid: `hackerHowNodeBackend${uuid.v4()}`})

  const ref = new Firebase(config.firebaseUrl)

  ref.authWithCustomToken(token, (error, authData) => {
    if (error) {
      console.log('Firebase Login Failed!', error)
    } else {
      console.log('Firebase Login Succeeded!', authData)
    }
  })
}
