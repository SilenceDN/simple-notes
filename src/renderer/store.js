import Vue from 'vue'
import Vuex from 'vuex'
import { getCategoryList, getUserInfo } from './lib/data'
import C from './lib/constant'
import GistModel from './lib/gistModel'
import { splitContent } from './lib/util'
import store from 'store'
import uuidv1 from 'uuid/v1'
import { emit } from './lib/bus'
Vue.use(Vuex)

let defaultGist = new GistModel('', '', '', '')
defaultGist.type = C.TYPE.ARTICLE

export default new Vuex.Store({
    state: {
        loading: false,
        blur: false,
        avatarUrl: '',
        userName: '',
        type: C.TYPE.ARTICLE,
        title: '',
        content: '',
        gist: defaultGist,
        articleModelList: [],
        pinned: [],
        cheatSheetModleList: []
    },

    actions: {
        init({ commit }) {
            getCategoryList().then(([articles, cheatSheet]) => {
                let articleModelList = [],
                    cheatSheetModleList = []
                if (articles && articles.files) {
                    let id = articles.id
                    Object.keys(articles.files).forEach(fileName => {
                        let file = articles.files[fileName]
                        let { title, content } = splitContent(file.content)
                        let gm = new GistModel(id, title, content, fileName)
                        gm.type = C.TYPE.ARTICLE
                        articleModelList.push(gm)
                    })
                }
                if (cheatSheet && cheatSheet.files) {
                    let id = cheatSheet.id
                    Object.keys(cheatSheet.files).forEach(fileName => {
                        let file = cheatSheet.files[fileName]
                        let { title, content } = splitContent(file.content)
                        let gm = new GistModel(id, title, content, fileName)
                        gm.type = C.TYPE.CHEAT_SHEET
                        cheatSheetModleList.push(gm)
                    })
                }
                commit('init', {
                    articleModelList,
                    cheatSheetModleList
                })
            })
            getUserInfo(info => {
                commit('updateUserInfo', info)
            })
        }
    },

    mutations: {
        typeChange(state, type) {
            state.type = type
            state.gist = defaultGist
        },
        selectItem(state, item) {
            state.gist = item
            let { title, content, type } = item
            state.type = type
            state.title = title
            state.content = content
        },
        init(state, { articleModelList, cheatSheetModleList }) {
            state.articleModelList = articleModelList
            state.cheatSheetModleList = cheatSheetModleList
            state.loading = false
            state.blur = false
        },
        updateTitle(state, title) {
            state.gist.title = title
        },
        updateContent(state, content) {
            state.gist.content = content
        },
        updateUserInfo(state, { avatar, userName }) {
            state.avatarUrl = avatar
            state.userName = userName
        },
        changeBlur(state, flag) {
            state.blur = flag
        },
        changeLoading(state, flag) {
            state.loading = flag
        },
        createGist(state, type) {
            let key = {
                [C.TYPE.ARTICLE]: C.ARTICLE_KEY,
                [C.TYPE.CHEAT_SHEET]: C.CHEAT_SHEET_KEY
            }
            let id = store.get(key[type])
            let gist = new GistModel(id, '未命名标题', '', `${uuidv1()}.md`)
            gist.type = type
            state.gist = gist
            state.type = type
            state.title = gist.title
            state.content = gist.content
            ;(type == C.TYPE.ARTICLE
                ? state.articleModelList
                : state.cheatSheetModleList
            ).push(gist)
            emit('newFile', type)
        },
        deleteGist(state, { type, gist }) {
            let list =
                type == C.TYPE.ARTICLE
                    ? state.articleModelList
                    : state.cheatSheetModleList
            let i = list.indexOf(gist)
            if (i != -1) {
                let gist = list[i]
                if (state.gist == gist) {
                    state.gist = defaultGist
                    state.title = gist.title
                    state.content = gist.content
                }
                list.splice(i, 1)
            }
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})
