import fs from 'fs'
import path from 'path'
import store from 'store'
import C from './constant'
import Api from './git'
import { readMd, getPostContent } from './util'

//test
setToken('f1e537810ab3fb85cf9b70ce72db07a28bf01acd')

let api = Api(getToken())

const isInit = async () => {
    return api.getAllGist().then(res => {
        let flag =
            res.data.filter(
                gist =>
                    gist.description == C.ARTICLE_DES ||
                    gist.description == C.CHEAT_SHEET_DES
            ).length == 2
        if (flag) {
        }
    })
}

const initGist = async () => {
    let is = await isInit()
    if (!store.get('init') && !is) {
        api
            .create({
                description: C.ARTICLE_DES,
                public: false,
                files: {
                    guide: {
                        content: getPostContent(
                            '欢迎使用SimpleNotes-Article',
                            readMd(path.join(__static, 'article-guide.md'))
                        )
                    }
                }
            })
            .then(res => {
                store.set(C.ARTICLE_KEY, res.data.id)
            }),
            api
                .create({
                    description: C.CHEAT_SHEET_DES,
                    public: false,
                    files: {
                        guide: {
                            content: getPostContent(
                                '欢迎使用SimpleNotes-CheatSheet',
                                readMd(
                                    path.join(__static, 'cheatsheet-guide.md')
                                )
                            )
                        }
                    }
                })
                .then(res => {
                    store.set(C.CHEAT_SHEET_KEY, res.data.id)
                })
    }
}

/**
 * 获取分类列表（目前只有联网获取）
 */
function getCategoryList() {
    return api.getAllGist().then(res => {
        let articles, cheatsheet
        res.data.forEach(gist => {
            gist.description == C.ARTICLE_DES && (articles = gist)
            gist.description == C.CHEAT_SHEET_DES && (cheatsheet = gist)
        })

        return Promise.all([
            api.getSingleGist(articles.id),
            api.getSingleGist(cheatsheet.id)
        ]).then(res => {
            return res.map(r => r.data)
        })
    })
}
function getAvatarUrl() {
    return api.getUserProfile().then(res => {
        return res.data.avatar_url
    })
}

function setToken(token) {
    store.set(C.TOKEN, token)
}
function getToken() {
    return store.get(C.TOKEN)
}

export { initGist, setToken, getToken, getCategoryList, getAvatarUrl }
