<!--페이지 최상단 nav-->
<template>
    <nav class="top-nav">
        <div class="nav-bottom">
            <div class="nav-bottom-left">
                <img src="../assets/todologo.png" alt="todolist" />
            </div>
            <div class="nav-bottom-right">
                <router-link to="/history"><i class="fas fa-history"></i></router-link>
                <router-link to="/"><i class="fas fa-clipboard-list"></i></router-link>
                <i class="fas fa-calendar-alt" v-on:click="calenderHandler"></i>
                <a href="#"> <i class="fas fa-moon"></i></a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        calenderHandler() {
            this.$emit("calenderClick");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./styles/nav.scss";
</style>
