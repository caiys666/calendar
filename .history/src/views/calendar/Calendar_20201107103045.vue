<template>
<div>
    <div class="week">
        <div v-for="(item, index) in weekdays" :key="index">{{ item.label }}</div>
    </div>
    <div class="list">
        <div class="list_item" v-for="(item, index) in monthList[0]" :key="index">
            {{ item }}
        </div>
    </div>
</div>
</template>

<script>
import {
    GetDate
} from "../../utils/getdate.js";
export default {
    data() {
        return {
            DateCalendar: "",
            weekdays: [{
                    label: "星期一",
                    value: 1
                },
                {
                    label: "星期二",
                    value: 2
                },
                {
                    label: "星期三",
                    value: 2
                },
                {
                    label: "星期四",
                    value: 2
                },
                {
                    label: "星期五",
                    value: 2
                },
                {
                    label: "星期六",
                    value: 2
                },
                {
                    label: "星期日",
                    value: 2
                },
                "",
                "",
                "",
                "",
                "",
            ],
            monthList: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        };
    },
    methods: {},
    mounted() {
        let dateobj = GetDate();
        console.log(dateobj.firstdd + dateobj.lastdd);
    },
};
</script>

<style lang="less" scoped>
.week {
    margin-top: 5vh;
    display: flex;
    width: 100%;

    div {
        width: 12vw;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-image: linear-gradient(to top, #fad0c4, #fad0c4);
        margin: 0 10px;
    }
}

.list {

    display: flex;
    flex-wrap: wrap;
    margin-top: 2vh;
    width: 100%;
    // justify-content: center;
    // align-items: center;

    .list_item {
        position: relative;
        width: 12vw;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-image: linear-gradient(to left, #cfd9df, #e2ebf0);
        margin: 10px;
    }

    .list_item::after {
        content: "你好";
        position: absolute;
        right: 0;
    }
}
</style>
