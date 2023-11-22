import Vue from "vue";
import VueRouter from "vue-router";
import form from "../views/form.vue";
import table from "../views/table.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/form",
    name: "form",
    component: form,
  },
  {
    path: "/table",
    name: "table",
    component: table,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
