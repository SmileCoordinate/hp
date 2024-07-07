(function ($) {
    $(document).ready(function () {
        $(".tab").click(function () {
            var tabId = $(this).attr('id');

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
