import Vue from 'vue'
import Vuex from 'vuex'
import { getCategoryList, getAvatarUrl } from './lib/data'
import C from './lib/constant'
import GistModel from './lib/gistModel'
import { splitContent } from './lib/util'
Vue.use(Vuex)

let defaultGist = new GistModel('', '', '', '')
defaultGist.type = C.TYPE.ARTICLE

export default new Vuex.Store({
    state: {
        avatarUrl: '',
        gistId: null,
        type: C.TYPE.ARTICLE,
        title: '',
        content: '',
        gist: defaultGist,
        articleModelList: [],
        pinned: [],
        cheatSheetModleList: []
    },

    actions: {
        typeChange({ commit }, type) {
            commit('typeChange', type)
        },
        selectItem({ commit }, item) {
            commit('selectItem', item)
        },
        init(state, type) {
            getCategoryList().then(([articles, cheatSheet]) => {
                let id = articles.id
                let articleModelList = [],
                    cheatSheetModleList = []
                if (articles && articles.files) {
                    Object.keys(articles.files).forEach(fileName => {
                        let file = articles.files[fileName]
                        let { title, content } = splitContent(file.content)
                        let gm = new GistModel(id, title, content, fileName)
                        gm.type = C.TYPE.ARTICLE
                        articleModelList.push(gm)
                    })
                }
                if (cheatSheet && cheatSheet.files) {
                    Object.keys(cheatSheet.files).forEach(fileName => {
                        let file = cheatSheet.files[fileName]
                        let { title, content } = splitContent(file.content)
                        let gm = new GistModel(id, title, content, fileName)
                        gm.type = C.TYPE.CHEAT_SHEET
                        cheatSheetModleList.push(gm)
                    })
                }
                state.commit('init', {
                    articleModelList,
                    cheatSheetModleList
                })
            })
            getAvatarUrl(url => {
                state.avatarUrl = url
            })
        }
    },

    mutations: {
        typeChange(state, type) {
            state.type = type
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
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})
