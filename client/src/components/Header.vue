<template>
    <header v-if="$route.path !== '/login' && $route.path !== '/signup'">
        <div class="header-logo-box">
            <!--<img src="../assets/alramlogo.jpg" alt="logo" class="logo-img" />-->
        </div>
    </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./styles/header.scss";
</style>
