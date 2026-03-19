// ==UserScript==
// @name         GitHub JetBrains Launcher
// @namespace    http://tampermonkey.net/
// @version      1.2
// @author       danielhammerl
// @match        https://github.com/*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function createUI() {
        const container = document.createElement("div");
        container.style.position = "relative";
        container.style.display = "inline-flex";
        container.style.marginLeft = "8px";

        const mainBtn = document.createElement("button");
        mainBtn.textContent = "INTELLIJ";
        mainBtn.style.padding = "6px 12px";
        mainBtn.style.background = "#ff7a00";
        mainBtn.style.color = "white";
        mainBtn.style.border = "none";
        mainBtn.style.borderRadius = "6px 0 0 6px";
        mainBtn.style.fontWeight = "600";
        mainBtn.style.cursor = "pointer";

        const arrowBtn = document.createElement("button");
        arrowBtn.textContent = "▼";
        arrowBtn.style.padding = "6px 10px";
        arrowBtn.style.background = "#ff7a00";
        arrowBtn.style.color = "white";
        arrowBtn.style.border = "none";
        arrowBtn.style.borderLeft = "2px solid rgba(0,0,0,0.3)";
        arrowBtn.style.borderRadius = "0 6px 6px 0";
        arrowBtn.style.cursor = "pointer";

        const menu = document.createElement("div");
        menu.style.position = "absolute";
        menu.style.top = "100%";
        menu.style.left = "0";
        menu.style.background = "white";
        menu.style.border = "1px solid #ccc";
        menu.style.borderRadius = "6px";
        menu.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
        menu.style.display = "none";
        menu.style.minWidth = "140px";
        menu.style.zIndex = "9999";

        const jetbrainsApps = ["webstorm", "clion", "pycharm"];

        mainBtn.onclick = () => {
            const currentRepo = window.location.href;
            const url = `jetbrains://idea/checkout/git?checkout.repo=${encodeURIComponent(currentRepo)}`;
            window.open(url, "_blank");
        };

        jetbrainsApps.forEach(app => {
            const item = document.createElement("button");
            item.textContent = app;
            item.style.display = "block";
            item.style.width = "100%";
            item.style.padding = "8px";
            item.style.border = "none";
            item.style.background = "white";
            item.style.color = "black";
            item.style.textAlign = "left";
            item.style.cursor = "pointer";

            item.onmouseover = () => item.style.background = "#eee";
            item.onmouseout = () => item.style.background = "white";

            item.onclick = () => {
                const currentRepo = window.location.href;
                const url = `jetbrains://${app}/checkout/git?checkout.repo=${encodeURIComponent(currentRepo)}`;
                window.open(url, "_blank");
            };

            menu.appendChild(item);
        });

        arrowBtn.onclick = (e) => {
            e.stopPropagation();
            menu.style.display = menu.style.display === "none" ? "block" : "none";
        };

        document.addEventListener("click", () => {
            menu.style.display = "none";
        });

        container.appendChild(mainBtn);
        container.appendChild(arrowBtn);
        container.appendChild(menu);

        return container;
    }

    function run() {
        const buttons = Array.from(document.querySelectorAll("button"));
        const codeButton = buttons.find(b => b.textContent.trim().toLowerCase() === "code");

        const ui = createUI();

        if (codeButton) {
            codeButton.parentElement.appendChild(ui);
        }
    }

    window.addEventListener("load", run);
})();