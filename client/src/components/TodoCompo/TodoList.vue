<template>
    <ul class="todo-list">
        <li
            class="todo-list-item-box"
            v-bind:class="{ completed: item.isCompleted }"
            v-for="(item, index) in dataprops"
            v-bind:key="item.todoItem"
        >
            <div class="todo-list-item">
                <i v-if="item.isCompleted" class="fas fa-check-square check-btn" v-on:click="completeTodo(item, index)"></i>
                <i v-else class="far fa-check-square check-btn" v-on:click="completeTodo(item, index)"></i>
                <span> {{ item.todoItem }} </span>
                <i class="fas fa-trash remove-btn" v-on:click="removeTodo(item, index)"></i>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["dataprops"],
    methods: {
        completeTodo(name, index) {
            console.log(name, index);
            this.$emit("complete", name, index); //객체와 인덱스를 위로 올려준다
        },
        removeTodo(name, index) {
            console.log(name, index);
            this.$emit("remove", name, index);
        },
    },
};
</script>

<style scoped lang="scss">
@import "../styles/list.scss";
</style>
