<template>
    <ul class="history-list">
        <li class="history-list-item" v-for="item in propsdata" v-bind:key="item[0]">
            <div class="history-list-item-date">
                <div class="date-days">{{ $moment(item[0]).format("DD") }}</div>
                <div class="date">{{ $moment(item[0]).format("MMMM YYYY") }}</div>
            </div>
            <hr />
            <div class="history-list-item-todo" v-for="innerItem in computedList(item)" v-bind:key="innerItem.item">
                -{{ innerItem.todoItem }}
                <i class="fas fa-check" v-if="innerItem.isCompleted"></i>
                <i class="fas fa-times uncheck" v-else></i>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["propsdata"],
    methods: {
        computedList(data) {
            // data : [날짜,{todo},{todo},{todo}]
            return data.slice(1); //첫번째 배열은 자르고 넘긴다. splice는 원본배열을 건드리기 때문에 x
        },
    },
};
</script>

<style lang="scss">
@import "../styles/history-list.scss";
</style>
