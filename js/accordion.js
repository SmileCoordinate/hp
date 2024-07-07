var $j = jQuery.noConflict();

$j(document).ready(function () {
    $j(".accordion-wrap").on("click", function () {
        var accordionText = $j(this).children().eq(1);
        accordionText.slideToggle(500); // アニメーション速度を500ミリ秒に統一
        $j(this).children().eq(0).toggleClass("accordion-no-bar");
        $j(this).siblings().find(".accordion-header").removeClass("accordion-gold").removeClass("active");
        $j(this).siblings().find(".accordion-header i").removeClass("rotate-fa");
        $j(this).find(".accordion-header").toggleClass("accordion-gold").toggleClass("active");
        $j(this).find(".fa").toggleClass("rotate-fa");
        $j(".accordion-wrap .accordion-text").not(accordionText).slideUp(500); // アニメーション速度を500ミリ秒に統一
    });

    $j(".clickable").on("click", function () {
        $j(this).toggleClass("rotated");
    });
});
