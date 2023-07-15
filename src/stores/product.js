import { defineStore } from "pinia";
import axiosInstance from "@/services/axiosService";
import router from "../router";
export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    loading: false,
  }),

  getters: {
    getProducts: (state) => {
      return state.products;
    },

    loadingStatus: (state) => {
      return state.loading;
    },
  },

  actions: {
    async index() {
      try {
        const res = await axiosInstance.get("/products");
        if (res.status == 200) {
          this.products = res.data.data;
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.errors);
        }
      }
    },

    async store(product) {
      try {
        const res = await axiosInstance.post("/product", product);
        if (res.status == 201) {
          return new Promise((resolve) => {
            resolve(res);
          });
        }
      } catch (error) {
        if (error.response) {
          return new Promise((reject) => {
            reject(error.response.data.errors);
          });
        }
      }
    },

    async destroy(id) {
      try {
        const res = await axiosInstance.delete("/product/" + id);
        if (res.status == 200) {
          this.index();
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.errors);
        }
      }
    },
  },
});
