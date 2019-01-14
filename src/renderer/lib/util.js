import fs from 'fs'
/**
 * 返回用于gist存储的内容
 * @param {*} title 标题
 * @param {*} content 内容
 */
function getPostContent(title, content) {
    return `${title}\n${content}`
}

/**
 * 将gist存储的内容分割
 * @param {*} content
 */
function splitContent(content) {
    let [title, ...T] = content.split('\n')
    return {
        title,
        content: T.join('\n')
    }
}

function readMd(path) {
    return fs.readFileSync(path, 'utf-8')
}

export { getPostContent, splitContent, readMd }
