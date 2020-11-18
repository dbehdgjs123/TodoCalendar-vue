<template>
    <main>
        <todo-list v-bind:dataprops="dataprops" v-on:complete="completeTodo" v-on:remove="removeTodo" />
    </main>
</template>

<script>
import TodoList from "./TodoList.vue";

export default {
    components: { TodoList },
    props: ["dataprops"],
    methods: {
        completeTodo(item, index) {
            console.log(item, index);
            this.$emit("complete", item, index);
        },
        removeTodo(item, index) {
            console.log(item, index);
            this.$emit("remove", item, index);
        },
    },
};
</script>

<style></style>
