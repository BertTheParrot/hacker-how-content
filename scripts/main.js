import firebaseInitialisation from './core/firebaseInitialisation'
import {directoryTree} from 'directory-tree'
import path from 'path'
import appRoot from 'app-root-path'
import convertToFirebase, {freeToViewProgrammes} from './convertToFirebase'
import config from './config'
import freeToViewProgrammePaths from './freeToViewProgrammePaths'
import Firebase from 'firebase'
import git from 'git-rev-sync'

firebaseInitialisation()
  .then(() => {
    const gitRevision = git.short()
    console.log(`Git Revision ${gitRevision}`)
    const tree = directoryTree(path.join(appRoot.path, 'content'))
    console.log(JSON.stringify(tree))

    const programmesForFirebase = convertToFirebase(tree)
    const freeProgrammesForFirebase = freeToViewProgrammes(programmesForFirebase, freeToViewProgrammePaths)

    console.log('\n\n\n')
    console.log(JSON.stringify(programmesForFirebase))
    console.log('\n\n\n Free Programmes \n')
    console.log(JSON.stringify(freeProgrammesForFirebase))

    const firebaseRef = new Firebase(config.firebaseUrl)
    console.log('Saving to firebase')
    return Promise.all([
      firebaseRef.update({currentProgrammeVersion: gitRevision}),
      firebaseRef.child('programmes').update({[gitRevision]: programmesForFirebase}),
      firebaseRef.child('freeProgrammes').update({[gitRevision]: freeProgrammesForFirebase})
    ])
  })
  .then(() => {
    console.log('Done')
    process.exit()
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
