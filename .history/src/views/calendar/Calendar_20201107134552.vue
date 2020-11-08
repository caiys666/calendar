<template>
<div>
    <div class="header">
        <div class="header_left" @click="changeCheckDate('reduce')"></div>
        <div class="header_main">{{showCheckDate}}</div>
        <div class="header_right" @click="changeCheckDate('add')"></div>
    </div>
    <div class="week">
        <div v-for="(item, index) in weekdays" :key="index">{{ item.label }}</div>
    </div>
    <div class="list">
        <div class="list_item" v-for="(item, index) in 42" :key="index">
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
            DateCalendar: {
                NowYear: "",
                NowMonth: "",
                NowDay: "",
                NowWeek: "",
                firstDay: "",
                lastDay: ""
            },
            showCheckDate: '',
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
                    value: 3
                },
                {
                    label: "星期四",
                    value: 4
                },
                {
                    label: "星期五",
                    value: 5
                },
                {
                    label: "星期六",
                    value: 6
                },
                {
                    label: "星期日",
                    value: 7
                },
            ],
            monthList: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        };
    },
    methods: {
        changeCheckDate(val) {
            if (val == 'add') {
                this.DateCalendar.NowMonth++;
                if (this.DateCalendar.NowMonth > 12) {
                    this.DateCalendar.NowYear++
                    this.DateCalendar.NowMonth = 1
                }
            } else {
                this.DateCalendar.NowMonth--;
                if (this.DateCalendar.NowMonth < 1) {
                    this.DateCalendar.NowYear--
                    this.DateCalendar.NowMonth = 12
                }
            }
            this.showCheckDate = `${this.DateCalendar.NowYear}年${this.DateCalendar.NowMonth}月`
            this.changeShowDate(this.DateCalendar.NowYear, this.DateCalendar.NowMonth)
        },
        changeShowDate(year, month) {
            this.DateCalendar.firstDay = new Date(year, month - 1, 1);
            this.DateCalendar.lastDay = new Date(year, month, 0);
            var dd = new Date(2020, 11, this.DateCalendar.firstDay);
            console.log(dd.getUTCDate())
            console.log(this.DateCalendar.firstDay, this.DateCalendar.lastDay)
        }
    },
    mounted() {
        let dateobj = GetDate();
        this.DateCalendar.NowYear = dateobj.year
        this.DateCalendar.NowMonth = dateobj.month + 1
        this.showCheckDate = `${this.DateCalendar.NowYear}年${this.DateCalendar.NowMonth}月`
        this.changeShowDate(this.DateCalendar.NowYear, this.DateCalendar.NowMonth)
    },
};
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;

    .header_left {
        width: 100px;
        background-image: url('../../assets/icon/xiangyou1.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position-x: center;
    }

    .header_main {
        width: 100px;
        line-height: 50px;
    }

    .header_right {
        width: 100px;
        background-image: url('../../assets/icon/arrow-left.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position-x: center;
    }

    .header_left:hover,
    .header_right:hover {
        cursor: pointer;
        background-color: rgb(221, 221, 221);
    }
}

.week {
    margin-top: 5vh;
    display: flex;
    width: 100%;

    div {
        width: 12vw;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: rgb(230, 229, 231);
        margin: 0 10px;
    }
}

.list {

    display: flex;
    flex-wrap: wrap;
    margin-top: 2vh;
    width: 100%;

    .list_item {
        position: relative;
        width: 12vw;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: white;
        margin: 10px;
    }

    .list_item:hover {
        background-color: #959699;
        cursor: pointer;
    }

    .list_item::after {
        content: "你好";
        position: absolute;
        right: 0;
        display: none;
    }
}
</style>
