$(function() {
    // ヘッダー読み込み
    $("#header-placeholder").load("header.html", function() {
        // ヘッダー内スクリプト
        var $nav = $('#navArea');
        var $btn = $('.toggle_btn');
        var $mask = $('#mask');
        var open = 'open'; // クラス名

        $btn.on('click', function() {
            if (!$nav.hasClass(open)) {
                $nav.addClass(open);
            } else {
                $nav.removeClass(open);
            }
        });

        $mask.on('click', function() {
            $nav.removeClass(open);
        });

        window.toggleChatWindow = function() {
            var chatWindow = document.getElementById("chat-window");
            chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "block" : "none";
        };
    });

    // フッター読み込み
    $("#footer-placeholder").load("footer.html", function() {
        // フッター内スクリプト
        var yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    });
});