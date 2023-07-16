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
            <LabelInput label="Name" for="name" />
            <TextInput id="name" name="name" type="text" placeholder="name" />
          </div>

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

          <div class="form-control">
            <LabelInput for="confirmPass" label="Retype Password" />
            <TextInput
              id="confirmPass"
              type="password"
              name="password_confirmation"
              placeholder="Retype Password"
            />
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="!isSubmitting"> Register </span>

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
import { object, string, ref as yupRef } from "yup";
const auth = useAuthStore();
const router = useRouter();

const schema = object({
  name: string().required().min(3),
  email: string().required().email(),
  password: string().required().min(8),
  password_confirmation: string()
    .required()
    .min(8)
    .oneOf(
      [yupRef("password"), null],
      "password and confirm password must be match"
    ),
});

async function onSubmit(values, actions) {
  const res = await auth.register(values);
  if (res) {
    router.push({ name: "user.dashboard" });
  } else {
    actions.setErrors(res);
  }
}
</script>
