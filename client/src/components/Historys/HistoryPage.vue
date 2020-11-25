<template>
    <main>
        <history-list v-bind:propsdata="historyTodos" />
    </main>
</template>

<script>
import { mapGetters } from "vuex";
import HistoryList from "./HistoryList.vue";
export default {
    //todo 페이지처럼 이벤트버스가 많아지거나 수정할 데이터가 없어서 스토어엔 넣지 않았다.
    components: { HistoryList },
    data() {
        return {
            historyTodos: [],
        };
    },
    computed: {
        ...mapGetters(["rootUser", "rootKey"]),
    },
    created() {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes(this.rootUser + this.rootKey) && localStorage.key(i) !== "loglevel:webpack-dev-server") {
                //리스트와 반대로 유저아이디+고유키를 전부 가져온다.
                //유저 아이디 제거후 날짜만 추출후 배열에 push
                const arr = [
                    localStorage.key(i).replace(this.rootUser + this.rootKey, ""),
                    ...JSON.parse(localStorage.getItem(localStorage.key(i))),
                ];
                this.historyTodos.push(arr);
            }
        }
        if (this.historyTodos.length) {
            //가져온 데이터들을 내림차순으로 정렬한다.
            this.historyTodos = this.historyTodos.sort((a, b) => {
                return b[0] - a[0];
            });
        }
    },
};
</script>

<style lang="scss">
@import "../styles/history-page.scss";
</style>
