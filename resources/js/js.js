(function ($) {

    function behaviors() {

        $('.table')
            .once('table', function () {
                let $this = $(this);

                $this
                    .find('.tr')
                    .css('grid-template-columns', $this.attr('data-columns'));

                $this.show();
            });


        $('.tabs a')
            .once('tabs')
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);

                $this
                    .closest('.tabs')
                    .find('a')
                    .each(function () {
                        let item = $(this);

                        item.removeClass('active');

                        $('[data-tab-content="' + item.attr('data-tab') + '"]').removeClass('active');
                    });

                $this.addClass('active');

                $('[data-tab-content="' + $this.attr('data-tab') + '"]').addClass('active');
            });

    }


    $(document).ready(function () {
        behaviors();
    });


    $(document).ajaxComplete(function () {
        behaviors();
    });

})(jQuery);