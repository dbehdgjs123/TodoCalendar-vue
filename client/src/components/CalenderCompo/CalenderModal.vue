<template>
    <div class="calender-modal-container">
        <div class="calender-modal-wrapper" v-on:click="closeHandler"></div>
        <div class="calender-modal">
            <calender-left
                v-bind:rating="getRating"
                v-bind:history="computedHistory"
                v-bind:todayEn="computedTodayEn"
                v-bind:day="computedNowDay"
            />
            <calender-right
                v-bind:year="currentYear"
                v-bind:month="currentMonth"
                v-bind:weeks="nowMonthDays"
                v-bind:days="days"
                v-on:prev="prevBtnHandler"
                v-on:next="nextBtnHandler"
                v-on:dateClick="dateClickHandler"
            />
        </div>
    </div>
</template>

<script>
import CalenderLeft from "./CalenderLeft.vue";
import CalenderRight from "./CalenderRight.vue";
export default {
    components: { CalenderLeft, CalenderRight },
    created() {
        const allDate = new Date(); //현재 날짜 가져오기
        this.currentYear = allDate.getFullYear();
        this.currentMonth = allDate.getMonth() + 1;
        this.currentDay = allDate.getDate();
        //next,prev 연산할때 -는 형변환이 일어나지만 +는 합쳐지기 때문에 creaction중에 넘버형으로 바꾼다.
        this.getLeapYear();
        this.getCalender(); //현재 달의 2차원 배열 캘린더 v-for로 돌림
    },
    data() {
        return {
            //modal right
            days: ["일", "월", "화", "수", "목", "금", "토"],
            leapYear: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //윤년
            normalYear: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //평년
            currentYear: 0,
            currentMonth: 0,
            currentDay: 0,
            isLeap: false,
            nowMonthDays: [], //주,일에 대한 2차원 배열, 1차: 주, 2차: 일
            prevFocus: {}, //전에 선택했던 포커스 알아내기
            //modal left
            todayEn: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], //영어 날짜 타이틀
            currentTodo: [], //선책한 날짜의 todolist
            score: "", //Bad,Noraml,Good,Noting => Noting은 아무것도 없는것
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
        computedNowDay() {
            //현재 날짜
            const { parIndex, index } = this.prevFocus;
            return this.nowMonthDays[parIndex][index].day;
        },
        computedTodayEn() {
            //영어 날짜로 변환
            if (this.prevFocus.index >= 0) {
                //값이 있을때만
                return this.todayEn[this.prevFocus.index];
            } else {
                return null;
            }
        },
        computedHistory() {
            if (localStorage.length) {
                for (let i = 0; i < localStorage.length; i++) {
                    if (localStorage.key(i) !== "loglevel:webpack-dev-server" && localStorage.key(i) === this.Twodigits()) {
                        //key값과 똑같은지 비교후 가져온다.
                        return JSON.parse(localStorage.getItem(localStorage.key(i)));
                    }
                }
            }
            return null;
        },
        getRating() {
            //한 일에 따라 점수로 변환
            if (this.computedHistory) {
                const score =
                    (this.computedHistory.reduce((item, cur) => {
                        //completed가 true면 누적값에 1을 더해주고 아니면 0을 더해준다.
                        return cur.isCompleted ? item + 1 : item + 0;
                    }, 0) /
                        this.computedHistory.length) *
                    100;
                //console.log(score);
                if (66.6 < score) {
                    return "😁";
                } else if (33.3 < score) {
                    return "🙂";
                } else {
                    return "☹️";
                }
            } else {
                return "😴";
            }
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
        dateClickHandler(data) {
            //배열의 인덱스는 무조건 길이가 7이므로 힌주와 동일하다.
            //부모의 인덱스, 자식의 인덱스를 넣으면 어떤걸 클릭했는지 알 수있다.
            const { parIndex, index } = data;
            this.nowMonthDays[this.prevFocus.parIndex][this.prevFocus.index].focus = false;
            this.nowMonthDays[parIndex][index].focus = true;
            this.prevFocus = { parIndex, index }; //다음 버튼을 누르면 전에 누른값이 사라져야하므로 기억해놔야한다.
        },
        closeHandler() {
            this.$emit("closeCalender");
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
        Twodigits() {
            //!!!!!버그 고쳐야함 11/22!!!!!
            const { currentYear, currentMonth } = this;
            //현재 일수는 두자리수로 내보낸다.
            console.log(";l");
            if (
                this.nowMonthDays[this.prevFocus.parIndex][this.prevFocus.index].day &&
                this.nowMonthDays[this.prevFocus.parIndex][this.prevFocus.index].day.length === 1
            ) {
                //한자리일때는 0 붙혀서 리턴
                //아이디+키+연도
                return `${this.$store.getters.rootUser}${this.$store.getters.rootKey}${currentYear}${currentMonth}0${
                    this.nowMonthDays[this.prevFocus.parIndex][this.prevFocus.index].day
                }`;
            } else {
                return `${this.$store.getters.rootUser}${this.$store.getters.rootKey}${currentYear}${currentMonth}${
                    this.nowMonthDays[this.prevFocus.parIndex][this.prevFocus.index].day
                }`;
            }
        },
        getCalender() {
            //캘린더 그리는 메서드
            const { computedNowFirstDay, nowDays } = this;
            let days = []; //주에 대한 배열
            let arr = []; //주의 날짜의 배열 (2차원)
            let day = 1; //i대신 이 변수로 돌린다.
            for (let i = 1; i <= nowDays + computedNowFirstDay; i++) {
                //i가 첫번째 날보다 커졌을때 부터 넣기 시작하므로 맞춰주기 위해 그만큼 더해줘야한다.
                if (i <= computedNowFirstDay) {
                    //현재 날짜의 인덱스가 0부터 시작하기 때문에 "=" 까지 해줘야함
                    arr.push({ day: null, sun: false, sat: false, focus: false }); //i가 현재 달의 첫번째 날보다 작으면 그 블럭은 비워놔야하므로 null을 넣어준다.
                } else {
                    arr.push({ day, sun: false, sat: false, focus: false }); //i가 더크다면 그때부터 날짜를 넣어준다.
                    if (
                        this.$moment().format("YYYYMMDD") === `${this.currentYear}${this.currentMonth}${this.currentDay}` &&
                        this.currentDay === day
                    ) {
                        //현재 날짜와 data 날짜가 같고 현재 loop의 day와도 같다면 컬러를 다르게준다. loop를 모두 돌려 검사
                        this.prevFocus = { parIndex: days.length, index: arr.length - 1 }; //초기 데이는 현재로 초기화
                        arr[arr.length - 1].focus = true;
                    }
                    if (day === nowDays && arr.length) {
                        //날짜가 현재달의 날짜와 같으면 마지막이다. 그러므로 length가 7이 되지 않아도 넣어줘야한다.
                        //이떄도 토요일, 일요일 계산
                        if (arr.length === 7) {
                            arr[6].sat = true;
                        } else if (arr.length === 1) {
                            arr[0].sun = true;
                        }
                        days.push(arr);
                        return (this.nowMonthDays = days); //마지막날이면 밑에 코드와 중복되므로 리턴시켜준다
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
    },
};
</script>

<style scoped lang="scss">
@import "../styles/calender-modal.scss";
</style>
