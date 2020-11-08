<template>
<div class="dialog" v-show="showMask">
    <div class="dialog-container">
        <div class="dialog-title">{{title}}</div>
        <div class="content" v-html="content"></div>
        <div class="btns">
            <div v-if="type != 'confirm'" class="default-btn" @click="closeBtn">
                {{cancelText}}
            </div>
            <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
                {{dangerText}}
            </div>
            <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
                {{confirmText}}
            </div>
        </div>
        <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Dialog',
    props: {
        value: {},
        // 类型包括 defalut 默认， danger 危险， confirm 确认，
        type: {
            type: String,
            default: 'default'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        dangerText: {
            type: String,
            default: '删除'
        },
        confirmText: {
            type: String,

            default: '确认'
        },
    },
    data() {
        return {
            showMask: false,
        }
    },
    methods: {
        closeMask() {
            this.showMask = false;
        },
        closeBtn() {
            this.$emit('cancel');
            this.closeMask();
        },
        dangerBtn() {
            this.$emit('danger');
            this.closeMask();
        },
        confirmBtn() {
            this.$emit('confirm');
            this.closeMask();
        }
    },
    mounted() {
        this.showMask = this.value;
    },
    watch: {
        value(newVal, oldVal) {
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
