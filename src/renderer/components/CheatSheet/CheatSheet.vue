<style lang="less">
@import url("./sheet.css");
@import url("./index.less");
</style>

<template>
    <section class="cheat-sheet-wraper">
        <div class="control-bar">
            <a-button-group>
                <a-button size="small" icon="edit" type="dashed" @click="controlHandle(true)"></a-button>
                <a-button
                    size="small"
                    icon="save"
                    type="dashed"
                    v-if="hasChanged"
                    @click="handleSave"
                    :loading="loading"
                ></a-button>
                <a-button size="small" icon="eye" type="dashed" @click="controlHandle(false)"></a-button>
            </a-button-group>
        </div>
        <textarea
            v-show="editMode"
            ref="editor"
            :class="{'code-input-focus':editMode}"
            class="code-input"
            v-model="markdown"
        ></textarea>
        <article v-show="!editMode" ref="preview"></article>
    </section>
</template>

<script>
import wrapify from './lib/wrapify'
import { parseHtml } from './lib/dom'
import HyperDown from './lib/hyperdown'
import hljs from 'mavon-editor/dist/highlightjs/highlight.min.js'
import fs from 'fs';
import path from 'path';
import { mapState, mapMutations } from 'vuex';
import { emit } from '@/lib/bus';
import ClipboardJS from 'clipboard';
import { htmlButton, getSiteStyle } from './lib/util';
export default {
    data () {
        return {
            parser: new HyperDown(),
            editMode: false,
            markdown: '',
            oldValue: '',
            html: '',
            loading: false
        }
    },
    computed: {
        ...mapState(['content', 'gist']),
        hasChanged () {
            return this.markdown != this.oldValue
        }
    },
    watch: {
        content (val) {
            this.oldValue = this.markdown = val;
            this.renderMd()
        },
        loading (val) {
            emit('sync', val)
        }
    },
    methods: {
        ...mapMutations(['updateContent']),
        controlHandle (flag) {
            this.editMode = flag;
            if (!flag) {
                this.renderMd()
            }
        },
        renderMd () {
            let md = `<div>${this.parser.makeHtml(this.markdown)}</div>`
            let parsed = parseHtml(md);
            wrapify(parsed[0])
            this.$nextTick(() => {
                this.$refs.preview.innerHTML = ''
                this.$refs.preview.appendChild(parsed[0]);
                let nodes = document.querySelectorAll('pre code');
                nodes.forEach((block) => {
                    hljs.highlightBlock(block);
                })
                this.renderCopy()
            })
        },
        renderCopy () {
            const siteStyle = getSiteStyle();
            // Scan for code snippets and append buttons
            const snippets = document.querySelectorAll('.cheat-sheet-wraper pre');
            snippets.forEach((snippet) => {
                const parent = snippet.parentNode;
                const wrapper = document.createElement('div');
                parent.replaceChild(wrapper, snippet);
                wrapper.appendChild(snippet);
                wrapper.classList.add('codecopy', `codecopy-${siteStyle}`);
                wrapper.firstChild.insertAdjacentHTML('beforebegin', htmlButton);
            });

            // Add copy to clipboard functionality and user feedback
            const clipboard = new ClipboardJS('.codecopy-btn', {
                target: (trigger) => {
                    return trigger.parentNode;
                }
            });
            clipboard.on('success', (e) => {
                e.trigger.setAttribute('aria-label', 'Copied!');
                e.clearSelection();
            });
            // Replace tooltip message when mouse leaves button
            // and prevent page refresh after click button
            const btns = document.querySelectorAll('.codecopy-btn');
            btns.forEach((btn) => {
                btn.addEventListener('mouseleave', (e) => {
                    e.target.setAttribute('aria-label', 'Copy to clipboard');
                    e.target.blur();
                });
                btn.addEventListener('click', (e) => {
                    e.preventDefault()
                });
            });

        },
        handleSave () {
            this.loading = true
            this.updateContent(this.markdown)
            this.gist.save().then((res) => {
                this.oldValue = this.markdown;
                this.loading = false;
            }).catch(() => {
                this.$message.error("同步保存失败，请重试")
                this.loading = false;
            })
        }
    },
    mounted () {
        this.$refs.editor.addEventListener('keydown', function (e) {
            if (e.keyCode == 9) {
                e.preventDefault();
                var indent = '    ';
                var start = this.selectionStart;
                var end = this.selectionEnd;
                var selected = window.getSelection().toString();
                selected = indent + selected.replace(/\n/g, '\n' + indent);
                this.value = this.value.substring(0, start) + selected
                    + this.value.substring(end);
                this.setSelectionRange(start + indent.length, start
                    + selected.length);
            }
        })
    }
}
</script>
