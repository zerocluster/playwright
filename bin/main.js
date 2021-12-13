#!/usr/bin/env node

import playwright from "@softvisio/playwright";

const CHROME_PORT = 80;
const CHROME_PATH = "/chrome";

await playwright.chromium.launchServer( {
    "headless": true,
    "port": CHROME_PORT,
    "wsPath": CHROME_PATH,
    "handleSIGHUP": true,
    "handleSIGINT": true,
    "handleSIGTERM": true,
} );

console.log( "Chrome: ws://0.0.0.0:" + CHROME_PORT + CHROME_PATH );
