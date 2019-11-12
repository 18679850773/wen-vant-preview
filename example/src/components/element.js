import Vue from 'vue';
import ELEMENT from 'element-ui';

import CascaderPanel from './element-ui/CascaderPanel'
import Cascader from './element-ui/Cascader';
import FormItem from './element-ui/FormItem.vue';

export default class RegisterBSComponents {
    static register() {
        Vue.component("bs-button",ELEMENT.Button)
        Vue.component("bs-row",ELEMENT.Row)
        Vue.component("bs-col",ELEMENT.Col)
        Vue.component("bs-container",ELEMENT.Container)
        Vue.component("bs-header",ELEMENT.Header)
        Vue.component("bs-aside",ELEMENT.Aside)
        Vue.component("bs-form",ELEMENT.Form)
        Vue.component("bs-form-item",FormItem)
        Vue.component("bs-radio-group",ELEMENT.RadioGroup)
        Vue.component("bs-radio",ELEMENT.Radio)
        Vue.component("bs-radio-button",ELEMENT.RadioButton)
        Vue.component("bs-checkbox-group",ELEMENT.CheckboxGroup)
        Vue.component("bs-checkbox",ELEMENT.Checkbox)
        Vue.component("bs-checkbox-button",ELEMENT.CheckboxButton)
        Vue.component("bs-input",ELEMENT.Input)
        Vue.component("bs-input-number",ELEMENT.InputNumber)
        Vue.component("bs-select",ELEMENT.Select)
        Vue.component("bs-cascader",Cascader)
        Vue.component("bs-switch",ELEMENT.Switch)
        Vue.component("bs-slider",ELEMENT.Slider)
        Vue.component("bs-time-select",ELEMENT.TimeSelect)
        Vue.component("bs-time-picker",ELEMENT.TimePicker)
        Vue.component("bs-date-picker",ELEMENT.DatePicker)
        Vue.component("bs-upload",ELEMENT.Upload)
        Vue.component("bs-rate",ELEMENT.Rate)
        Vue.component("bs-color-picker",ELEMENT.ColorPicker)
        Vue.component("bs-transfer",ELEMENT.Transfer)
        Vue.component("bs-option",ELEMENT.Option)
        Vue.component("bs-option-group",ELEMENT.OptionGroup)
        Vue.component("bs-table",ELEMENT.Table)
        Vue.component("bs-table-column",ELEMENT.TableColumn)
        Vue.component("bs-tab-pane",ELEMENT.TabPane)
        Vue.component("bs-tabs",ELEMENT.Tabs)
        Vue.component("bs-tag",ELEMENT.Tag)
        Vue.component("bs-tooltip",ELEMENT.Tooltip)
        Vue.component("bs-tree",ELEMENT.Tree)
        Vue.component("bs-progress",ELEMENT.Progress)
        Vue.component("bs-popover",ELEMENT.Popover)
        Vue.component("bs-pagination",ELEMENT.Pagination)
        Vue.component("bs-badge",ELEMENT.Badge)
        Vue.component("bs-alert",ELEMENT.Alert)
        Vue.component("bs-icon",ELEMENT.Icon)
        Vue.component("bs-scrollbar",ELEMENT.Scrollbar)

        Vue.use(ELEMENT.Loading.directive);

        Vue.prototype.$loading = ELEMENT.Loading.service;
        Vue.prototype.$msgbox = ELEMENT.MessageBox;
        Vue.prototype.$alert = ELEMENT.MessageBox.alert;
        Vue.prototype.$confirm = ELEMENT.MessageBox.confirm;
        Vue.prototype.$prompt = ELEMENT.MessageBox.prompt;
        Vue.prototype.$notify = ELEMENT.Notification;
        Vue.prototype.$message = ELEMENT.Message;
        window.$message = ELEMENT.Message;

        Vue.component("bs-menu",ELEMENT.Menu)
        Vue.component("bs-menu-item",ELEMENT.MenuItem)
        Vue.component("bs-menu-item-group",ELEMENT.MenuItemGroup)
        Vue.component("bs-dropdown-menu",ELEMENT.DropdownMenu)
        Vue.component("bs-dropdown",ELEMENT.Dropdown)
        Vue.component("bs-dropdown-item",ELEMENT.DropdownItem)
        Vue.component("bs-breadcrumb",ELEMENT.Breadcrumb)
        Vue.component("bs-breadcrumb-item",ELEMENT.BreadcrumbItem)
        Vue.component("bs-steps",ELEMENT.Steps)
        Vue.component("bs-step",ELEMENT.Step)
        Vue.component("bs-submenu",ELEMENT.Submenu)
        Vue.component("bs-dialog",ELEMENT.Dialog)
        Vue.component("bs-carousel-item",ELEMENT.CarouselItem)
        Vue.component("bs-carousel",ELEMENT.Carousel)
        Vue.component("bs-card",ELEMENT.Card)
        Vue.component("bs-collapse",ELEMENT.Collapse)
        Vue.component("bs-collapse-item",ELEMENT.CollapseItem)
        Vue.component("bs-autocomplete",ELEMENT.Autocomplete)
        Vue.component("bs-button-group",ELEMENT.ButtonGroup)
        Vue.component("bs-footer",ELEMENT.Footer)
        Vue.component("bs-divider",ELEMENT.Divider) //新增
        Vue.component("bs-cascader-panel",CascaderPanel) //新增
        Vue.component("bs-image",ELEMENT.Image)
        Vue.component("bs-main",ELEMENT.Main)

    }
}