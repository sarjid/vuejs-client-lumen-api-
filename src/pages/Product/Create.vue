<template>
  <div class="min-h-screen flex items-center">
    <div class="w-full">
      <h2 class="text-center text-gray-400 font-bold text-2xl uppercase mb-10">
        Add New Product
      </h2>
      <div class="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
        <Form
          @submit="onSubmit"
          v-slot="{ meta, isSubmitting }"
          :validation-schema="schema"
          :initial-values="formValues"
        >
          <div class="form-control">
            <LabelInput label="Product Name" for="name" />
            <TextInput
              id="name"
              name="product_name"
              type="text"
              placeholder="product name"
            />
          </div>

          <div class="form-control">
            <LabelInput label="Product Code" />
            <TextInput
              type="text"
              name="product_code"
              placeholder="product_code"
            />
          </div>

          <div class="form-control">
            <LabelInput label="Price" />
            <TextInput type="text" name="price" placeholder="Price" />
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
import { useProductStore } from "@/stores/product";

import TextInput from "@/components/Form/TextInput.vue";
import LabelInput from "@/components/Form/LabelInput.vue";
import { Form } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  product_name: yup.string().required("Product name field is required"),
  product_code: yup.string().required("Product code field is required"),
  price: yup.number().required("Product price field is required"),
});

const product = useProductStore();

async function onSubmit(values, actions) {
  const res = await product.store(values);
  if (res) {
    actions.resetForm();
  } else {
    actions.setErrors(res);
  }
}
</script>

<style scoped></style>
