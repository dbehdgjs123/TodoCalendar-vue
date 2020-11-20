<template>
    <main>
        <history-list v-bind:propsdata="historyTodos" />
    </main>
</template>

<script>
import HistoryList from "./HistoryList.vue";
export default {
    components: { HistoryList },
    props: ["userId"],
    data() {
        return {
            historyTodos: [],
        };
    },
    created() {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes(this.userId + "20") && localStorage.key(i) !== "loglevel:webpack-dev-server") {
                //리스트와 반대로 유저아이디+20의키를 전부 가져온다.
                //유저 아이디 제거후 날짜만 추출후 배열에 push
                const arr = [localStorage.key(i).replace(this.userId, ""), ...JSON.parse(localStorage.getItem(localStorage.key(i)))];
                this.historyTodos.push(arr);
            }
        }
        if (this.historyTodos.length) {
            console.log(this.historyTodos);
            this.historyTodos = this.historyTodos.sort((a, b) => {
                console.log(a[0], b[0]);
                return b[0] - a[0];
            });
        }
    },
};
</script>

<style lang="scss">
@import "../styles/history-page.scss";
</style>
