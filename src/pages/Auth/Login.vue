<template>
  <div class="min-h-screen flex items-center">
    <div class="w-full">
      <div
        class="card bg-white p-10 rounded-lg shadow-xl md:w-3/4 mx-auto lg:w-1/3"
      >
        <Form
          @submit="onSubmit"
          v-slot="{ meta, isSubmitting }"
          :validation-schema="schema"
        >
          <div class="form-control">
            <LabelInput label="Email" for="email" />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="email"
            />
          </div>

          <div class="form-control">
            <LabelInput label="Password" />
            <TextInput type="password" name="password" placeholder="Password" />
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="!isSubmitting"> Login </span>

              <font-awesome-icon
                v-else="isSubmitting"
                :icon="['fas', 'spinner']"
                size="2xl"
              />
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import TextInput from "@/components/Form/TextInput.vue";
import LabelInput from "@/components/Form/LabelInput.vue";
import { Form } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("Email field is required").email(),
  password: yup.string().required("Password field is required").min(8),
});

const auth = useAuthStore();
const router = useRouter();

// Initial values
// const formValues = {
//   email: "test@gmail.com",
//   password: "password",
// };

async function onSubmit(values, actions) {
  const res = await auth.login(values);
  if (res) {
    router.push({ name: "user.dashboard" });
  } else {
    actions.setErrors(res);
  }
}
</script>

<style>
/* Define an animation behavior */
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.fa-spinner {
  animation: spinner 1s linear infinite;
}
</style>
