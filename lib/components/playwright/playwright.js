import playwright from "@softvisio/playwright";

export default class {
    #app;
    #config;

    constructor ( app, config ) {
        this.#app = app;
        this.#config = config;
    }

    // properties
    get app () {
        return this.#app;
    }

    get config () {
        return this.#config;
    }

    // public
    async start () {
        await playwright.chromium.launchServer( {
            "headless": true,
            "port": this.config.port,
            "wsPath": this.config.chromePath,
            "handleSIGHUP": true,
            "handleSIGINT": true,
            "handleSIGTERM": true,
        } );

        console.log( "Chrome: ws://0.0.0.0:" + this.config.port + this.config.chromePath );

        // nginx upstream
        if ( this.config.nginx.enabled && this.app.nginxUpstream ) {
            await this.app.nginxUpstream.addProxy( "playwright-server", {
                "upstreamPort": this.config.port,
                "serverNames": this.config.nginx.serverNames,
                "servers": [
                    {
                        "port": this.config.port,
                        "type": "http",
                    },
                ],
            } );
        }

        return result( 200 );
    }
}
