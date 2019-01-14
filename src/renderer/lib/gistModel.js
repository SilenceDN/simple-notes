import uuid from 'uuid/v1'
import Api from './git'
import * as util from './util'
const api = Api()
export default class GistModel {
    id
    type
    title
    content
    fileName

    constructor(id, title, content, fileName) {
        this.id = id
        this.title = title
        this.content = content
        this.fileName = fileName
    }

    generateFileName() {
        this.fileName = uuid()
    }

    save() {
        api.update(this.id, {
            files: {
                [this.fileName]: util.getPostContent(this.title, this.content)
            }
        })
    }

    delete() {
        api.deleteFile(this.id, this.fileName)
    }
}
