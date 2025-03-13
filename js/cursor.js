//cursor
(function ($) {
    $(document).ready(function () {
        // 遅れてついてくるストーカー要素
        var stalker = $("#stalker");
        // リンクと.accordion-wrapにホバーした時にクラス追加、離れたらクラス削除
        $("a,button,.accordion-wrap,.step").hover(
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
                    "left": x + "px",
                    "z-index": "10000"
                });
            }, 50);
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

    $(document).ready(function () {
        var noticeBar = $('.notice-bar');

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) { // スクロール位置が100ピクセルを超えたら
                noticeBar.addClass('hidden'); // バーを非表示にするためのクラスを追加
            } else {
                noticeBar.removeClass('hidden'); // それ以外の場合はバーを表示するためのクラスを削除
            }
        });
    });
})(jQuery);


(function () {
    window.addEventListener('load', function () {
        let elementsToShow = document.querySelectorAll('.fade_bottom');
        let ticking = false;

        function isVisible(element) {
            let elementRect = element.getBoundingClientRect();
            let elementTop = elementRect.top;
            let elementBottom = elementRect.bottom;

            return (elementTop < window.innerHeight * 0.8) && (elementBottom > 0.2);
        }

        function checkScroll() {
            elementsToShow.forEach(function (element) {
                if (isVisible(element)) {
                    element.classList.add('visible');
                } else {
                    element.classList.remove('visible');
                }
            });
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(checkScroll);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', checkScroll);

        checkScroll(); // 初回チェック
    });
})();
