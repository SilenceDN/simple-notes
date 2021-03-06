<style lang="less">
.v-note-wrapper {
    .v-note-op,
    .v-note-panel {
        border: 1px solid #fff !important;
    }
    .v-note-op {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .v-note-panel {
        border-top: none;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
    .v-show-content {
        padding: 25px !important;
    }
}
.markdown-body {
    font-size: 14px !important;
    pre {
        font-size: 100% !important;
        white-space: pre-wrap;
        word-break: normal;

        code {
            white-space: pre-wrap !important;
        }
    }
}
</style>


<template>
    <div>
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
        <mavon-editor
            v-model="value"
            ref="md"
            :ishljs="true"
            :editable="edit"
            :toolbarsFlag="edit"
            :toolbars="toolbar"
            :boxShadow="false"
            :subfield="false"
            @save="handleSave"
        />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { emit, on } from '@/lib/bus'
import C from '@/lib/constant'
export default {
    data () {
        return {
            edit: false,
            value: '',
            oldValue: '',
            loading: false,
            toolbar: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                // underline: true, // 下划线
                // strikethrough: true, // 中划线
                // mark: true, // 标记
                // superscript: true, // 上角标
                // subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                // imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                // readmodel: true, // 沉浸式阅读
                // htmlcode: true, // 展示html源码
                // help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                // navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                // subfield: true, // 单双栏模式
                preview: true, // 预览
            }
        }
    },
    computed: {
        ...mapState(['content', 'gist']),
        hasChanged () {
            return this.value != this.oldValue
        }
    },
    watch: {
        gist (value, old) {
            if (value != old) {
                this.controlHandle(false)
            }
        },
        content (val) {
            this.oldValue = this.value = val;
        },
        loading (val) {
            emit('sync', val)
        }
    },
    methods: {
        ...mapMutations(['updateContent']),
        controlHandle (flag) {
            this.edit = flag;
            //更新编辑器为预览状态
            this.$refs.md.s_preview_switch = !flag;
        },
        handleSave () {
            this.updateContent(this.value)
            this.loading = true;
            this.gist.save().then((res) => {
                this.oldValue = this.value;
                this.loading = false;
            }).catch(() => {
                this.$message.error("同步保存失败，请重试");
                this.loading = false;
            })
        }
    },
    mounted () {
        let md = this.$refs.md;
        md.s_preview_switch = true;

        on('newFile', (type) => {
            if (type == C.TYPE.ARTICLE) {
                this.$nextTick(() => this.controlHandle(true))
            }
        })
    }
}
</script>
