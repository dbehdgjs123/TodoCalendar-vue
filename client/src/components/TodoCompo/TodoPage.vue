<template>
    <main>
        <todo-list />
    </main>
</template>

<script>
import { mapGetters } from "vuex";
import TodoList from "./TodoList.vue";
export default {
    components: { TodoList },
    computed: {
        ...mapGetters[("rootUser", "rootKey")],
    },
    created() {
        const router = this.$router;
        if (this.$store.getters.rootUser.length) {
            this.$store.commit("getTodos"); //created에서 헬퍼함수는 undefined 넘어온다.
        } else {
            alert("로그인이 필요한 페이지입니다.");
            router.push("/login");
        }
    },
};
</script>

<style></style>
