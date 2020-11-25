//const getToday = () => {};
import Vue from "vue";
const todoStore = {
    state: {
        todos: [],
        today: "",
        isFirst: false,
    },
    mutations: {
        getTodos(state) {
            if(!state.isFirst) {
                //전역상태라 계속 누적된다. 처음일때만 해주도록 해야함.
                state.isFirst = true
                state.today = Vue.moment().format("YYYYMMDD"); //재사용을 위해 데이터에 담았다.
            for (let i = 0; i < localStorage.length; i++) {
                if (!localStorage.key(i).includes(this.getters.rootKey) && localStorage.key(i) !== "loglevel:webpack-dev-server") {
                    //초기에 원래 있는 loglevel:webpack-dev-server 키값과, 유니크키가 포함되지 않는 것만 불러온다.
                    if (!JSON.parse(localStorage.getItem(localStorage.key(i))).createdDate.includes(state.today)) {
                        //생성된 날짜가 오늘이 포함되어 있지않으면 삭제한다.(현재 날짜의 todolist만 출력)
                        localStorage.removeItem(localStorage.key(i));
                    } else {
                        if(JSON.parse(localStorage.getItem(localStorage.key(i))).writer === this.getters.rootUser) {
                            state.todos.push(JSON.parse(localStorage.getItem(localStorage.key(i)))); //파싱해서 가져옴
                        }
                        
                    }
                }
            }
            if (state.todos.length) {
                //todo목록을 날짜 오름차순으로 정렬
                state.todos.sort((a, b) => {
                    return a.createdDate - b.createdDate;
                });
            }
            }
            
        },
        addTodo(state, data) {
            const obj = {
                isCompleted: false,
                todoItem: data,
                createdDate: Vue.moment().format("YYYYMMDDHHmmss"),
                writer: this.getters.rootUser
            };
            const isOverlap = state.todos.find((item) => item.todoItem === data); //중복된 값이 있으면 리턴 시킨다
            if (isOverlap) {
                console.log("중복");
                return;
            }
            localStorage.setItem(this.getters.rootItemKey + data, JSON.stringify(obj)); //key+data로 저장(중복방지)
            state.todos.push(obj); //배열에 객체 저장
            localStorage.setItem(this.getters.rootUser + this.getters.rootKey + state.today, JSON.stringify(state.todos));
            //history는 localstorage의 키는 고유의키값을 가지도록 유저의 아이디+고유키+날짜로 해준다.
        },
        completeTodo(state, payload) {
            const { index } = payload; //완료 {item: 객체, index: 배열 순서}
            state.todos[index].isCompleted = !state.todos[index].isCompleted;
            localStorage.setItem(this.getters.rootItemKey + state.todos[index].todoItem, JSON.stringify(state.todos[index])); //json 형태로 저장
            localStorage.setItem(this.getters.rootUser + this.getters.rootKey + state.today, JSON.stringify(state.todos));//history의 배열에서도 바꿔준다.
        },
        removeTodo(state, payload) {
            const { item, index } = payload; //삭제 
            localStorage.removeItem(this.rootItemKey + item.todoItem);
            state.todos.splice(index, 1); //인덱스에 해당하는 속성 하나 제거
            //history도 바꿔준다.
            //this.historyTodos.splice(index, 1); //인덱스에 해당하는 속성 하나 제거
            localStorage.setItem(this.getters.rootUser + this.getters.rootKey + state.today, JSON.stringify(state.todos));
        },
    },
    actions: {},
};
export default todoStore;
