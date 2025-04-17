document.addEventListener('DOMContentLoaded', function () {
    const stalker = document.getElementById('stalker');
    const hoverTargets = document.querySelectorAll('a, button, .accordion-wrap, .step');
    const noticeBar = document.querySelector('.notice-bar');

    // 初期表示：カーソル非表示
    if (stalker) stalker.style.opacity = '0';

    // hover イベント
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            stalker?.classList.add('stalker--hover');
        });
        target.addEventListener('mouseleave', () => {
            stalker?.classList.remove('stalker--hover');
        });
    });

    // マウス移動でストーカー位置更新
    document.addEventListener('mousemove', function (e) {
        const x = e.clientX;
        const y = e.clientY;
        setTimeout(() => {
            if (stalker) {
                stalker.style.opacity = '1';
                stalker.style.top = `${y}px`;
                stalker.style.left = `${x}px`;
                stalker.style.zIndex = '10000';
            }
        }, 50);
    });

    // 特定のキー押下で画像を非表示
    window.addEventListener('keydown', function (e) {
        const hideKeys = [16, 44, 91, 92];
        if (hideKeys.includes(e.keyCode)) {
            document.querySelectorAll('img').forEach(img => {
                img.style.display = 'none';
            });
        }
    });

    // キーを離したときに画像を再表示
    window.addEventListener('keyup', function () {
        document.querySelectorAll('img').forEach(img => {
            img.style.display = '';
        });
    });

    // スクロール時の notice-bar の表示制御
    window.addEventListener('scroll', function () {
        if (!noticeBar) return;
        if (window.scrollY > 100) {
            noticeBar.classList.add('hidden');
        } else {
            noticeBar.classList.remove('hidden');
        }
    }, { passive: true });
});

// fade_bottom 要素の表示判定
window.addEventListener('load', function () {
    const elementsToShow = document.querySelectorAll('.fade_bottom');
    let ticking = false;

    function isVisible(element) {
        const rect = element.getBoundingClientRect();
        return (rect.top < window.innerHeight * 0.8) && (rect.bottom > window.innerHeight * 0.2);
    }

    function checkScroll() {
        elementsToShow.forEach(el => {
            if (isVisible(el)) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
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
