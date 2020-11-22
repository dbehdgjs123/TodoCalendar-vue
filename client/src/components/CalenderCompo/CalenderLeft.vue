<template>
    <div class="calender-modal-left">
        <div class="calender-today-title">
            <div>{{ day }}</div>
            <div>{{ todayEn }}</div>
        </div>
        <div class="calender-modal-left-bottom">
            <div class="todo-title">
                To do items
            </div>
            <ul>
                <li v-for="(item, index) in history" v-bind:key="index">
                    {{ item.todoItem }}
                    <i class="fas fa-check" v-if="item.isCompleted"></i>
                    <i class="fas fa-times uncheck" v-else></i>
                </li>
            </ul>
            <div class="score-box">SCORE: {{ rating }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["rating", "history", "todayEn", "day"],
};
</script>

<style scoped lang="scss">
@import "../styles/calender-left.scss";
</style>
