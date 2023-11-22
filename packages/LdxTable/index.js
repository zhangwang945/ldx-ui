import LdxTable from "./src/main";

LdxTable.install = function (Vue) {
  Vue.component(LdxTable.name, LdxTable);
};

export default LdxTable;
