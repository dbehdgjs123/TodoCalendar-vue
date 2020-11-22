<template>
    <nav class="nav-scroll" v-bind:class="{ active: active }">
        <div class="nav-bottom">
            <div class="nav-bottom-left">
                <img src="../assets/todologo.png" alt="todolist" />
            </div>
            <div class="nav-bottom-right">
                <router-link to="/history"><i class="fas fa-history"></i></router-link>
                <router-link to="/"><i class="fas fa-clipboard-list"></i></router-link>
                <i class="fas fa-calendar-alt" v-on:click="calenderHandler"></i>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data: function() {
        return {
            active: false,
            yHeight: 0,
            delta: 150, //스크롤 횟수
        };
    },
    methods: {
        scrollHandler() {
            const yOffset = window.scrollY; //헤더 크기 420보다 커지면 nav바 활성
            if (yOffset > 420 && yOffset - this.yHeight > this.delta) {
                this.yHeight = yOffset;
                this.active = true;
            } else if (yOffset - this.yHeight < 0) {
                this.active = false;
                this.yHeight = yOffset;
            }
        },
        calenderHandler() {
            this.$emit("calenderClick");
        },
    },
    created() {
        //라이프사이클 craeted
        window.addEventListener("scroll", this.scrollHandler); //핸들러 등록
    },
    destroyed() {
        //언마운트 될때 메모리 누수 방지
        window.removeEventListener("scroll", this.scrollHandler);
    },
};
</script>

<style scoped lang="scss">
@import "./styles/nav-scroll.scss";
</style>
