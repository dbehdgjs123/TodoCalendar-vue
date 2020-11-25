<!--페이지 최상단 nav-->
<template>
    <nav class="top-nav" v-if="$route.path !== '/login' && $route.path !== '/signup'">
        <div class="nav-bottom">
            <div class="nav-bottom-left">
                <img src="../assets/todologo.png" alt="todolist" />
            </div>
            <div class="nav-bottom-right">
                <router-link to="/history"><i class="fas fa-history"></i></router-link>
                <router-link to="/"><i class="fas fa-clipboard-list"></i></router-link>
                <i class="fas fa-calendar-alt" v-on:click="calenderHandler"></i>
                <i class="fas fa-sign-out-alt" v-if="rootToken" v-on:click="onLogoutHandler"></i>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    methods: {
        calenderHandler() {
            this.$emit("calenderClick");
        },
        onLogoutHandler() {
            this.$store.dispatch("onLogoutHandler");
        },
    },
    computed: {
        ...mapGetters(["rootToken"]),
    },
};
</script>

<style lang="scss" scoped>
@import "./styles/nav.scss";
</style>
