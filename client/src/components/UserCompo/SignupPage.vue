<template>
    <div class="signup-container">
        <div class="signup-title">
            SIGN UP
        </div>
        <div class="signup-box">
            <input type="text" v-model="userId" placeholder="ID(최소 8글자)" />
            <div class="error-text" v-if="wrongId">아이디는 최소 8글자입니다.</div>
            <input type="password" class="password" v-model="userPassword" placeholder="PASSWORD(최소 8글자)" />
            <div class="error-text" v-if="wrongPassword">비밀번호는 최소 8글자입니다.</div>
            <button v-on:click="onSignupHandler">회원가입</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            wrongId: false,
            wrongPassword: false,
            userId: "",
            userPassword: "",
        };
    },
    methods: {
        onSignupHandler() {
            const { userId, userPassword } = this;
            if (userId.length < 8) {
                return (this.wrongId = true);
            } else if (userPassword.length < 8) {
                return (this.wrongPassword = true);
            }
            this.$store.dispatch("onSignupHandler", { id: userId, password: userPassword });
        },
    },
};
</script>

<style scoped lang="scss">
@import "../styles/signup-page.scss";
</style>
