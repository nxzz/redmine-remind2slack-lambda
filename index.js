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

const slack = require('./slack');
const redmine = require('./redmine');

exports.handler = function (event, context, callback) {
    redmine().then(res => {
        if (res.total_count === 0) return callback(null);
        let msg = "以下のチケットが本日締め切りです\n";
        for (const issue of res.issues) {
            msg += `[${issue.project.name}] ${issue.subject} ${process.env.REDMINEURL}/issues/${issue.id}\n`;
        }
        slack("redmine", msg).then(status => {
            callback(null, {
                statusCode: status
            });
        }).catch(error => {
            callback(null, {
                statusCode: error
            });
        });
    });
};
