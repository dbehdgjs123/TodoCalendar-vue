<template>
    <div class="modal-container">
        <div class="modal-wrapper" v-on:click="closeHandler"></div>
        <div class="add-modal">
            <div class="modal-title">할 일 추가</div>
            <div class="input-box">
                <div class="input-box-top">
                    <input type="text" placeholder="할 일을 입력하세요..." v-model="todoInput" v-on:keyup.enter="addTodo" />
                    <a href="#" class="todo-add-btn" v-on:click.prevent="addTodo"><i class="fas fa-plus"></i></a>
                </div>
                <span v-if="isEmpty">한 글자 이상 입력해주세요.</span>
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
            if (!this.todoInput) {
                //비었을떄의 조건부 렌더링
                return (this.isEmpty = true);
            }
            this.$emit("add", this.todoInput);
            this.todoInput = "";
        },
    },
    data() {
        return {
            todoInput: "",
            isEmpty: false,
        };
    },
};
</script>

<style scoped lang="scss">
@import "../styles/add-modal.scss";
</style>
