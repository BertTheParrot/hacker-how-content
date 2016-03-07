import firebaseInitialisation from './core/firebaseInitialisation'
import {directoryTree} from 'directory-tree'
import path from 'path'
import appRoot from 'app-root-path'
import convertToFirebase from './convertToFirebase'
import config from './config'
import Firebase from 'firebase'
import git from 'git-rev-sync'


firebaseInitialisation()
  .then(() => {
    const gitRevision = git.short()
    console.log(`Git Revision ${gitRevision}`)
    const tree = directoryTree(path.join(appRoot.path, 'content'))
    console.log(JSON.stringify(tree))

    const programmeForFirebase = convertToFirebase(tree)
    console.log('\n\n\n')
    console.log(JSON.stringify(programmeForFirebase))

    const firebaseRef = new Firebase(`${config.firebaseUrl}/programmes`)
    console.log('Saving to firebase')
    return firebaseRef.update({currentVersion: gitRevision, [gitRevision]: programmeForFirebase})
  })
  .catch((error) => {
    console.log(error)
    process.exit(1);
  })
