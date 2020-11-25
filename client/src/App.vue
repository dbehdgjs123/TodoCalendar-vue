<template>
    <div id="app">
        <header-vue />
        <nav-vue v-on:calenderClick="calenderHandler" />
        <nav-scroll />
        <router-view />
        <a href="#" class="add-btn" v-on:click.prevent="modalHandler" v-if="$route.path !== '/login' && $route.path !== '/signup'"
            ><i class="fas fa-plus"></i
        ></a>
        <add-modal v-if="showModal" v-on:close="modalHandler" />
        <calender-modal v-if="showCalender" v-on:closeCalender="calenderHandler" />
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import CalenderModal from "./components/CalenderCompo/CalenderModal.vue";
import HeaderVue from "./components/Header.vue";
import NavVue from "./components/Nav.vue";
import NavScroll from "./components/NavScroll.vue";
import AddModal from "./components/TodoCompo/AddModal.vue";

export default {
    components: {
        HeaderVue,
        NavVue,
        NavScroll,
        AddModal,
        CalenderModal,
    },
    data() {
        return {
            showModal: false, //모달창
            showCalender: false, //캘린더 모달창
        };
    },
    methods: {
        modalHandler() {
            this.showModal = !this.showModal;
        },
        calenderHandler() {
            this.showCalender = !this.showCalender;
        },
    },
    computed: {
        ...mapGetters(["rootUser", "rootKey"]),
    },
};
</script>
<style lang="scss">
$lgray: #eef5ef;
$yellowgreen: #aaf578;
$lgreen: #8fe079;
$green: #6ce07a;
* {
    box-sizing: border-box;
    font-family: "Ubuntu", sans-serif;
}
body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #f0f0f0;
}
a {
    color: black;
    text-decoration: none;
}
html {
    height: 100%;
}
main {
    position: absolute;
    background-color: $lgray;
    width: 100%;
    display: flex;
    justify-content: center;
}
.add-btn {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    height: 4.5rem;
    color: white;
    background-color: $lgreen;
    border-radius: 50%;
    padding: 15px;
    bottom: 15px;
    right: 15px;
    font-size: 2rem;
}
</style>
