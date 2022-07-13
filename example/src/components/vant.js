import Vue from 'vue';
import {
    Pagination, Toast, Button, Calendar, Grid, GridItem, Cell, Field, Tag,
    Switch, NavBar, Tabbar, TabbarItem, Search, Radio, ActionSheet, Popup, Swipe,
    SwipeItem, Picker, Progress, Lazyload, DatetimePicker, Loading, Notify, List,
    Sticky, Image, ImagePreview, Icon, Skeleton, Collapse, CollapseItem, Overlay,
    Tabs, Tab, Empty, DropdownMenu, DropdownItem, PullRefresh, Dialog, Uploader, Slider, Form
} from 'vant';
export default class RegisterVantComponent {
    static register () {
        Vue.component("van-empty", Empty)
        Vue.component("van-dropdown-menu", DropdownMenu)
        Vue.component("van-dropdown-item", DropdownItem)
        Vue.component("van-pull-refresh", PullRefresh)
        Vue.component("van-dialog", Dialog.Component)
        Vue.component("van-uploader", Uploader)
        Vue.component("van-slider", Slider)
        Vue.component("van-pagination", Pagination)
        Vue.component("van-button", Button)
        Vue.component("van-calendar", Calendar)
        Vue.component("van-grid", Grid)
        Vue.component("van-grid-item", GridItem)
        Vue.component("van-cell", Cell)
        Vue.component("van-skeleton", Skeleton)
        Vue.component("van-field", Field)
        Vue.component("van-form", Form)
        // Vue.component("van-header",Header)
        Vue.component("van-tag", Tag)
        Vue.component("van-switch", Switch)
        Vue.component("van-list", List)
        Vue.component("van-sticky", Sticky)
        Vue.component("van-icon", Icon)
        Vue.component("van-image", Image)
        Vue.component("van-image-preview", ImagePreview.Component)
        // Vue.component("van-tab-container",TabContainer)
        Vue.component("van-nav-bar", NavBar)
        Vue.component("van-tabbar", Tabbar)
        Vue.component("van-tabbar-item", TabbarItem)
        Vue.component("van-search", Search)
        // Vue.component("van-checklist",Checklist)
        Vue.component("van-radio", Radio)
        // Vue.component("van-loadmore",Loadmore)
        Vue.component("van-action-sheet", ActionSheet)
        Vue.component("van-popup", Popup)
        Vue.component("van-swipe", Swipe)
        Vue.component("van-swipe-item", SwipeItem)
        // Vue.component("van-range",Range)
        Vue.component("van-picker", Picker)
        Vue.component("van-progress", Progress)
        // Vue.component("van-infinite-scroll",InfiniteScroll)
        Vue.component("van-lazyload", Lazyload)
        Vue.component("van-datetime-picker", DatetimePicker)
        Vue.component("van-collapse", Collapse)
        Vue.component("van-collapse-item", CollapseItem)
        Vue.component("van-overlay", Overlay)
        Vue.component("van-loading", Loading)
        Vue.component("van-tabs", Tabs)
        Vue.component("van-tab", Tab)


        // Vue.component("van-index-list",IndexList)
        // Vue.component("van-index-section",IndexSection)
        // Vue.component("van-palette-button",PaletteButton)       

        Vue.prototype.$toast = Toast;
        Vue.prototype.$loading = Loading;
        Vue.prototype.$notify = Notify;
        Vue.prototype.$dialog = Dialog
        Vue.prototype.$preview = ImagePreview

        window.$toast = Toast;
        window.$notify = Notify;
        window.$dialog = Dialog;
        window.ImagePreview = ImagePreview
    }
}