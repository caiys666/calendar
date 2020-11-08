<template>
<div class="dialog" v-show="showMask">
    <div id="dialog" class="dialog-container">
        <div class="dialog-title">{{ title }}</div>
        <!--<div class="content" v-html="content"></div>-->
        <div class="title">
            <div class="titleItem">
                <label></label>
                <input type="text" placeholder="添加日程标题" v-model="inputTitle" />
            </div>
        </div>
        <div class="select">
            <div class="labelItem">
                <label></label>
                <select class="selectItem" v-model="defaultSelect">
                    <option v-for="(item, index) in schedulelist" :key="index" :value="item.id">{{ item.title }}</option>
                    <div>44</div>
                </select>
            </div>
        </div>
        <div class="Content">
            <div class="ContentItem">
                <label for=""></label>
                <textarea name="" id="" cols="30" rows="10" v-model="textContent"></textarea>
            </div>
        </div>
        <div class="time">
            <div class="timeItem">
                <label for=""></label>
                <span>{{time}}</span>
            </div>
        </div>
        <div class="btns">
            <div v-if="type == 'confirm'" class="default-btn" @click="closeBtn">
                {{ cancelText }}
            </div>
            <div v-if="dangerStatus" class="danger-btn" @click="dangerBtn">
                {{ dangerText }}
            </div>
            <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
                {{ confirmText }}
            </div>
        </div>
        <div class="close-btn" @click="closeMask">
            <div class="cancleIcon"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Dialog",
    props: {
        value: {},
        // 类型包括 defalut 默认， danger 危险， confirm 确认，
        type: {
            type: String,
            default: "default",
        },
        indexes: {
            type: Number,
        },
        itemDialog: {},
        timestamp: {
            type: Number,
        },
        content: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        cancelText: {
            type: String,
            default: "取消",
        },
        dangerText: {
            type: String,
            default: "删除",
        },
        confirmText: {
            type: String,
            default: "确认",
        },
    },
    data() {
        return {
            showMask: false,
            schedulelist: [{
                    title: "紧急",
                    id: 1,
                },
                {
                    title: "重要",
                    id: 2,
                },
                {
                    title: "一般",
                    id: 3,
                },
                {
                    title: "Noway",
                    id: 4,
                },
            ],
            defaultSelect: "",
            inputTitle: "",
            textContent: "",
            dialogContent: [],
            dangerStatus: false,
            time: ''
        };
    },
    methods: {
        closeMask() {
            this.showMask = false;
        },
        closeBtn() {
            this.$emit("cancel");
            this.closeMask();
        },
        dangerBtn() {
            this.$emit("danger");
            this.closeMask();
        },
        confirmBtn() {
            this.dialogContent.push({
                title: this.inputTitle,
                importance: this.defaultSelect,
                substance: this.textContent,
                flagIndex: this.indexes,
            });
            // var data = this.dialogContent
            var data = [{
                title: this.inputTitle,
                importance: this.defaultSelect,
                substance: this.textContent,
                flagIndex: this.indexes,
                timestamp: this.timestamp,
            }, ];
            console.log(this.dialogContent);
            this.$emit("confirm", data);
            this.defaultSelect = 3;
            this.inputTitle = "";
            this.textContent = "";
            this.closeMask();
        },
    },
    mounted() {
        this.showMask = this.value;
        if (this.itemDialog !== "") {
            this.dangerStatus = true;
            this.inputTitle = this.itemDialog.title;
            this.defaultSelect = this.itemDialog.importance;
            this.textContent = this.itemDialog.substance;
            // this.timestamp = this.itemDialog.timestamp;
        } else {
            this.defaultSelect = this.schedulelist[2].id;
        }
        this.time = new Date(this.timestamp);
        this.time = this.time.toDateString();
        console.log(this.itemDialog);
    },
    watch: {
        value(newVal, oldVal) {
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit("input", val);
        },
        defaultSelect(newVal, oldVal) {
            if (newVal == "1") {
                dialog.style.background = "rgb(243, 53, 53)";
            } else if (newVal == "2") {
                dialog.style.background = "rgb(243, 183, 53)";
            } else if (newVal == "3") {
                dialog.style.background = "rgb(56, 250, 8)";
            } else {
                dialog.style.background = "white";
            }
            console.log(newVal, oldVal);
        },
    },
};
</script>

