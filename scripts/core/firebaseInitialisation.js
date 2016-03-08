import FirebaseTokenGenerator from 'firebase-token-generator'
import Firebase from 'firebase'
import config from '../config'
import uuid from 'node-uuid'

export default function firebaseInitialisation() {
  const tokenGenerator = new FirebaseTokenGenerator(config.firebaseSecret)
  const token = tokenGenerator.createToken({uid: `hackerHowContent${uuid.v4()}`}, {admin: true})

  const ref = new Firebase(config.firebaseUrl)

  return ref.authWithCustomToken(token)
    .then(() => console.log('Firebase login successed'))
    .catch((error) => console.log('Firebase Login Failed!', error))
}
