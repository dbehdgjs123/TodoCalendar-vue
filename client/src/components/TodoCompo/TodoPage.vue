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
        this.$store.commit("getTodos"); //created에서 헬퍼함수는 undefined 넘어온다.
    },
};
</script>

<style></style>
