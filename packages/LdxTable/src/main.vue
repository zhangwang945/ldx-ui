<template>
  <div>
    <el-table
      ref="table"
      :data="data"
      :border="border"
      v-bind="$attrs"
      :height="tableHeight"
      :size="size"
    >
      <template v-slot:append>
        <slot name="append"></slot>
      </template>
      <TableColumn
        v-for="(item, index) in columns"
        v-bind="item"
        :key="index"
      />
    </el-table>
    <div style="overflow: hidden" ref="paginationWrapper">
      <el-pagination
        style="margin-top: 20px"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :layout="layout"
        :total="total"
        :size="size"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import TableColumn from "./TableColumn.vue";

const tableMethods = [
  "clearSelection",
  "toggleRowSelection",
  "toggleAllSelection",
  "toggleRowExpansion",
  "setCurrentRow",
  "clearSort",
  "clearFilter",
  "doLayout",
  "sort",
].reduce((wrap, key) => {
  wrap[key] = function (...args) {
    this.$refs.table[key](...args);
  };
  return wrap;
}, {});

export default {
  name: "LdxTable",
  components: { TableColumn },
  props: {
    columns: Array,
    data: Array,
    pageSize: Number,
    total: Number,
    currentPage: Number,
    border: {
      default: true,
    },
    size: {
      default: "medium",
    },
    layout: {
      default: "total, sizes, prev, pager, next, jumper",
    },
    height: {},
  },
  provide: {
    ChildTableColumn: TableColumn,
  },
  data() {
    const size = this.pageSize;
    return {
      pageSizes: [size, size * 2, size * 3, size * 4],
      paginationHeight: 0,
    };
  },
  computed: {
    tableHeight() {
      return this.height && this.height - this.paginationHeight;
    },
  },
  watch: {},
  mounted() {
    this.paginationHeight = this.$refs.paginationWrapper.offsetHeight;
  },
  methods: {
    ...tableMethods,
    handleSizeChange(val) {
      this.$emit("update:pageSize", val);
      if (this.currentPage === 1) this.$emit("getList");
    },
    handleCurrentChange(val) {
      this.$emit("update:currentPage", val);
      this.$emit("getData");
    },
  },
};
</script>