<style lang="less" scoped>
.dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;

    .dialog-container {
        width: 35%;
        height: 500px;
        background: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 8px;
        position: relative;

        .dialog-title {
            width: 100%;
            height: 60px;
            font-size: 18px;
            color: #696969;
            font-weight: 600;
            padding: 16px 50px 0 20px;
            box-sizing: border-box;
        }

        .content {
            color: #797979;
            line-height: 26px;
            padding: 0 20px;
            box-sizing: border-box;
        }

        .title {
            width: 80%;
            margin-left: 10%;

            .titleItem {
                width: 80%;
                height: 30px;
                margin-left: 10%;
                text-align: left;
                display: flex;

                label {
                    text-align: left;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background-image: url("../../assets/icon/schedule.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                }

                input {
                    padding: 0;
                    outline: none;
                    border: none;
                    flex: 1;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgb(170, 168, 168);
                    display: inline-block;
                    height: 30px;
                    font-size: 0.9vw;
                    margin: 0 0 10px 20px;
                    padding-left: 10px;
                }
            }
        }

        .select {
            margin-top: 30px;
            width: 80%;
            margin-left: 10%;

            .labelItem {
                width: 80%;
                display: flex;
                margin-left: 10%;

                label {
                    text-align: left;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    line-height: 5vh;
                    margin-top: 5px;
                    background-image: url("../../assets/icon/important.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                }

                .selectItem {
                    box-sizing: border-box;
                    display: inline-block;
                    flex: 1;
                    width: 80%;
                    height: 5vh;
                    font-size: 0.9vw;
                    margin: 0 0 10px 20px;
                    padding-left: 10px;
                    display: flex;

                    option {
                        display: inline-block;
                        line-height: 30px;
                    }
                }
            }
        }

        .Content {
            width: 80%;
            margin-left: 10%;
            margin-top: 30px;

            .ContentItem {
                display: flex;
                width: 80%;
                margin-left: 10%;

                label {
                    text-align: left;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background-image: url("../../assets/icon/content.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                }

                textarea {
                    padding: 0;
                    outline: none;
                    flex: 1;
                    box-sizing: border-box;
                    border-bottom: 1px solid rgb(170, 168, 168);
                    display: inline-block;
                    font-size: 0.9vw;
                    margin: 0 0 10px 20px;
                    padding-left: 10px;
                }
            }
        }

        .time {
            width: 80%;
            margin-left: 10%;
            margin-top: 30px;

            .timeItem {
                display: flex;
                width: 80%;
                margin-left: 10%;

                label {
                    text-align: left;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background-image: url("../../assets/icon/content.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                }

                span {
                    line-height: 30px;
                    padding-left: 20px;

                }
            }
        }

        .inp {
            margin: 10px 0 0 20px;
            width: 200px;
            height: 40px;
            padding-left: 4px;
            border-radius: 4px;
            border: none;
            background: #efefef;
            outline: none;

            &:focus {
                border: 1px solid #509ee3;
            }
        }

        .btns {
            width: 100%;
            height: 60px;
            // line-height: 60px;
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: right;
            padding: 0 16px;
            box-sizing: border-box;

            &>div {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                padding: 0 14px;
                color: #ffffff;
                background: #f1f1f1;
                border-radius: 8px;
                margin-right: 12px;
                cursor: pointer;
            }

            .default-btn {
                color: #787878;

                &:hover {
                    color: #509ee3;
                }
            }

            .danger-btn {
                background: #ef8c8c;

                &:hover {
                    background: rgb(224, 135, 135);
                }

                &:active {
                    background: #ef8c8c;
                }
            }

            .confirm-btn {
                color: #ffffff;
                background: #509ee3;

                &:hover {
                    background: #6fb0eb;
                }
            }
        }

        .close-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;

            .cancleIcon {
                width: 20px;
                height: 20px;
                background-image: url("../../assets/icon/cancle.png");
                background-size: contain;
                background-repeat: no-repeat;
            }

            &:hover {
                font-weight: 600;
            }
        }
    }
}
</style>
