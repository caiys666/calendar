<template>
<div class="Calendar">
    <div class="header">
        <div class="header_left" @click="changeCheckDate('reduce')"></div>
        <div class="header_main">{{ showCheckDate }}</div>
        <div class="header_right" @click="changeCheckDate('add')"></div>
        <div class="click_button" @click="backToday">今天</div>
    </div>

    <div class="week">
        <div v-for="(item, index) in weekdays" :key="index">{{ item.label }}</div>
    </div>
    <div id="list" class="list">
        <div class="list_item" v-for=" (item, index) in daylist" :key="index" @mouseover="addClass(index)">
            <div :class="{itemtext,list_item_test:isactive === index ? true : false}"><span>{{ item.id }}</span></div>
            <div v-if="addClassTag  === index" @click="addDialog(index)" class="list_item_dialog">+</div>
            <div class="changeSchedule">
                <div v-for="(item, subindex) in  schduleListArray.flaglist[0]" :key="subindex" @click="changeSchedule(item)">
                    <span v-if="index === item.flagIndex">日程信息{{item.title}}</span>
                </div>
            </div>
        </div>
        <div v-if="show_dialog.status">
            <Dialog v-model="show_dialog.status" :indexes="show_dialog.index" type="confirm" title="新建日程" content="我是内容" @cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm" dangerText="Delete"></Dialog>
        </div>
    </div>
</div>
</template>

