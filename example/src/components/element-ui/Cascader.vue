<script>
import ELEMENT from "element-ui";
import ElCascaderPanel from "./CascaderPanel";
export default {
  mixins: [ELEMENT.Cascader],
  components: {
    ElCascaderPanel
  },
  methods: {
    toggleDropDownVisible(visible) {
        if (this.isDisabled) return;
        const { dropDownVisible } = this;
        const { input } = this.$refs;
        visible = this.isDef(visible) ? visible : !dropDownVisible;
        if (visible !== dropDownVisible) {
            this.dropDownVisible = visible;
            if (visible) {
                this.$nextTick(() => {
                    this.updatePopper();
                    this.panel.scrollIntoView();
                });
            } else {
                this.panel.clearActivePath();
            }
            input.$refs.input.setAttribute('aria-expanded', visible);
            this.$emit('visible-change', visible);
        }
    },
    isDef(val) {
        return val !== undefined && val !== null;
    }
  }
};
</script>