const userStore = {
    state: {
        userId: "dbehdgjs123",
        uniqueKey: "ydh",
    },
    mutations: {},
    actions: {},
    getters: {
        rootUser(state) {
            return state.userId;
        },
        rootKey(state) {
            return state.uniqueKey;
        },
    },
};
export default userStore;
