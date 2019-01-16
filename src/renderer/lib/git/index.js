import Requstable from './Requestable'

const token = 'f1e537810ab3fb85cf9b70ce72db07a28bf01acd'
const apiBase = 'https://api.github.com'
import C from '../constant'
import store from 'store'
class Api extends Requstable {
    constructor(token) {
        super({ token }, apiBase)
    }

    create(gist, cb) {
        return this._request('POST', '/gists', gist, cb)
    }

    /**
     * 获取所以gist
     */
    getAllGist() {
        return this._request('GET', `/gists`, null, null)
    }

    /**
     * 获取单个gist
     * @param {*} id
     * @param {*} cb
     */
    getSingleGist(id, cb) {
        return this._request('GET', `/gists/${id}`, null, cb)
    }

    /**
     * 删除gist
     * @param {*} id
     * @param {*} cb
     */
    delete(id, cb) {
        return this._request('DELETE', `/gists/${id}`, null, cb)
    }

    /**
     * 删除gist中的单个file
     * @param {*} id
     * @param {*} fileName
     * @param {*} cb
     */
    deleteFile(id, fileName, cb) {
        return this.update(id, { files: { [fileName]: null } }, cb)
    }

    /**
     * 更新gist
     * @param {*} id
     * @param {*} gist
     * @param {*} cb
     */
    update(id, gist, cb) {
        return this._request('PATCH', `/gists/${id}`, gist, cb)
    }

    /**
     * 获取用户信息
     */
    getUserProfile() {
        return this._request('GET', '/user', null, null)
    }
}

let apiInstance = () => {
    let token = store.get(C.TOKEN)
    if (!token) return
    if (Api.prototype.__instance) {
        return Api.prototype.__instance
    } else {
        let instance = new Api(token)
        Api.prototype.__instance = instance
        return instance
    }
}
export default apiInstance
