#!/usr/bin/env node

"use strict";
const path = require("path"),
    run = require(path.join(__dirname, "..")),
    process = require("process");
if (process.stdin.isTTY) {
    require("yargs")
        .usage(`$0: ${require(path.join(__dirname, "..",'package.json')).description}`)
        .usage("Usage: echo 'Mâyâ Tchândâla xârâcùù' | $0")
        .option('h', {
            alias: 'help',
            type: 'boolean'
        })
        .help('h')
        .argv
} else {
    run(process.stdin, null, process.stdout)
}