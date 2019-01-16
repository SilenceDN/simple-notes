import fs from 'fs'
import path from 'path'
import store from 'store'
import C from './constant'
import apiInstance from './git'
import { readMd, getPostContent } from './util'

//test
let api = apiInstance()

const isInit = async () => {
    console.log(api)
    return api.getAllGist().then(res => {
        return (
            res.data.filter(
                gist =>
                    gist.description == C.ARTICLE_DES ||
                    gist.description == C.CHEAT_SHEET_DES
            ).length == 2
        )
    })
}

async function initGist(cb) {
    let is = await isInit()
    let getInitialObj = (des, title, fileName) => {
        return {
            description: des,
            public: false,
            files: {
                'guide.md': {
                    content: getPostContent(
                        title,
                        readMd(path.join(__static, fileName))
                    )
                }
            }
        }
    }
    if (!store.get('init') && !is) {
        Promise.all([
            api.create(
                getInitialObj(
                    C.ARTICLE_DES,
                    '欢迎使用SimpleNotes-Article',
                    'article-guide.md'
                )
            ),
            api.create(
                getInitialObj(
                    C.CHEAT_SHEET_DES,
                    '欢迎使用SimpleNotes-CheatSheet',
                    'cheatsheet-guide.md'
                )
            )
        ]).then(() => {
            store.set('init', true)
            cb && cb()
        })
    } else {
        store.set('init', true)
        cb && cb()
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
        store.set(C.ARTICLE_KEY, articles.id)
        store.set(C.CHEAT_SHEET_KEY, cheatsheet.id)
        return Promise.all([
            api.getSingleGist(articles.id),
            api.getSingleGist(cheatsheet.id)
        ]).then(res => {
            return res.map(r => r.data)
        })
    })
}

function getUserInfo(cb) {
    return api.getUserProfile().then(res => {
        cb({ avatar: res.data.avatar_url, userName: res.data.login })
    })
}

function setToken(token) {
    store.set(C.TOKEN, token)
    api = apiInstance()
}
function getToken() {
    return store.get(C.TOKEN)
}

export { initGist, setToken, getToken, getCategoryList, getUserInfo }
