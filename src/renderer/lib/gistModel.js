import uuid from 'uuid/v1'
import apiInstance from './git'
import * as util from './util'
export default class GistModel {
    id
    type
    _title
    _content
    fileName

    constructor(id, title, content, fileName) {
        this.id = id
        this._title = title
        this._content = content
        this.fileName = fileName
    }

    get title() {
        return this._title
    }

    get content() {
        return this._content
    }

    set title(title) {
        this._title = title
    }

    set content(content) {
        this._content = content
    }

    generateFileName() {
        this.fileName = uuid()
    }

    save() {
        let api = apiInstance()
        return api.update(this.id, {
            description: util.getDescription(this.type),
            files: {
                [this.fileName]: {
                    content: util.getPostContent(this.title, this.content)
                }
            }
        })
    }

    delete() {
        let api = apiInstance()
        api.deleteFile(this.id, this.fileName)
    }
}
