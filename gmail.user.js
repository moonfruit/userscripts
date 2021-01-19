// ==UserScript==
// @name         Gmail Local Pictures Viewer
// @namespace    https://github.com/moonfruit/userscripts
// @version      0.3
// @description  Directly access pictures on local sites
// @author       MoonFruit
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let re = /https?:\/\/.*?\.googleusercontent\.com\/proxy\/.*?#((https?):\/\/(.*?)\/.*)/;
    let seen = new WeakSet();

    function reload() {
        Array.from(document.images).forEach(img => {
            if (seen.has(img)) {
                return;
            }
            seen.add(img);

            let groups = img.src.match(re);
            if (groups) {
                if (groups[3].startsWith('10.')) {
                    if (groups[2] === "https") {
                        img.src = groups[1];
                    } else {
                        img.src = 'https://10.1.2.32/proxy/x/' + groups[1];
                    }
                }
            }
        });
    }

    window.addEventListener('load', event => setTimeout(reload, 200));
    document.addEventListener('click', event => setTimeout(reload, 100));
})();
