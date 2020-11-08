<template>
<div class="Calendar">
    <div class="header">
        <div class="header_left" @click="changeCheckDate('reduce')"></div>
        <div class="header_main">{{showCheckDate}}</div>
        <div class="header_right" @click="changeCheckDate('add')"></div>
        <div class="click_button" @click="backToday">今天</div>
    </div>

    <div class="week">
        <div v-for="(item, index) in weekdays" :key="index">{{ item.label }}</div>
    </div>
    <div class="list">
        <div class="list_item" v-for="(item, index) in day" :key="index">
            <div>{{ item }}</div>
            <div class="list_item_dialog">123</div>
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
                    label: "星期日",
                    value: 0
                },
                {
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
            ],
            day: [],
            monthList: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        };
    },
    methods: {
        showDate() {
            let dateobj = GetDate();
            this.DateCalendar.NowYear = dateobj.year
            this.DateCalendar.NowMonth = dateobj.month + 1
            this.showCheckDate = `${this.DateCalendar.NowYear}年${this.DateCalendar.NowMonth}月`
            this.changeShowDate(this.DateCalendar.NowYear, this.DateCalendar.NowMonth)
        },
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
            let lastMonthday = new Date(year, month - 1, 0);
            let d = this.DateCalendar.firstDay.getDay();
            let ld = this.DateCalendar.lastDay.getDay();
            let totalday = this.DateCalendar.lastDay.getDate();
            let totallastday = this.DateCalendar.lastDay.getDate();
            console.log(totalday)
            // let totalday = d + this.DateCalendar.lastDay.getDate() + (6 - ld);
            this.day = [];
            let nextMonthDays = this.getNextMonthdays(year, month);
            console.log(nextMonthDays)
            let PreLastDay = this.getPreMonthdays(year, month);
            console.log(PreLastDay.lastMothLastDay1)
            for (let i = 1, j = totallastday - PreLastDay.lastMoth; i <= (nextMonthDays.nextMonthFirstDay1); i++, j++) {
                this.day.push(j);
            }
            for (let i = 0; i < totalday; i++) {
                this.day.push(i + 1);
            }
            for (let i = 1; i <= (6 - PreLastDay.lastMothLastDay1); i++) {
                this.day.push(i)
            }
            console.log(this.day)

        },
        getPreMonthdays(year, month) {
            if (month == 1) {
                month = 12;
                year--
            } else {
                month--
            }
            let lastMothLastDay = new Date(year, month + 1, 0)
            let lastMoth = new Date(year, month, 0).getDay();

            let lastMothLastDay1 = lastMothLastDay.getDay()
            console.log(lastMothLastDay, lastMoth)
            return {
                lastMothLastDay,
                lastMothLastDay1,
                lastMoth,
                month,
                year
            };
        },
        getNextMonthdays(year, month) {
            if (month == 12) {
                month = 1;
                year++
            } else {
                month++
            }
            let nextMonthFirstDay = new Date(year, month - 2, 1)
            let nextMonthFirstDay1 = nextMonthFirstDay.getDay();

            console.log(nextMonthFirstDay)
            return {
                nextMonthFirstDay,
                nextMonthFirstDay1,
                month,
                year
            };
        },
        backToday() {
            this.showDate()
        }
    },
    mounted() {
        this.showDate()
    },
};
</script>

<style lang="less" scoped>
.Calendar {
    width: 100%;
    height: 100%;
    display: flex;
    background-image: linear-gradient(to top, #fff1eb, #ace0f9);
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    position: relative;

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

    .click_button {
        width: 5vw;
        height: 3vh;
        line-height: 3vh;
        font-size: 1.2vw;
        background-color: rgb(239, 239, 240);
        border: 1px solid rgb(159, 159, 160);
        border-radius: 5px;
        position: absolute;
        right: 20%;
        top: 50%;
        transform: translateY(-50%);
    }

    .click_button:hover {
        cursor: pointer;
        border: 1px solid #47c479;
        color: #47c479;
    }
}

.week {
    margin-top: 5vh;
    display: flex;
    width: 100%;
    justify-content: center;

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
    justify-content: center;
    border: 1px solid red;

    .list_item {
        position: relative;
        width: 12vw;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background-color: white;
        display: flex;
        margin: 10px;

        div:nth-child(1) {
            width: 12vw;
            text-align: center;
        }
    }

    .list_item:hover {
        background-color: #959699;
        cursor: pointer;
    }

    .list_item_dialog {
        position: absolute;
        right: 0;
    }

    .list_item::after {
        content: "你好";
        position: absolute;
        right: 0;
        display: none;
    }

    .list_item:nth-child(2) {
        color: red;
    }
}
</style>
