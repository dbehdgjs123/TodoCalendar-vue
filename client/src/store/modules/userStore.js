const userStore = {
    state: {
        userId: "",
        uniqueKey: "ydh",
    },
    mutations: {},
    actions: {},
    getters: {
        rootUser(state) { //유저 아이디
            return state.userId;
        },
        rootKey(state) { //history,캘린더 구별용 키
            return state.uniqueKey;
        },
        rootItemKey(state) { //todo아이템 구별용 키(다른 아이디를 가진사람이 똑같은 item을 입력할 수 있기때문에)
            return state.userId.substring(1,7)
        }
    },
};
export default userStore;
