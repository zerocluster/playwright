import playwright from "@softvisio/playwright";
import App from "#core/app";

export default class extends App {

    // propeties
    get location () {
        return import.meta.url;
    }

    // protected
    async _init () {
        return result( 200 );
    }

    async _start () {
        await playwright.chromium.launchServer( {
            "headless": true,
            "port": this.config.port,
            "wsPath": this.config.chromePath,
            "handleSIGHUP": true,
            "handleSIGINT": true,
            "handleSIGTERM": true,
        } );

        console.log( "Chrome: ws://0.0.0.0:" + this.config.port + this.config.chromePath );

        return result( 200 );
    }
}
