import axios from "axios";
import router from "../../router/index";

const userStore = {
    state: {
        userNo: "",
        userId: "",
        token: "",
        uniqueKey: "ydh",
        
    },
    mutations: {
        onSignupComplete() {
            alert("회원가입에 성공하셨습니다!");
            router.push("/login");
        },
        onLoginComplete() {
            //로그인하면 메인페이지로 이동
            router.push("/");
        },
        onLogoutComplete() {
            //로그아웃일때 전역의 상태를 초기화 시켜줘야한다.(새로고침)
            window.location.href = "/login";
        },
        onAuthComplete(state,payload) {
            //인증에 성공하면 state에 아이디,넘버,토큰 정보를 넣어준다.
            const {id,no,token} = payload
            state.userNo = no;
            state.userId = id;
            state.token = token;
        }
    },
    actions: {
        onSignupHandler({commit},data) {
            //회원가입 핸들러
            const {id,password} = data;
            axios.post("/api/users/signup",{id, password})
            .then(res => {
                if(res.data.success) {
                    commit("onSignupComplete");
                }
                else {
                    alert(res.data.message);
                }
            })
        },
        onLoginHandler({commit},data) {
            //로그인 핸들러
            const {id,password} = data;
            axios.post("/api/users/login",{id, password})
            .then(res => {
                if(res.data.success) {
                    commit("onLoginComplete");
                }
                else {
                    alert(res.data.message);
                }
            })
        },
        onLogoutHandler({commit}) {
            //로그아웃 핸들러
            axios.get("/api/users/logout")
            .then(res => {
                if(res.data.success) {
                    commit("onLogoutComplete");
                }
                else {
                    alert(res.data.message);
                }
            })
        },
    },
    getters: {
        rootUser(state) { //유저 아이디
            return state.userId;
        },
        rootKey(state) { //history,캘린더 구별용 키
            return state.uniqueKey;
        },
        rootItemKey(state) { //todo아이템 구별용 키(다른 아이디를 가진사람이 똑같은 item을 입력할 수 있기때문에)
            return state.userId.substring(1,7)
        },
        rootToken(state) {
            return state.token
        }
    },
};
export default userStore;
