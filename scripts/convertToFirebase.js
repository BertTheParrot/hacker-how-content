/*eslint-disable no-use-before-define */

import _ from 'lodash'
import S from 'string'
import fileSystem from 'fs'
import markdownToHtml from './core/markdownConverter'

function sanitiseFileName(name) {
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
  return [[sanitiseFileName(fileNode.name)], {contents: filePathToHtml(fileNode.path)}]
}

export default function convertToFirebase(tree) {
  return reformatTree(tree)[1]
}

function filePathToHtml(filePath) {
  return markdownToHtml(fileSystem.readFileSync(`content/${filePath}`).toString())
}

export function freeToViewProgrammes(programmes, freeToViewProgrammePaths) {
  return _.reduce(freeToViewProgrammePaths, (programmesSoFar, path) => {
    if (_.has(programmes, path)) {
      return _.merge({...programmesSoFar}, _.set({}, path, _.get(programmes, path)))
    }
    return programmesSoFar
  }, {})
}
