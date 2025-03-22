import { ref } from "vue";

const user = ref({
  uid: "ux",
  email: "bussiness@mail.xpto",
});

const userAuthState = () => {
  return { user };
};

export default userAuthState;
