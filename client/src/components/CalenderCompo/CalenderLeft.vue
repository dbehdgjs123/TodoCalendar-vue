<template>
    <div class="calender-modal-left">
        <div class="calender-today-title">{{ todayEn }}</div>
        <div class="calender-modal-left-bottom">
            <div class="perform-title">
                <span>{{ rating }}</span>
                <hr />
            </div>
            <ul>
                <li v-for="(item, index) in history" v-bind:key="index">
                    -{{ item.todoItem }}
                    <i class="fas fa-check" v-if="item.isCompleted"></i>
                    <i class="fas fa-times uncheck" v-else></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ["rating", "history", "todayEn"],
};
</script>

<style scoped lang="scss">
@import "../styles/calender-left.scss";
</style>
