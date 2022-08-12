<template>
  <div class="login">
    <div class="loginTop">请登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        placeholder="请输入手机号码"
        v-model="phone"
      />
      <input
        type="password"
        name="password"
        class="password"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <button class="btn" @click="Login">登录</button>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { ref, computed } from "@vue/reactivity";

export default {
  setup() {
    const store = useStore();
    let phone = ref("");
    let password = ref("");
    function Login(){
      store.dispatch("getLogin", {phone:phone.value,password:password.value});
    }
    return { phone, password,Login };
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  .loginTop {
    font-size: 0.4rem;
  }
  .loginContent {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 75%;
      height: 0.7rem;
      margin: 0.3rem 0;
    }
  }
  .btn {
    width: 2rem;
  }
}
</style>