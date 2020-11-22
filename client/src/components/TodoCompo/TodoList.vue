<template>
  <ul class="todo-list" v-if="this.$store.state.todoStore.todos.length">
    <li
      class="todo-list-item-box"
      v-bind:class="{ completed: item.isCompleted }"
      v-for="(item, index) in this.$store.state.todoStore.todos"
      v-bind:key="item.todoItem"
    >
      <div class="todo-list-item">
        <i v-if="item.isCompleted" class="fas fa-check-square check-btn" v-on:click="completeTodo(index)"></i>
        <i v-else class="far fa-check-square check-btn" v-on:click="completeTodo(index)"></i>
        <span> {{ item.todoItem }} </span>
        <i class="fas fa-trash remove-btn" v-on:click="removeTodo(item, index)"></i>
      </div>
    </li>
  </ul>
  <div v-else>
    할 일을 추가해보세요!
  </div>
</template>

<script>
export default {
  methods: {
    completeTodo(index) {
      this.$store.commit("completeTodo", { index });
    },
    removeTodo(item, index) {
      this.$store.commit("removeTodo", { item, index });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/list.scss";
</style>
