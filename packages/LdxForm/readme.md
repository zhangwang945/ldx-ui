#### 组件使用
```
    <LdxForm
      :model="formState"
      :fields="fields"
      label-width="100px"
      ref="form"
    />
```
#### 组件参数


##### 属性
- fields：fieldItem[] 表单配置参数
- model：object 状态集(最好写上默认属性，利于性能，复杂数据类型的数据需要声明)
- 其它同el-form的属性

###### fieldItem
- component: string | componentItem | componentItem[] 渲染的组件
- span: number(同el-col) 分栏
- 其他参数同el-form-item

###### componentItem
- name: string | ComponentDefinition | ComponentConstructor
- options：{label:xx,value:xx}[] 多个选项时
- innerText：string 组件的文字内容
- isShow：boolean 是否展示 默认是
- slot：string 插槽名称，需要组件放到对应的插槽时使用
- 其他属性及事件同对应组件的属性和事件
- 注：**所有组件默认会绑定v-model来变更状态**，当自定义组件时需要支持v-model，单选、多选、下拉框直接使用name:el-radio | el-checkbox | el-select

##### event
- 同el-form的事件

##### method
- 同el-form的方法

#### 示例1
```
[
        {
          prop: "val1",
          label: "单选",
          component: {
            name: "el-radio",
            options: [
              {
                value: "选项1",
                label: "黄金糕"
              },
              {
                value: "选项2",
                label: "双皮奶"
              }
            ]
          },
          rules: [
            { required: true, message: "请输入活动名称", trigger: "change" }
          ]
        },
        {
          prop: "val2",
          label: "多选",
          component: {
            name: "el-checkbox",
            options: [
              {
                value: "选项1",
                label: "黄金糕"
              },
              {
                value: "选项2",
                label: "双皮奶"
              }
            ]
          },
          rules: [
            { required: true, message: "请输入活动名称", trigger: "change" }
          ]
        },
        {
          prop: "val3",
          label: "筛选框",
          component: {
            name: "el-select",
            options: [
              {
                value: "选项1",
                label: "黄金糕"
              },
              {
                value: "选项2",
                label: "双皮奶"
              }
            ]
          },
          rules: [
            { required: true, message: "请输入活动名称", trigger: "change" }
          ]
        },
        {
          label: "分栏",
          fields: [
            {
              component: {
                name: "el-input",
                placeholder: "请填写"
              },
              prop: "val4",
              span: 4,
              rules: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                {
                  min: 3,
                  max: 5,
                  message: "长度在 3 到 5 个字符",
                  trigger: "blur"
                }
              ]
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
                  trigger: "blur"
                }
              ]
            }
          ]
        },
        {
          prop: "val6",
          component: "el-date-picker",
          label: "日期",
          rules: [
            { required: true, message: "请输入活动名称", trigger: "blur" }
          ]
        },
        {
          component: [
            {
              name: "el-button",
              type: "primary",
              innerText: "提交",
              loading: this.loading,
              click: () => this.$refs.form.validate()
            },
            {
              name: "el-button",
              innerText: "查看",
              isShow: false
            }
          ]
        }
      ]
```



#### 完整示例

```
<template>
  <LdxForm :model="formState" :fields="fields" label-width="100px" ref="form" />
</template>

<script>
import LdxForm from "@/components/LdxForm";

export default {
  name: "kline",
  components: { LdxForm },
  data() {
    return {
      formState: {},
      loading: false
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
                label: "黄金糕"
              },
              {
                value: "选项2",
                label: "双皮奶"
              }
            ]
          },
          rules: [
            { required: true, message: "请输入活动名称", trigger: "change" }
          ]
        },
        {
          prop: "val2",
          label: "多选",
          component: {
            name: "el-checkbox",
            options: [
              {
                value: "选项1",
                label: "黄金糕"
              },
              {
                value: "选项2",
                label: "双皮奶"
              }
            ]
          },
          rules: [
            { required: true, message: "请输入活动名称", trigger: "change" }
          ]
        },
        {
          prop: "val3",
          label: "筛选框",
          component: {
            name: "el-select",
            options: [
              {
                value: "选项1",
                label: "黄金糕"
              },
              {
                value: "选项2",
                label: "双皮奶"
              }
            ]
          },
          rules: [
            { required: true, message: "请输入活动名称", trigger: "change" }
          ]
        },
        {
          label: "分栏",
          required: true,
          fields: [
            {
              component: {
                name: "el-input",
                placeholder: "请填写"
              },
              prop: "val4",
              span: 4,
              rules: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                {
                  min: 3,
                  max: 5,
                  message: "长度在 3 到 5 个字符",
                  trigger: "blur"
                }
              ]
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
                  trigger: "blur"
                }
              ]
            }
          ]
        },
        {
          prop: "val6",
          component: "el-date-picker",
          label: "日期",
          rules: [
            { required: true, message: "请输入活动名称", trigger: "blur" }
          ]
        },
        {
          component: [
            {
              name: "el-button",
              type: "primary",
              innerText: "提交",
              loading: this.loading,
              click: () => this.$refs.form.validate()
            },
            {
              name: "el-button",
              innerText: "查看",
              isShow: false
            }
          ]
        }
      ];
    }
  }
};
</script>
```
