<script>
import ELEMENT from "element-ui";

export default {
  mixins: [ELEMENT.CascaderPanel],
  methods: {
    clearActivePath(){
      this.activePath = [];
      this.menus = [this.menus[0]];
      this.syncActivePath();
    }
  }
};
</script>