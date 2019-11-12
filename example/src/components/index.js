import RegisterELComponent from './element.js'
import RegisterWDComponent from './widgets.js'
export default class RegisterBSComponents {
    static register() {
        RegisterELComponent.register();
        RegisterWDComponent.register();
    }
}