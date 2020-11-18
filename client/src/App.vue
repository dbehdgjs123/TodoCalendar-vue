<template>
    <div id="app">
        <header-vue />
        <nav-vue />
        <nav-scroll />
        <router-view v-bind:dataprops="todos" v-bind:userId="userId" v-on:complete="completeTodo" v-on:remove="removeTodo" />
        <a href="#" class="add-btn" v-on:click.prevent="modalHandler"><i class="fas fa-plus"></i></a>
        <add-modal v-if="showModal" v-on:close="modalHandler" v-on:add="addTodo" />
        <calender-modal />
    </div>
</template>
<script>
import CalenderModal from "./components/CalenderCompo/CalenderModal.vue";
import HeaderVue from "./components/Header.vue";
import NavVue from "./components/Nav.vue";
import NavScroll from "./components/NavScroll.vue";
import AddModal from "./components/TodoCompo/AddModal.vue";

export default {
    created() {
        this.today = this.$moment().format("YYYYMMDD"); //재사용을 위해 데이터에 담았다.
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === this.userId + this.today) {
                //유저아이디+현재날짜의 키값이 있으면 그것은 히스토리로 넣어준다.
                this.historyTodos = JSON.parse(localStorage.getItem(localStorage.key(i)));
            } else if (!localStorage.key(i).includes(this.userId + "20") && localStorage.key(i) !== "loglevel:webpack-dev-server") {
                //초기에 원래 있는 loglevel:webpack-dev-server 키값과, 유저아이디+20가 포함되지 않는 것만 불러온다.
                this.todos.push(JSON.parse(localStorage.getItem(localStorage.key(i)))); //파싱해서 가져옴
            }
        }
    },
    components: {
        HeaderVue,
        NavVue,
        NavScroll,
        AddModal,
        CalenderModal,
    },
    data() {
        return {
            today: "", //현재 날짜
            showModal: false, //모달창
            showCalender: false, //캘린더 모달창
            userId: "dbehdgjs123", //유저 아이디
            todos: [], //현재 할 일들
            historyTodos: [], //이전 할일들 저장용
        };
    },
    methods: {
        modalHandler() {
            this.showModal = !this.showModal;
        },
        calenderHandler() {
            this.showCalender = !this.showCalender;
        },
        addTodo(data) {
            //현재 todo 목록
            const obj = { isCompleted: false, todoItem: data };
            localStorage.setItem(data, JSON.stringify(obj));
            this.todos.push(obj); //배열에 객체 저장

            //history에도 저장해야 한다.
            //마찬가지로 배열에 넣고 localstorage의 키는 고유의키값을 가지도록 유저의 아이디+날짜로 해준다.
            this.historyTodos.push(obj);
            localStorage.setItem(this.userId + this.today, JSON.stringify(this.historyTodos));
        },
        completeTodo(item, index) {
            console.log(item, index); //완료 {item: 객체, index: 배열 순서}
            this.todos[index].isCompleted = !this.todos[index].isCompleted;
            localStorage.setItem(this.todos[index].todoItem, JSON.stringify(this.todos[index])); //json 형태로 저장

            //history의 배열에서도 바꿔준다.
            this.historyTodos[index].isCompleted = !this.historyTodos[index].isCompleted;
            localStorage.setItem(this.userId + this.today, JSON.stringify(this.historyTodos));
        },
        removeTodo(item, index) {
            console.log(item, index); //삭제
            localStorage.removeItem(item.todoItem);
            this.todos.splice(index, 1); //인덱스에 해당하는 속성 하나 제거

            //history도 바꿔준다.
            this.historyTodos.splice(index, 1); //인덱스에 해당하는 속성 하나 제거
            localStorage.setItem(this.userId + this.today, JSON.stringify(this.historyTodos));
        },
    },
};
</script>
<style>
* {
    box-sizing: border-box;
}
body {
    margin: 0;
    padding: 0;
    height: 100%;
}
a {
    color: black;
    text-decoration: none;
}
html {
    height: 100%;
}
main {
    position: absolute;
    background-color: rgb(241, 241, 241);
    min-height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
.add-btn {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    height: 4.5rem;
    color: white;
    background-color: #81b9bf;
    border-radius: 50%;
    padding: 15px;
    bottom: 15px;
    right: 15px;
    font-size: 2rem;
}
</style>
