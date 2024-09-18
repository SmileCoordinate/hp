//cursor
(function($) {
    $(document).ready(function() {
        // 遅れてついてくるストーカー要素
        var stalker = $("#stalker");
        // リンクと.accordion-wrapにホバーした時にクラス追加、離れたらクラス削除
        $("a,.accordion-wrap,#chat-icon").hover(
            function () {
                stalker.addClass('stalker--hover');
            },
            function () {
                stalker.removeClass('stalker--hover');
            }
        );

        // 初期表示されるカーソルを非表示にする
        stalker.css("opacity", "0");

        // mousemoveイベントでカーソル要素を移動させる
        $(document).on("mousemove", function (e) {
            var x = e.clientX;
            var y = e.clientY;
            setTimeout(function () {
                stalker.css({
                    "opacity": "1",
                    "top": y + "px",
                    "left": x + "px"
                });
            }, 150);
        });

        // キーを押したとき
        $(window).on('keydown', function (e) {
            var keyCode = e.keyCode;

            if (keyCode == 16 || keyCode == 44 || keyCode == 91 || keyCode == 92) {
                $('img').hide();
                return false;
            }
        });

        // キーを離したとき
        $(window).on('keyup', function () {
            $('img').show();
        });
    });

    $(document).ready(function() {
        var noticeBar = $('.notice-bar');

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) { // スクロール位置が100ピクセルを超えたら
                noticeBar.addClass('hidden'); // バーを非表示にするためのクラスを追加
            } else {
                noticeBar.removeClass('hidden'); // それ以外の場合はバーを表示するためのクラスを削除
            }
        });
    });
})(jQuery);


//左上ニュース
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var elementsToShow = document.querySelectorAll('.fade_bottom');

        function isVisible(element) {
            // 要素が表示されるかどうかをチェック
            var elementRect = element.getBoundingClientRect();
            var elementTop = elementRect.top;
            var elementBottom = elementRect.bottom;

            return (elementTop < window.innerHeight * 0.7) && (elementBottom > 0);
        }

        function checkScroll() {
            elementsToShow.forEach(function(element) {
                if (isVisible(element)) {
                    element.classList.add('visible');
                }
            });
        }

        // requestAnimationFrameを使ってスクロールイベントを最適化
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    checkScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // ページロード時に最初のチェック
        checkScroll();
    });
})();
