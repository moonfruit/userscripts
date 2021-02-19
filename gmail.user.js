// ==UserScript==
// @name         Gmail Local Pictures Viewer
// @namespace    https://github.com/moonfruit/userscripts
// @version      0.5
// @description  Directly access pictures on local sites
// @author       MoonFruit
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const re = /https?:\/\/.*?\.googleusercontent\.com\/proxy\/.*?#((https?):\/\/(.*?)\/.*)/;
    const proxy = 'https://10.1.2.32/proxy/x/';

    const callback = function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.target instanceof HTMLImageElement) {
                let img = mutation.target;
                let groups = img.src.match(re);
                if (groups) {
                    if (groups[3].startsWith('10.') || groups[3].endsWith('.gingkoo')) {
                        if (groups[2] === "https") {
                            img.src = groups[1];
                        } else {
                            img.src = proxy + groups[1];
                        }
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(callback);
    observer.observe(document.body, { attributes: true, subtree: true });
})();
