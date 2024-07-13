$(function() {
    $("#header-placeholder").load("header.html", function() {
        // スクリプトをここに移動
        var $nav = $('#navArea');
        var $btn = $('.toggle_btn');
        var $mask = $('#mask');
        var open = 'open'; // クラス名

        // メニューの開閉
        $btn.on('click', function() {
            if (!$nav.hasClass(open)) {
                $nav.addClass(open);
            } else {
                $nav.removeClass(open);
            }
        });

        // マスクをクリックして閉じる
        $mask.on('click', function() {
            $nav.removeClass(open);
        });

        // ChatBot のスクリプト
        window.toggleChatWindow = function() {
            var chatWindow = document.getElementById("chat-window");
            chatWindow.style.display = (chatWindow.style.display === "none" || chatWindow.style.display === "") ? "block" : "none";
        };
    });
});
