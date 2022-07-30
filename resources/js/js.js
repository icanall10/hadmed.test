(function ($) {

    function behaviors() {

        $('.table')
            .once('table', function () {
                let $this = $(this);

                $this
                    .find('.tr')
                    .css('grid-template-columns', $this.attr('data-columns'));

                $this.show();
            })

    }


    $(document).ready(function () {
        behaviors();
    });


    $(document).ajaxComplete(function () {
        behaviors();
    });

})(jQuery);