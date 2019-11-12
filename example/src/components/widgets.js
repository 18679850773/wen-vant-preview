import Vue from 'vue';
import bsTreeSingleSelect from "./widgets/tree-select/tree-single-select.vue";

export default class RegisterBSComponents {
    static register() {
        Vue.component("bs-tree-single-select", bsTreeSingleSelect)
    }
}