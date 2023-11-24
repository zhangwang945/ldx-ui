<template>
  <LdxTable
    :columns="columns"
    :data="tableData"
    :pageSize.sync="pageSize"
    :total="total"
    :currentPage.sync="currentPage"
  >
    <template v-slot:append>
      <div>table作用域插槽</div>
    </template>
  </LdxTable>
</template>
<script>
// import LdxTable from "@/components/LdxTable";

export default {
  name: "exampleTable",
  // components: { LdxTable },
  data() {
    return {
      trainingData: null,
      downloading: false,
      pageSize: 20,
      currentPage: 1,
      total: 40,
      columns: [
        {
          type: "selection",
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
          width: 180,
          component: {
            name: "el-input",
            placeholder: "过滤条件",
            slot: "header",
          },
        },
        {
          prop: "address",
          label: "地址",
          component: "el-input",
        },
        {
          prop: "status",
          label: "操作",
          component: [
            {
              name: "el-button",
              type: "text",
              innerText: "添加",
              click: this.getList,
            },
            {
              name: "el-button",
              type: "text",
              innerText: "删除",
              isShow: false,
              click: this.getList,
            },
          ],
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: true,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          status: true,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          status: true,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          status: true,
        },
      ],
    };
  },
  methods: {
    async getList() {
      console.log(9999);
    },
  },
};
</script>
