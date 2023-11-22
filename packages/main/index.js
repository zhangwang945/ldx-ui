import LdxTable from "../LdxTable";
import LdxForm from "../LdxForm";

export default {
  install(Vue) {
    const comps = [LdxTable, LdxForm];
    comps.forEach((comp) => Vue.use(comp));
  },
};
