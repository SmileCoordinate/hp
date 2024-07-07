(function($) {
    $(document).ready(function() {
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
    });
})(jQuery);