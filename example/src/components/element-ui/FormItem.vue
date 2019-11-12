<script>
import ELEMENT from "element-ui";
import {regxRules} from '../rules.js'

const getPropByPath = function (obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};
export default {
    mixins: [ELEMENT.FormItem],
    methods: {
        getRules() {
            let formRules = this.form.rules;
            const selfRules = this.rules;
            const requiredRule = this.required !== undefined ? { required: !!this.required } : [];
            const prop = getPropByPath(formRules, this.prop || '');
            formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];
            formRules.map(e => {if(e.regx) {e.validator = regxRules}});  // 修改formRules对象，新增元素的validator属性
            return [].concat(selfRules || formRules || []).concat(requiredRule);
        }
    }
}
</script>