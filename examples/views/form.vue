<template>
  <LdxForm :model="formState" :fields="fields" label-width="100px" ref="form" />
</template>

<script>
// import LdxForm from "@/components/LdxForm";

export default {
  name: "exampleForm",
  // components: { LdxForm },
  data() {
    return {
      formState: {},
      loading: false,
    };
  },
  computed: {
    fields() {
      return [
        {
          prop: "val1",
          label: "单选",
          component: {
            name: "el-radio",
            options: [
              {
                value: "选项1",
                label: "黄金糕",
              },
              {
                value: "选项2",
                label: "双皮奶",
              },
            ],
          },
          rules: [
            { required: true, message: "请输入活动名称", trigger: "change" },
          ],
        },
        {
          prop: "val2",
          label: "多选",
          component: {
            name: "el-checkbox",
            options: [
              {
                value: "选项1",
                label: "黄金糕",
              },
              {
                value: "选项2",
                label: "双皮奶",
              },
            ],
          },
          rules: [
            { required: true, message: "请输入活动名称", trigger: "change" },
          ],
        },
        {
          prop: "val3",
          label: "筛选框",
          component: {
            name: "el-select",
            options: [
              {
                value: "选项1",
                label: "黄金糕",
              },
              {
                value: "选项2",
                label: "双皮奶",
              },
            ],
          },
          rules: [
            { required: true, message: "请输入活动名称", trigger: "change" },
          ],
        },
        {
          label: "分栏",
          required: true,
          fields: [
            {
              component: {
                name: "el-input",
                placeholder: "请填写",
              },
              prop: "val4",
              span: 4,
              rules: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                {
                  min: 3,
                  max: 5,
                  message: "长度在 3 到 5 个字符",
                  trigger: "blur",
                },
              ],
            },
            {
              component: "el-input",
              prop: "val5",
              style: { marginLeft: "20px" },
              span: 4,
              rules: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                {
                  min: 3,
                  max: 5,
                  message: "长度在 3 到 5 个字符",
                  trigger: "blur",
                },
              ],
            },
          ],
        },
        {
          prop: "val6",
          component: "el-date-picker",
          label: "日期",
          rules: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
          ],
        },
        {
          component: [
            {
              name: "el-button",
              type: "primary",
              innerText: "提交",
              loading: this.loading,
              click: () => this.$refs.form.validate(),
            },
            {
              name: "el-button",
              innerText: "查看",
              isShow: false,
            },
          ],
        },
      ];
    },
  },
};
</script>
