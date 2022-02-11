import App from "#core/app";
import config from "#lib/app.config";
import playwright from "@softvisio/playwright";

const CHROME_PORT = 80;
const CHROME_PATH = "/chrome";

export default class extends App {
    constructor () {
        super( import.meta.url, config );
    }

    // static
    static cli () {
        return {
            "options": {},
            "arguments": {},
        };
    }

    // public
    async run () {
        const res = await super.run();

        if ( !res.ok ) return res;

        await playwright.chromium.launchServer( {
            "headless": true,
            "port": CHROME_PORT,
            "wsPath": CHROME_PATH,
            "handleSIGHUP": true,
            "handleSIGINT": true,
            "handleSIGTERM": true,
        } );

        console.log( "Chrome: ws://0.0.0.0:" + CHROME_PORT + CHROME_PATH );

        return res;
    }

    // protected
    _initThreads () {
        return {
            "worker": {
                "num": 1,
                "path": new URL( "./threads/worker.js", import.meta.url ),
                "arguments": null,
            },
        };
    }

    _initPrivateHttpServer ( server ) {}

    _initPublicHttpServer ( server ) {
        server.webpack( "/", new URL( "../app/www", import.meta.url ) );
    }
}
