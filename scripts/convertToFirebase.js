/*eslint-disable no-use-before-define */

import _ from 'lodash'
import S from 'string'

function sanitiseName(name) {
  return S(name.toLowerCase()).replaceAll('.md', '')
}

function reformatTree(node) {
  if (node.type === 'directory') {
    return reformatDirectoryNode(node)
  }
  return reformatFileNode(node)
}

function reformatDirectoryNode(directoryNode) {
  return [[directoryNode.name], _.fromPairs(_.map(directoryNode.children, reformatTree))]
}

function reformatFileNode(fileNode) {
  return [[sanitiseName(fileNode.name)], {contents: fileNode.path}]
}

export default function convertToFirebase(tree) {
  return reformatTree(tree)[1]
}
