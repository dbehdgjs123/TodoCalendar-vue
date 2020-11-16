<!--페이지 최상단 nav-->
<template>
    <nav class="top-nav">
        <div class="nav-bottom">
            <div class="nav-bottom-left">
                <img src="../assets/todologo.png" alt="todolist" />
                <span>-2020.11.16</span>
            </div>
            <div class="nav-bottom-right">
                <router-link to="/"><i class="fas fa-clipboard-list"></i></router-link>
                <router-link to="/calender"><i class="fas fa-calendar-alt"></i></router-link>
                <a href="#"> <i class="fas fa-moon"></i></a>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    created() {
        const today = new Date();
        console.log(today.toLocaleDateString("ko"));
    },
};
</script>

<style lang="scss" scoped>
@import "./styles/nav.scss";
</style>
