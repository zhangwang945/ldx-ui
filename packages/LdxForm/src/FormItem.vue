<script>
export default {
  name: "FormItem",
  inject: ["ldxFormInstance", "ChildFormItem", "updateFormState", "formState"],
  props: {
    info: {},
    value: {},
  },
  render(c) {
    const { span = 24, component, fields = [], ...attrs } = this.info,
      prop = this.info.prop,
      _components = [],
      compType = Object.prototype.toString.call(component);
    if (compType === "[object String]") {
      _components.push({ name: component });
    } else if (compType === "[object Array]") {
      _components.push(...component);
    } else if (compType === "[object Object]") {
      _components.push(component);
    }

    // el-radio el-checkbox el-select处理函数
    const specialComponentRender = {
      "el-radio": (info) => {
        const { attrs, events = {}, slot, options = [] } = info;
        return c(
          "el-radio-group",
          { attrs, on: events, props: { value: this.formState[prop] }, slot },
          [
            options.map(({ value, label, ...attrs }) =>
              c("el-radio", { attrs, props: { label: value } }, [label])
            ),
          ]
        );
      },
      "el-checkbox": (info) => {
        const { attrs, events = {}, slot, options = [] } = info;
        if (!Array.isArray(this.formState[prop]))
          this.updateFormState(prop, []);
        return c(
          "el-checkbox-group",
          { attrs, on: events, props: { value: this.formState[prop] }, slot },
          [
            options.map(({ value, label, ...attrs }) =>
              c("el-checkbox", { attrs, props: { label: value } }, [label])
            ),
          ]
        );
      },
      "el-select": (info) => {
        const { attrs, events = {}, slot, options = [] } = info;
        return c(
          "el-select",
          { attrs, on: events, props: { value: this.formState[prop] }, slot },
          options.map(({ value, label, ...attrs }) => {
            return c("el-option", {
              attrs,
              props: {
                key: value,
                value,
                label,
              },
            });
          })
        );
      },
    };

    const children = _components.reduce((arr, item) => {
      const { name, slot, innerText, options, isShow = true, ...attrs } = item;
      if (item && isShow) {
        const specialComponent = specialComponentRender[name];
        const eventsMap = Object.keys(attrs).reduce(
          (events, key) => {
            const val = attrs[key];
            if (typeof val === "function") {
              events[key] = val;
            }
            return events;
          },
          { input: (v) => this.updateFormState(prop, v) }
        );
        if (specialComponent) {
          arr.push(
            specialComponent({ attrs, events: eventsMap, slot, options })
          );
        } else {
          arr.push(
            c(
              name,
              {
                attrs,
                props: { value: this.formState[prop], options },
                on: eventsMap,
                slot,
              },
              [innerText]
            )
          );
        }
      }
      return arr;
    }, []);
    fields.forEach((info) => {
      children.push(c(this.ChildFormItem, { props: { info } }));
    });
    const formItem = c("el-form-item", { attrs }, children);
    if (this.ldxFormInstance.inline) {
      return formItem;
    }

    return c("el-col", { props: { span } }, [formItem]);
  },
};
</script>
