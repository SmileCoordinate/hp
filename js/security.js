(function ($) {
    // 画像保護
    var customContextMenu = $('#custom-context-menu');

    if (customContextMenu.length === 0) {
        customContextMenu = $('<div id="custom-context-menu"></div>').appendTo('body');
        customContextMenu.css({
            'position': 'fixed',
            'color': 'var(--text)',
            'backgroundColor': 'rgba(255,255,255,0.1)',
            'backdrop-filter': 'blur(8px)',
            'border': '1px solid var(--sub)',
            'border-radius': '20px',
            'padding': '10px',
            //'mix-blend-mode': 'difference',
            'display': 'none',
            'zIndex': '1000'
        });

        // カスタムメニューに項目を追加
        var menuItem1 = $('<div>このサイトでは右クリック動作を行えません。</div>').appendTo(customContextMenu);
        menuItem1.on('click', function () {
            // メニュー項目1のクリック時の処理
            // ここに任意のコードを追加
        });

        var menuItem2 = $('<div>Right-click operation is not available on this site.</div>').appendTo(customContextMenu);
        menuItem2.on('click', function () {
            // メニュー項目2のクリック時の処理
            // ここに任意のコードを追加
        });
    }

    // 右クリック時のイベントハンドラ
    $(document).on('contextmenu', function (e) {
        e.preventDefault(); // デフォルトの右クリックメニューを無効化

        // カスタムメニューを表示
        customContextMenu.show().css({
            'left': e.clientX + 'px',
            'top': e.clientY + 'px'
        });
    });

    // ドキュメントのクリック時にカスタムメニューを非表示にするイベントハンドラ
    $(document).on('click', function (e) {
        // カスタムメニュー自体のクリックの場合は非表示にしない
        if (!customContextMenu.is(e.target) && customContextMenu.has(e.target).length === 0) {
            customContextMenu.hide();
        }
    });
})(jQuery);

