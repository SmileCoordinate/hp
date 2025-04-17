
document.addEventListener('DOMContentLoaded', function () {
    // アコーディオン機能
    const accordionWraps = document.querySelectorAll('.accordion-wrap');

    accordionWraps.forEach(function (wrap) {
        wrap.addEventListener('click', function () {
            const accordionText = wrap.children[1];
            const header = wrap.querySelector('.accordion-header');
            const icon = header.querySelector('.fa');

            // トグル開閉
            if (accordionText.style.maxHeight) {
                accordionText.style.maxHeight = null;
            } else {
                // 他の全てを閉じる
                document.querySelectorAll('.accordion-wrap .accordion-text').forEach(function (el) {
                    el.style.maxHeight = null;
                });

                // アニメーション効果（高さの変化）
                accordionText.style.maxHeight = accordionText.scrollHeight + 'px';
            }

            // 他のアコーディオンのスタイルをリセット
            accordionWraps.forEach(function (sibling) {
                if (sibling !== wrap) {
                    const siblingHeader = sibling.querySelector('.accordion-header');
                    const siblingIcon = siblingHeader.querySelector('.fa');
                    siblingHeader.classList.remove('accordion-gold', 'active');
                    if (siblingIcon) siblingIcon.classList.remove('rotate-fa');
                }
            });

            // この要素のスタイルをトグル
            wrap.children[0].classList.toggle('accordion-no-bar');
            header.classList.toggle('accordion-gold');
            header.classList.toggle('active');
            if (icon) icon.classList.toggle('rotate-fa');
        });
    });

    // 回転トグル
    document.querySelectorAll('.clickable').forEach(function (el) {
        el.addEventListener('click', function () {
            el.classList.toggle('rotated');
        });
    });
});
