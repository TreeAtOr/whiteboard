<template>
  <main id="main-holder">
    <div>
      <h1 id="login-header">Добро пожаловать в мир досок!</h1>
    </div>
    <h2 id="login or registration">Войдите или зарегистрируйтесь</h2>

    <div v-if="status" id="login-error-msg-holder">
      <p id="login-error-msg">
        "Неверно введена электронная почта или пароль"
        <span id="error-msg-second-line"></span>
      </p>
    </div>

    <form @submit.prevent="onSubmit" stop id="login-form">
      <input
        v-model="username"
        
        type="text"
        name="username"
        id="username-field"
        class="login-form-field"
        placeholder="username@domain.zone"
      />
      <input
        v-model="password"
        type="password"
        name="password"
        id="password-field"
        class="login-form-field"
        placeholder="Password"
      />
      <input type="submit" value="Login" id="login-form-submit" />
    </form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      status: "false",
    };
  },
  props: ["getRouter", "auth"],
  methods: {
    async onSubmit() {
      console.log(this.username);
      const pro = await this.$props.auth(
        "login",
        this.username,
        this.password
      );
      console.log(pro);
      this.$props.getRouter().push("/");
    },
  },
};
</script>

<style>
</style>