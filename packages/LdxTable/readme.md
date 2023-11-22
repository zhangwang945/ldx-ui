### 组件使用
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
#### 组件参数

##### 属性
* el-pagination的属性支持：layout，total，pageSize，currentPage
* columns: columnsItem[] 表格列表项(columnsItem见下方)
* data：dataItem[] 表格数据(同el-table的data)
* pageSize：number 分页大小
* total: number 总数量
* currentPage：number 当前页
* height：number 组件高度
* 其他同el-table的属性



##### event
* 同el-table的事件
* getData: 获取数据事件（跳转或者更改页码时触发）

##### method
* 同el-table的方法
  
##### Scoped Slot
* 同el-table的插槽

###### columnsItem的属性
* el-table-column所有属性都支持
* component: componentItem | componentItem[]  传入的组件

###### componentItem的属性
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
