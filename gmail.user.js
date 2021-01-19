// ==UserScript==
// @name         Gmail Local Pictures Viewer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Directly access pictures on local sites
// @author       MoonFruit
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function reload() {
        Array.from(document.images).forEach(function(img, index) {
            let results = img.src.match(/https?:\/\/.*?\.googleusercontent\.com\/proxy\/.*?#((https?):\/\/(.*?)\/.*)/);
            if (results) {
                if (results[3].startsWith('10.')) {
                    if (results[2] === "https") {
                        img.src = results[1];
                    } else {
                        img.src = 'https://10.1.2.32/proxy/x/' + results[1];
                    }
                }
            }
        });
    }

    window.addEventListener('load', event => setTimeout(reload, 200));
    document.addEventListener('click', event => setTimeout(reload, 100));
})();
