<template>
    <div class="login-container">
        <img src="../../assets/todologo.png" alt="todolist" />
        <div class="login-box">
            <form>
                <input type="text" placeholder="아이디" v-model="userId" />
                <input type="password" placeholder="비밀번호" class="password" v-model="userPassword" />
                <button type="submit" class="login" v-on:click.prevent="onLoginHandler">Login</button>
                <div class="hr-text">계정이 없으신가요?</div>
                <button type="button" v-on:click="goSignup">회원가입</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: "",
            userPassword: "",
        };
    },
    methods: {
        goSignup() {
            this.$router.push("/signup");
        },
        onLoginHandler() {
            this.$store.dispatch("onLoginHandler", { id: this.userId, password: this.userPassword });
        },
    },
};
</script>

<style scoped lang="scss">
@import "../styles/login-page.scss";
</style>
