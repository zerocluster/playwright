import playwright from "@softvisio/playwright";
import NginxApi from "#core/api/nginx";

export default class {
    #app;
    #config;
    #nginxApi;

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
        var res;

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
        if ( this.config.nginx.enabled ) {
            this.#nginxApi = new NginxApi( {
                "apiUrl": this.config.nginx.apiUrl,
                "proxyId": this.app.env.name + "-playwright-server",
                "proxyOptions": {
                    "upstreamPort": this.config.port,
                    "serverNames": this.config.nginx.serverNames,
                    "servers": [
                        {
                            "port": this.config.port,
                            "type": "http",
                        },
                    ],
                },
            } );

            res = await this.#nginxApi.start();
            if ( !res.ok ) return res;
        }

        return result( 200 );
    }
}
