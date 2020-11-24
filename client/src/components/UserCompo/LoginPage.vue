<template>
    <div class="login-container">
        <img src="../../assets/todologo.png" alt="todolist" />
        <div class="login-box">
            <form>
                <input type="text" placeholder="아이디" />
                <input type="password" placeholder="비밀번호" class="password" />
                <button type="submit" class="login">Login</button>
                <div class="hr-text">계정이 없으신가요?</div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "../styles/login-page.scss";
</style>
