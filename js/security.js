document.addEventListener('DOMContentLoaded', function () {
    // カスタムコンテキストメニューの生成
    let customContextMenu = document.getElementById('custom-context-menu');

    if (!customContextMenu) {
        customContextMenu = document.createElement('div');
        customContextMenu.id = 'custom-context-menu';

        // スタイル設定
        Object.assign(customContextMenu.style, {
            position: 'fixed',
            color: 'var(--text)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--sub)',
            borderRadius: '10px',
            padding: '10px',
            display: 'none',
            zIndex: '1000',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            fontSize: '14px',
            whiteSpace: 'nowrap',
        });

        // メニュー項目の作成
        const menuItem1 = document.createElement('div');
        menuItem1.textContent = 'このサイトでは右クリック動作を行えません。';
        menuItem1.style.padding = '4px 10px';
        customContextMenu.appendChild(menuItem1);

        const menuItem2 = document.createElement('div');
        menuItem2.textContent = 'Right-click operation is not available on this site.';
        menuItem2.style.padding = '4px 10px';
        customContextMenu.appendChild(menuItem2);

        document.body.appendChild(customContextMenu);
    }

    // 右クリック時に表示
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();

        // 位置をウィンドウ内に収める（画面端対策）
        const menuWidth = 250;
        const menuHeight = 60;
        const x = Math.min(e.clientX, window.innerWidth - menuWidth);
        const y = Math.min(e.clientY, window.innerHeight - menuHeight);

        customContextMenu.style.left = x + 'px';
        customContextMenu.style.top = y + 'px';
        customContextMenu.style.display = 'block';
    });

    // 他クリックでメニューを非表示
    document.addEventListener('click', function (e) {
        if (!customContextMenu.contains(e.target)) {
            customContextMenu.style.display = 'none';
        }
    });
});
