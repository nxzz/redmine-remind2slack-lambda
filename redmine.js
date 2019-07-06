'use strict';
/*
The MIT License (MIT)

Copyright 2019 Rimpei Kunimoto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

const http = require('http');
const URL = require('url').URL;

module.exports = () => new Promise((resolve, reject) => {
    const redmineUrl = new URL(process.env.REDMINEURL + '/issues.json');
    redmineUrl.method = 'GET';

    redmineUrl.searchParams.append('key', process.env.REDMINEAPIKEY);
    const today = new Date();
    redmineUrl.searchParams.append('due_date', `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`);

    const req = http.get(redmineUrl, function (res) {
        let data = [];

        res.on('data', chunk => {
            data.push(chunk);
        });

        res.on('end', () => {
            let issues = JSON.parse(Buffer.concat(data));
            resolve(issues);
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
        reject(500);
    });
});