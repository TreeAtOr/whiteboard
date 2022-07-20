<template>
  <main id="main-holder">
    <div>
      <h1 id="login-header">Добро пожаловать в мир досок!</h1>
    </div>

    <div class="form-box">
      <div class="button-box">
        <div id="btn"></div>

        <div v-if="status" id="login-error-msg-holder">
          <p id="login-error-msg">
            "Неверно введена электронная почта или пароль"
            <span id="error-msg-second-line"></span>
          </p>
        </div>

        <button type="button" class="toggle-btn" @click="switchLogin(true)">
          Вход
        </button>
        <button type="button" class="toggle-btn" @click="switchLogin(false)">
          Регистрация
        </button>
      </div>

      <form
        v-if="isLogin"
        @submit.prevent="onSubmit"
        stop
        prevent
        id="login-form"
        class="input-group"
      >
        <input
          v-model="username"
          type="text"
          name="username"
          id="username-field"
          class="login-form-field"
          placeholder="username@domain.zone"
          required
        />

        <input
          v-model="password"
          type="password"
          name="password"
          id="password-field"
          class="login-form-field"
          placeholder="Password"
          required
        />

        <input type="checkbox" class="checkbox" /><span>Запомнить пароль</span>
        <button
          type="submit"
          value="Login"
          id="login-form-submit"
          class="submit-btn"
        >
          Вход
        </button>
      </form>

      <form
        v-if="!isLogin"
        @submit.prevent="onSingUp"
        stop
        prevent
        id="register-form"
        class="input-group"
      >
        <input
          v-model="username"
          type="text"
          name="username"
          id="username-field"
          class="login-form-field"
          placeholder="username@domain.zone"
          required
        />

        <input
          v-model="password"
          type="password"
          name="password"
          id="password-field"
          class="login-form-field"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          value="Login"
          id="login-form-submit"
          class="submit-btn"
        >
          Регистрация
        </button>
      </form>
    </div>
  </main>
</template>

 <script>
export default {
  data() {
    return {
      username: "",
      password: "",
      status: "false",
      isLogin: false,
    };
  },
  props: ["getRouter", "auth"],
  methods: {
    async onSubmit() {
      console.log(this.username);
      const pro = await this.$props.auth("login", this.username, this.password);
      console.log(pro);
      this.$props.getRouter().push("/");
    },
    async onSingUp() {
      console.log(this.username);
      const pro = await this.$props.auth(
        "singup",
        this.username,
        this.password
      );
      this.switchLogin(true);
    },
    switchLogin(isLogin) {
      this.isLogin = isLogin;
    },
  },
};
</script>

<style>
</style>