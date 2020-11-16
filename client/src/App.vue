<template>
    <div id="app">
        <header-vue />
        <nav-vue />
        <nav-scroll />
        <router-view />
        <a href="#" class="add-btn" v-on:click.prevent="modalHandler"><i class="fas fa-plus"></i></a>
        <add-modal v-if="showModal" v-on:close="modalHandler" v-on:add="addTodo" />
    </div>
</template>
<script>
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
    },
    data() {
        return {
            showModal: false,
        };
    },
    methods: {
        modalHandler() {
            this.showModal = !this.showModal;
        },
        addTodo() {
            console.log("add");
        },
    },
};
</script>
<style>
* {
    box-sizing: border-box;
}
body {
    margin: 0;
    padding: 0;
    height: 100%;
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
    background-color: rgb(241, 241, 241);
    height: 100%;
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
    background-color: #81b9bf;
    border-radius: 50%;
    padding: 15px;
    bottom: 15px;
    right: 15px;
    font-size: 2rem;
}
</style>
