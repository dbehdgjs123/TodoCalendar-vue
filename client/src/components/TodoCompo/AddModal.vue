<template>
    <div class="modal-container">
        <div class="modal-wrapper" v-on:click="closeHandler"></div>
        <div class="add-modal">
            <div class="modal-title">할 일 추가</div>
            <div class="input-box">
                <input type="text" placeholder="할 일을 입력하세요..." v-model="todoInput" />
                <a href="#" class="todo-add-btn" v-on:click.prevent="addTodo"><i class="fas fa-plus"></i></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeHandler() {
            this.$emit("close");
        },
        addTodo() {
            this.$emit("add");
        },
    },
    data() {
        return {
            todoInput: "",
        };
    },
};
</script>

<style scoped lang="scss">
@import "../styles/add-modal.scss";
</style>