<script>
import {
    GetDate
} from "../../utils/getdate.js";
import Dialog from './Dialog.vue'
export default {
    components: {
        Dialog
    },
    data() {
        return {
            DateCalendar: {
                NowYear: "",
                NowMonth: "",
                NowDay: "",
                NowWeek: "",
                firstDay: "",
                lastDay: "",
                thisday: ""
            },
            show_dialog: {
                status: false,
                index: 0
            },
            showCheckDate: "",
            isactive: false,
            addClassTag: false,
            list_item: "list_item",
            itemtext: 'itemtext',
            list_item_test: 'list_item_test',
            schduleListArray: [],
            schduleList: "",
            weekdays: [{
                    label: "星期日",
                    value: 0,
                },
                {
                    label: "星期一",
                    value: 1,
                },
                {
                    label: "星期二",
                    value: 2,
                },
                {
                    label: "星期三",
                    value: 3,
                },
                {
                    label: "星期四",
                    value: 4,
                },
                {
                    label: "星期五",
                    value: 5,
                },
                {
                    label: "星期六",
                    value: 6,
                },
            ],
            day: [],
            daylist: [],
            monthList: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            thismonth: ""
        };
    },
    methods: {
        showDate() {
            let dateobj = GetDate();
            this.DateCalendar.NowYear = dateobj.year;
            this.DateCalendar.NowMonth = dateobj.month + 1;
            this.thismonth = this.DateCalendar.NowMonth;
            this.DateCalendar.thisday = dateobj.day;
            this.showCheckDate = `${this.DateCalendar.NowYear}年${this.DateCalendar.NowMonth}月`;
            this.changeShowDate(
                this.DateCalendar.NowYear,
                this.DateCalendar.NowMonth,
                this.DateCalendar.thisday = dateobj.day
            );
        },
        changeCheckDate(val) {
            this.isactive = -1;
            this.addClassTag = -1;
            if (val == "add") {
                this.DateCalendar.NowMonth++;
                if (this.DateCalendar.NowMonth > 12) {
                    this.DateCalendar.NowYear++;
                    this.DateCalendar.NowMonth = 1;
                }
            } else {
                this.DateCalendar.NowMonth--;
                if (this.DateCalendar.NowMonth < 1) {
                    this.DateCalendar.NowYear--;
                    this.DateCalendar.NowMonth = 12;
                }
            }
            this.showCheckDate = `${this.DateCalendar.NowYear}年${this.DateCalendar.NowMonth}月`;
            this.changeShowDate(
                this.DateCalendar.NowYear,
                this.DateCalendar.NowMonth,
                this.DateCalendar.thisday
            );
        },
        changeShowDate(year, month, thisday) {
            console.log(thisday)
            this.DateCalendar.firstDay = new Date(year, month - 1, 1);
            this.DateCalendar.lastDay = new Date(year, month, 0);
            let lastMonthday = new Date(year, month - 1, 0);
            let d = this.DateCalendar.firstDay.getDay();
            let ld = this.DateCalendar.lastDay.getDay();
            let totalday = this.DateCalendar.lastDay.getDate();
            let totallastday = this.DateCalendar.lastDay.getDate();
            console.log(totalday);
            // let totalday = d + this.DateCalendar.lastDay.getDate() + (6 - ld);
            this.day = [];
            this.daylist = []
            let nextMonthDays = this.getNextMonthdays(year, month);
            console.log(nextMonthDays);
            let PreLastDay = this.getPreMonthdays(year, month);
            console.log(PreLastDay.lastMothLastDay1);
            for (
                let i = 1, j = totallastday - PreLastDay.lastMoth; i <= nextMonthDays.nextMonthFirstDay1; i++, j++
            ) {
                this.day.push(j);
                this.daylist.push({
                    index: "lastmonth",
                    month: month,
                    id: j,
                    check: false
                })
            }
            for (let i = 0; i < totalday; i++) {
                this.day.push(i + 1);
                this.daylist.push({
                    index: "thismonth",
                    month: month,
                    id: i + 1,
                    check: false
                })
            }
            for (let i = 1; i <= 6 - PreLastDay.lastMothLastDay1; i++) {
                this.day.push(i);
                this.daylist.push({
                    index: "nextmonth",
                    month: month,
                    id: i,
                    check: false
                })
            }
            let this_index = this.searchKeys(thisday, this.daylist);
            this.changeIndex(this_index);
            console.log(this.daylist)
        },
        getPreMonthdays(year, month) {
            if (month == 1) {
                month = 12;
                year--;
            } else {
                month--;
            }
            let lastMothLastDay = new Date(year, month + 1, 0);
            let lastMoth = new Date(year, month, 0).getDay();

            let lastMothLastDay1 = lastMothLastDay.getDay();
            console.log(lastMothLastDay, lastMoth);
            return {
                lastMothLastDay,
                lastMothLastDay1,
                lastMoth,
                month,
                year,
            };
        },
        getNextMonthdays(year, month) {
            if (month == 12) {
                month = 1;
                year++;
            } else {
                month++;
            }
            let nextMonthFirstDay = new Date(year, month - 2, 1);
            let nextMonthFirstDay1 = nextMonthFirstDay.getDay();

            console.log(nextMonthFirstDay);
            return {
                nextMonthFirstDay,
                nextMonthFirstDay1,
                month,
                year,
            };
        },
        backToday() {
            this.showDate();
        },
        changeIndex(index) {
            this.isactive = index
        },
        addDialog(index) {
            console.log(index)
            this.show_dialog.status = true;
            this.show_dialog.index = index
            console.log(this.show_dialog.index)
            // this.isactive = index
        },
        addClass(index) {
            this.addClassTag = index
        },
        changeSchedule(item) {
            console.log(item)
        },
        searchKeys(thisday, daylist) {
            let result = [];
            for (let i = 0; i < daylist.length; i++) {
                if (thisday == daylist[i].id && daylist[i].index == 'thismonth' && daylist[i].month == this.thismonth) {
                    result.push(i);
                }
            }
            return result[0];
        },
        openMask(index) {
            this.show_dialog = true;
        },

        clickCancel() {
            console.log('点击了取消');
        },
        clickDanger() {
            console.log('这里是danger回调')
        },
        clickConfirm(data) {
            console.log('点击了confirm' + data.title);
            console.log(data)
            this.schduleList = data
            this.schduleListArray.push({
                flaglist: this.schduleList
            });
            console.log(this.schduleListArray)
        }
    },
    mounted() {
        this.showDate();
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
}

.header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    position: relative;
    margin-top: 10vh;

    .header_left {
        width: 100px;
        background-image: url("../../assets/icon/xiangyou1.png");
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
        background-image: url("../../assets/icon/arrow-left.png");
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
        height: 5vh;
        line-height: 3vh;
        font-size: 1.2vw;
        line-height: 5vh;
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
    width: auto;
    position: relative;
    justify-content: center;
    box-sizing: border-box;

    // .show_dialog {
    //     position: absolute;
    // }

    .list_item {
        position: relative;
        width: 12vw;
        height: 10vh;
        text-align: center;
        display: flex;
        border: 1px solid rgb(197, 197, 197);
        box-sizing: border-box;
        margin: 0 10px;

        .itemtext {
            width: 30px;
            height: 30px;
            position: absolute;
            text-align: center;
            right: 0;
            line-height: 30px;

        }

        .list_item_dialog {
            width: 20px;
            height: 20px;
            background-color: rgb(31, 226, 31);
            border: 1px solid;
            border-radius: 50%;
            color: rgb(250, 250, 250);
            font-size: 20px;
            line-height: 20px;
            position: absolute;
            left: 0;
        }

        .changeSchedule {
            position: absolute;
            top: 30px;
            width: 100%;
            height: 30px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            div {
                text-align: left;
            }
        }

        .list_item_test {
            width: 30px;
            height: 30px;
            border: 1px solid;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            background-color: #004aff;

            span {
                display: inline-block;
                color: white;
            }
        }
    }

    .list_item:hover {
        border: 1px solid #51a2ee;
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
