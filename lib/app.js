import App from "#core/app";
import playwright from "@softvisio/playwright";

const CHROME_PORT = 80,
    CHROME_PATH = "/chrome";

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
            "port": CHROME_PORT,
            "wsPath": CHROME_PATH,
            "handleSIGHUP": true,
            "handleSIGINT": true,
            "handleSIGTERM": true,
        } );

        console.log( "Chrome: ws://0.0.0.0:" + CHROME_PORT + CHROME_PATH );

        return result( 200 );
    }
}
