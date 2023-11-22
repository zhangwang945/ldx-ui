<template>
  <el-form
    ref="form"
    :model="formState"
    :inline="inline"
    :size="size"
    v-bind="$attrs"
  >
    <el-row>
      <formItem v-for="(item, index) in fields" :info="item" :key="index" />
    </el-row>
  </el-form>
</template>
<script>
import FormItem from "./FormItem.vue";

const formMethods = [
  "validate",
  "validateField",
  "resetFields",
  "clearValidate",
].reduce((wrap, key) => {
  wrap[key] = function (...args) {
    this.$refs.form[key](...args);
  };
  return wrap;
}, {});

export default {
  name: "LdxForm",
  components: { FormItem },
  provide() {
    return {
      ldxFormInstance: this,
      ChildFormItem: FormItem,
      updateFormState: this.updateFormState,
      formState: this.formState,
    };
  },
  props: {
    model: {},
    info: {},
    fields: Array,
    inline: {
      default() {
        return false;
      },
    },
    size: {
      default() {
        return "small";
      },
    },
  },
  data() {
    return {
      // formStae: { ...this.value },
    };
  },
  computed: {
    formState() {
      return this.model;
    },
  },
  methods: {
    ...formMethods,
    updateFormState(prop, val) {
      this.$set(this.formState, prop, val);
      // this.$emit("input", { ...this.formStae });
    },
  },
};
</script>
