/**
 * GG search: pino ts
 * Source:
 * - https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/
 * - https://github.com/pinojs/pino
 * 
 */

import pino from 'pino';
const __dirname = import.meta.dirname;


const fileTransport = pino.transport({
    target: 'pino/file',
    options: { destination: `${__dirname}/test_pino.log` },
});

const logger1 = pino({
    level: 'info',
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        },
    },
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,

},
    fileTransport
);


logger1.info("hello")


function alwaysThrowError() {
    throw new Error('processing error');
}

try {
    alwaysThrowError();
} catch (err) {
    logger1.error(err, 'An unexpected error occurred while processing the request');
}