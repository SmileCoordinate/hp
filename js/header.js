document.addEventListener('DOMContentLoaded', function () {
    // HTML内の script を実行する関数
    function executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            // 属性をコピー
            Array.from(oldScript.attributes).forEach(attr =>
                newScript.setAttribute(attr.name, attr.value)
            );
            // script本体（inlineなら）をコピー
            newScript.textContent = oldScript.textContent;
            oldScript.replaceWith(newScript); // 差し替え
        });
    }

    // ヘッダー読み込み
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = data;
                executeScripts(headerPlaceholder); // 追加！

                // ヘッダー内のJS処理
                const nav = document.getElementById('navArea');
                const btn = document.querySelector('.toggle_btn');
                const mask = document.getElementById('mask');
                const openClass = 'open';

                if (btn && nav) {
                    btn.addEventListener('click', function () {
                        nav.classList.toggle(openClass);
                    });
                }

                if (mask && nav) {
                    mask.addEventListener('click', function () {
                        nav.classList.remove(openClass);
                    });
                }

                window.toggleChatWindow = function () {
                    const chatWindow = document.getElementById("chat-window");
                    if (chatWindow) {
                        chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "block" : "none";
                    }
                };
            }
        });

    // フッター読み込み
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
                executeScripts(footerPlaceholder); // 追加！

                const yearSpan = document.getElementById('year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            }
        });
});