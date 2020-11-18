<template>
    <div class="calender-modal-container">
        <div class="calender-modal-wrapper"></div>
        <div class="calender-modal">
            <div class="calender-modal-left">
                <div class="calender-today-title">Wednesday</div>
                <div class="calender-modal-left-bottom">
                    <div class="perform-title">
                        <span>good</span>
                        <hr />
                    </div>
                    <ul>
                        <li>-코딩하기</li>
                        <li>-밥먹기</li>
                        <li>-캘린더 다 만들기</li>
                    </ul>
                </div>
            </div>
            <div class="calender-modal-right">
                <div class="calender-current-year">
                    <i class="fas fa-angle-left" v-on:click="prevBtnHandler"></i>
                    <span>{{ `${currentYear}.${currentMonth}` }}</span>
                    <i class="fas fa-angle-right" v-on:click="nextBtnHandler"></i>
                </div>
                <table>
                    <th v-for="day in days" v-bind:key="day">{{ day }}</th>
                    <tr v-for="(week, index) in nowMonthDays" v-bind:key="index">
                        <td
                            v-for="(date, index) in week"
                            v-bind:key="index"
                            v-bind:class="[{ sat: date.sat }, { sun: date.sun }, { today: date.today }]"
                            v-on:click="dateClickHandler(index)"
                        >
                            {{ date.day }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        const allDate = new Date(); //현재 날짜 가져오기
        this.currentYear = allDate.getFullYear();
        this.currentMonth = allDate.getMonth() + 1;
        this.currentDay = allDate.getDate(); //
        //next,prev 연산할때 -는 형변환이 일어나지만 +는 합쳐지기 때문에 creaction중에 넘버형으로 바꾼다.
        this.getLeapYear();
        this.getCalender(); //현재 달의 2차원 배열 캘린더 v-for로 돌림
    },
    data() {
        return {
            days: ["일", "월", "화", "수", "목", "금", "토"],
            leapYear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //윤년
            normalYear: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //평년
            currentYear: 0,
            currentMonth: 0,
            currentDay: 0,
            isLeap: false,
            nowMonthDays: [],
        };
    },
    computed: {
        nowDays() {
            if (this.isLeap) {
                //현재월이 몇일이나 되는지 계산해서 가져온다.
                return this.leapYear[this.currentMonth - 1];
            } else {
                return this.normalYear[this.currentMonth - 1];
            }
        },
        computedNowFirstDay() {
            //현재 달의 첫번째 날을 계산한다.
            return new Date(this.currentYear, this.currentMonth - 1, 1).getDay(); //이번달의 첫번째 날 (인덱스로 계산하기 때문에 달에서 1 빼고 계산)
        },
    },
    methods: {
        nextBtnHandler() {
            if (this.currentMonth === 12) {
                this.currentMonth = 1; // 12월은 끝달이므로 1월로 초기화
                this.currentYear += 1; // 년도는 1 추가
                this.getLeapYear(); //윤년 계산
                this.getCalender();
            } else {
                this.currentMonth += 1;
                this.getCalender();
            }
        },
        prevBtnHandler() {
            if (this.currentMonth === 1) {
                this.currentMonth = 12; // 1월은 초달이므로 12월 할당
                this.currentYear -= 1; // 년도는 1 감소
                this.getLeapYear();
                this.getCalender();
            } else {
                this.currentMonth -= 1;
                this.getCalender();
            }
        },
        dateClickHandler(index) {
            //날짜 알아내기
            console.log(index);
        },
        getCalender() {
            const { computedNowFirstDay, nowDays } = this;
            let days = []; //주에 대한 배열
            let arr = []; //주의 날짜의 배열 (2차원)
            let day = 1; //i대신 이 변수로 돌린다.
            for (let i = 1; i <= nowDays + computedNowFirstDay; i++) {
                //i가 첫번째 날보다 커졌을때 부터 넣기 시작하므로 맞춰주기 위해 그만큼 더해줘야한다.
                if (i <= computedNowFirstDay) {
                    //현재 날짜 인덱스로 0부터 시작해서 "=" 까지 해줘야함
                    arr.push({ day: null, sun: false, sat: false, today: false }); //i가 현재 달의 첫번째 날보다 작으면 그 블럭은 비워놔야하므로 null을 넣어준다.
                } else {
                    arr.push({ day, sun: false, sat: false, today: false }); //i가 더크다면 그때부터 날짜를 넣어준다.
                    if (
                        this.$moment().format("YYYYMMDD") === `${this.currentYear}${this.currentMonth}${this.currentDay}` &&
                        this.currentDay === day
                    ) {
                        //현재 날짜와 data 날짜가 같고 현재 loop의 day와도 같다면 컬러를 다르게준다. loop를 모두 돌려 검사
                        arr[arr.length - 1].today = true;
                    }
                    if (day === nowDays && arr.length !== 7) {
                        //날짜가 현재달의 날짜와 같으면 마지막이다. 그러므로 length가 7이 되지 않아도 넣어줘야한다.
                        //이떄도 토요일, 일요일 계산
                        if (arr.length === 7) {
                            arr[6].sat = true;
                        } else if (arr.length === 1) {
                            arr[0].sun = true;
                        }
                        days.push(arr);
                    }
                    if (arr.length === 7) {
                        //길이가 7일때가 마지막일이다.
                        //배열에 넣어주고 재사용하기 위해 날짜에 대한 배열은 비워둔다.
                        arr[6].sat = true;
                        days.push(arr);
                        arr = [];
                    } else if (arr.length === 1) {
                        arr[0].sun = true;
                    }
                    day++;
                }
            }
            this.nowMonthDays = days;
        },
        getLeapYear() {
            const { currentYear } = this;
            if (currentYear % 4 === 0 && currentYear % 100 === 0 && currentYear % 400 === 0) {
                return (this.isLeap = true); //4,100,400년에 나누어 떨어지면 윤년
            } else if (currentYear % 4 === 0 && currentYear % 100 === 0) {
                return (this.isLeap = false); //4,100년에 나누어 떨어지면 평년
            } else if (currentYear % 4 === 0) {
                return (this.isLeap = true); //4년에 나누어 떨어지면 윤년
            } else {
                return (this.isLeap = false); //아니면 평년
            }
        },
    },
};
</script>

<style scoped lang="scss">
@import "../styles/calender-modal.scss";
</style>
