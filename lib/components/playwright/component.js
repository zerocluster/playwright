import Playwright from "./playwright.js";

export default Super =>
    class extends Super {

        // protected
        async _install () {
            return new Playwright( this.app, this.config );
        }

        async _start () {
            return this.instance.start();
        }
    };
