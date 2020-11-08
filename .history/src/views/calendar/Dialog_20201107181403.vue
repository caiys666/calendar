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
    name: 'Dialog'
}
</script>

<style lang="scss" scoped>

</style>
