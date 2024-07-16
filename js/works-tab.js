(function ($) {
    $(document).ready(function () {
        console.log("Document ready");

        $(".tab").click(function () {
            console.log("Tab clicked");
            var tabId = $(this).attr('id');
            console.log("Tab ID: " + tabId);

            $(".tab").removeClass('selected unselected');
            $(this).addClass('selected');
            $(this).siblings().addClass('unselected');

            $(".container").removeClass('show');
            $("#content" + tabId.replace('tab', '')).addClass('show');
        });

        // 初期状態でタブ1を選択
        $("#tab1").trigger("click");
    });
})(jQuery);
