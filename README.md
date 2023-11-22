- [install](#install)
- [use](#use)
- [table组件使用](#table组件使用)
  - [组件参数](#组件参数)
    - [属性](#属性)
    - [event](#event)
    - [method](#method)
    - [Scoped Slot](#scoped-slot)
      - [columnsItem的属性](#columnsitem的属性)
      - [componentItem的属性](#componentitem的属性)
    - [示例1](#示例1)
    - [示例2](#示例2)
    - [完整示例](#完整示例)
- [form组件使用](#form组件使用)
  - [组件参数](#组件参数-1)
    - [属性](#属性-1)
      - [fieldItem](#fielditem)
      - [componentItem](#componentitem)
    - [event](#event-1)
    - [method](#method-1)
    - [示例1](#示例1-1)
    - [完整示例](#完整示例-1)



## install
```
pnpm add ldx-ui
```


## use
```
import ldxUi from "ldx-ui";
vue.use(ldxUi)
```

## table组件使用
```
    <LdxTable
      :columns="columns"
      :data="tableData"
      :pageSize.sync="pageSize"
      :total="total"
      :currentPage.sync="currentPage"
      height="800"
      @getData="getList"
    />
```
### 组件参数

#### 属性
* el-pagination的属性支持：layout，total，pageSize，currentPage
* columns: columnsItem[] 表格列表项(columnsItem见下方)
* data：dataItem[] 表格数据(同el-table的data)
* pageSize：number 分页大小
* total: number 总数量
* currentPage：number 当前页
* height：number 组件高度
* 其他同el-table的属性



#### event
* 同el-table的事件
* getData: 获取数据事件（跳转或者更改页码时触发）

#### method
* 同el-table的方法
  
#### Scoped Slot
* 同el-table的插槽

##### columnsItem的属性
* el-table-column所有属性都支持
* component: componentItem | componentItem[]  传入的组件

##### componentItem的属性
* name: string | ComponentDefinition | ComponentConstructor  组件(该组件内部可以通过props中的scopeData获取作用域插槽数据)
* isShow：boolean 是否展示
* innerText: string 该组件插槽内容，可以用作按钮的名称
* slot：'header' 同el-table-column的自定义表头
* 其他属性同组件对应的属性
* 注：该组件对应的绑定事件，事件回调触发时第一个参数为作用域插槽传递过来的数据(数据格式见el-table中的作用域插槽)


#### 示例1
      columns: [
        {
          type: "selection"
        },
        {
          prop: "date",
          label: "日期",
          width: 180,
          sortable: true,
        },
        {
          prop: "name",
          label: "姓名",
          width: 180
        },
        {
          prop: "address",
          label: "地址"
        },
        {
          prop: "status",
          label: "操作",
          component: {
            name: "el-button",
            type: "text",
            innerText: "3333",
            click: this.getList
          }
        }
      ]

#### 示例2

      columns: [
        {
          type: "selection"
        },
        {
          prop: "date",
          label: "日期",
          width: 180,
          sortable: true
        },
        {
          prop: "name",
          label: "姓名",
          width: 180,
          component: {
            name: "el-input",
            placeholder: "过滤条件",
            slot: "header", //自定义表头
          }
        },
        {
          prop: "address",
          label: "地址"
        },
        {
          prop: "status",
          label: "操作",
          component: [
            {
              name: "el-button",
              type: "text",
              innerText: "添加",
              click: this.getList
            },
            {
              name: "el-button",
              type: "text",
              innerText: "删除",
              isShow:false,
              click: this.getList
            }
          ]
        }
      ],


#### 完整示例

```
<template>
  <LdxTable
    :columns="columns"
    :data="tableData"
    :pageSize.sync="pageSize"
    :total="total"
    :currentPage.sync="currentPage"
    height="800"
    @getData="getList"
  >
    <template v-slot:append>
      <div>table作用域插槽</div>
    </template>
  </LdxTable>
</template>
<script>
import LdxTable from "@/components/LdxTable";

export default {
  name: "example",
  components: { LdxTable },
  data() {
    return {
      trainingData: null,
      downloading: false,
      pageSize: 20,
      currentPage: 1,
      total: 40,
      columns: [
        {
          type: "selection"
        },
        {
          prop: "date",
          label: "日期",
          width: 180,
          sortable: true
        },
        {
          prop: "name",
          label: "姓名",
          width: 180,
          component: {
            name: "el-input",
            placeholder: "过滤条件",
            slot: "header"
          }
        },
        {
          prop: "address",
          label: "地址"
        },
        {
          prop: "status",
          label: "操作",
          component: [
            {
              name: "el-button",
              type: "text",
              innerText: "添加",
              click: this.getList
            },
            {
              name: "el-button",
              type: "text",
              innerText: "删除",
              isShow: false,
              click: this.getList
            }
          ]
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: true
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          status: true
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          status: true
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: true
        }
      ]
    };
  },
  methods: {
    async getList() {
      console.log(9999);
    }
  }
};
</script>

```



## form组件使用
```
    <LdxForm
      :model="formState"
      :fields="fields"
      label-width="100px"
      ref="form"
    />
```
### 组件参数


#### 属性
- fields：fieldItem[] 表单配置参数
- model：object 状态集(最好写上默认属性，利于性能，复杂数据类型的数据需要声明)
- 其它同el-form的属性

##### fieldItem
- component: string | componentItem | componentItem[] 渲染的组件
- span: number(同el-col) 分栏
- 其他参数同el-form-item

##### componentItem
- name: string | ComponentDefinition | ComponentConstructor
- options：{label:xx,value:xx}[] 多个选项时
- innerText：string 组件的文字内容
- isShow：boolean 是否展示 默认是
- slot：string 插槽名称，需要组件放到对应的插槽时使用
- 其他属性及事件同对应组件的属性和事件
- 注：**所有组件默认会绑定v-model来变更状态**，当自定义组件时需要支持v-model，单选、多选、下拉框直接使用name:el-radio | el-checkbox | el-select

#### event
- 同el-form的事件

#### method
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
