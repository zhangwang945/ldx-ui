<script>
export default {
  name: "TableColumn",
  inject: ["ChildTableColumn"],
  props: {
    columns: Array,
    component: {},
  },
  computed: {
    _components() {
      const component = this.component;
      if (!component) {
        return;
      } else if (Array.isArray(component)) {
        return component.length ? component : undefined;
      } else {
        return [component];
      }
    },
  },
  methods: {},
  render(c) {
    let columns = this.columns,
      scopedSlots;
    // 列处理
    if (columns) {
      columns = columns.map((item, index) =>
        c(this.ChildTableColumn, { attrs: item, key: index })
      );
    }
    // 传入组件时,作用于插槽处理
    if (this._components) {
      const wrap = {};
      this._components.forEach((item, index) => {
        const {
          name,
          innerText = "",
          isShow = true,
          slot = "default",
          ...attrs
        } = item;
        const isDefaultSlot = slot === "default";

        if (!wrap[slot]) {
          wrap[slot] = [];
        }
        wrap[slot].push((scope) => {
          const eventsMap = Object.keys(attrs).reduce(
            (events, key) => {
              const val = attrs[key];
              if (typeof val === "function") {
                events[key] = (...args) => val(scope, ...args);
              }
              return events;
            },
            isDefaultSlot
              ? { input: (v) => (scope.row[scope.column.property] = v) }
              : {}
          );
          const _attrs = { ...attrs }; //临时缓存，否则组件会发生type丢失情况
          const props = {
            scopeData: scope,
          };
          if (isDefaultSlot) props.value = scope.row[scope.column.property];
          return (
            isShow &&
            c(
              name,
              {
                key: index,
                attrs: _attrs,
                props,
                on: { ...eventsMap },
              },
              [innerText]
            )
          );
        });
      });
      scopedSlots = Object.keys(wrap).reduce((scopeWrap, key) => {
        scopeWrap[key] = (scope) => {
          return wrap[key].map((func) => func(scope));
        };
        return scopeWrap;
      }, {});
      scopedSlots = Object.keys(wrap).reduce((scopeWrap, key) => {
        scopeWrap[key] = (scope) => {
          return wrap[key].map((func) => func(scope));
        };
        return scopeWrap;
      }, {});
    }
    return c(
      "el-table-column",
      {
        attrs: this.$attrs,
        scopedSlots,
      },
      columns
    );
  },
};
</script>
