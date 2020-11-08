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
                <div v-for="(subitem, subindex) in schduleListArray" :key="subindex">
                    <span v-for="(ssubitem,ssindex) in subitem.flagList" @click="changeSchedule(ssubitem,subindex)">
                        <span :class="{changeItem,red:ssubitem.importance == 1? true : false,blue:ssubitem.importance == 2? true : false,green:ssubitem.importance == 3? true : false}" v-if="(index === ssubitem.flagIndex) &&
                        ssubitem.timestamp == subitem.test &&
                        subitem.schdulemonth == DateCalendar.NowMonth &&
                        subitem.schduleyear == DateCalendar.NowYear
                         ">{{ssubitem.title}}</span>
                    </span>
                </div>
            </div>
        </div>
        <div v-if="show_dialog.status">
            <Dialog v-model="show_dialog.status" :itemDialog="itemDialog" :indexes="show_dialog.index" :timestamp="show_dialog.timestamp" type="confirm" title="新建日程" content="我是内容" @cancel="clickCancel()" @danger="clickDanger()" @confirm="clickConfirm" dangerText="Delete"></Dialog>
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
            changeItem: 'changeItem',
            red: 'red',
            blue: 'blue',
            green: 'green',
            showCheckDate: "",
            isactive: false,
            addClassTag: false,
            list_item: "list_item",
            itemtext: 'itemtext',
            list_item_test: 'list_item_test',
            schduleListArray: [],
            schduleList: "",
            timestampList: [],
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
            thismonth: "",
            itemDialog: '',
            deleteIndex: ''
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
            // console.log(totalday);
            let totalday1 = d + totalday + (6 - ld);
            console.log(totalday1);
            this.timestampList = new Array(totalday1 - 1).fill(0);
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
            this.itemDialog = ""
            this.show_dialog.status = true;
            this.show_dialog.index = index;
            this.show_dialog.timestamp = (new Date()).getTime()
            this.timestampList.splice(index, 0, this.show_dialog.timestamp)
        },
        addClass(index) {
            this.addClassTag = index
        },
        changeSchedule(item, index) {
            this.show_dialog.status = true;
            this.itemDialog = item;
            this.deleteIndex = index;
            console.log(index)
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
            this.schduleListArray[this.deleteIndex] = [];
        },
        clickConfirm(data) {
            console.log('点击了confirm' + data.title);
            console.log(data)
            this.schduleList = data
            this.schduleListArray[this.deleteIndex] = [];
            this.schduleListArray.push({
                flagList: data,
                timeList: this.timestampList,
                test: this.show_dialog.timestamp,
                schduleyear: this.DateCalendar.NowYear,
                schdulemonth: this.DateCalendar.NowMonth
            });
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
    margin-top: 2vh;

    .header_left {
        width: 100px;
        background-image: url("../../assets/icon/xiangyou1.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position-x: center;
    }

    .header_main {
        width: 120px;
        line-height: 50px;
        font-size: 20px;
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
        width: 4vw;
        height: 4vh;
        line-height: 3vh;
        font-size: 20px;
        line-height: 4vh;
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
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 2vh;

    div {
        width: 12vw;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-image: linear-gradient(to top, #B8E2F7, #B3E1F7);
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

    .list_item {
        position: relative;
        width: 12vw;
        min-height: 12vh;
        text-align: center;
        display: flex;
        border: 1px solid rgb(145, 145, 145);
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
            cursor: pointer;
        }

        .changeSchedule {
            position: absolute;
            top: 30px;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            div {
                text-align: left;

                span {
                    .changeItem {
                        width: 100%;
                        background-color: white;
                        display: inline-block;
                        margin-top: 5px;
                        color: rgb(7, 7, 7);
                    }

                    .red {
                        background-color: rgb(243, 53, 53);
                    }

                    .blue {
                        background-color: rgb(243, 183, 53);
                    }

                    .green {
                        background-color: rgb(56, 250, 8);
                    }

                    .changeItem:hover {
                        cursor: pointer;
                    }
                }

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
    }

    .list_item::after {
        content: "你好";
        position: absolute;
        right: 0;
        display: none;
    }

}
</style>
