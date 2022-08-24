(function ($) {

    function behaviors() {

        $('[data-modal-link]')
            .once('modal-link')
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let key = $this.attr('data-modal-link');
                let modal = $('[data-modal=' + key + ']');
                let width = modal.attr('data-modal-width') || null;

                if (modal.length === 0) return;

                $.magnificPopup.open({
                    items: {
                        src: modal[0]
                    },
                    type: 'inline',
                    mainClass: $(this).attr('data-modal') + '-modal mfp-fade',
                    closeOnBgClick: false,
                    showCloseBtn: true,
                    callbacks: {
                        open: function () {
                            if (width) {
                                $(this.container)
                                    .find('.mfp-content')
                                    .css('width', width + 'px');
                            }
                        }
                    },

                    removalDelay: 300
                });
            });


        $('[data-modal-close]')
            .once('modal-close')
            .click(function (e) {
                e.preventDefault();

                $.magnificPopup.close();
            });


        $('[data-datepicker]')
            .once()
            .flatpickr({
                locale: 'ru',
                dateFormat: 'd.m.Y'
            });


        $('[data-timemask]')
            .once(function () {
                new Cleave(this, {
                    time: true,
                    timePattern: ['h', 'm']
                });
            });


        $('.switch')
            .once('switch', function () {
                let $this = $(this);
                let count = $this.find('a').length;

                $this.css('grid-template-columns', 'repeat(' + count + ', minmax(0, 1fr))');
            });


        $('.form-group select')
            .once()
            .on('select2:open', function (e) {
                setTimeout(function () {
                    $('.select2-results__options').each(function () {
                        new SimpleBar(this)
                    });
                }, 10);
            })
            .each(function () {
                let $this = $(this);

                $this.select2({
                    dropdownParent: '.dropdown-wrapper'
                });
            });


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


        $('.eat-menu-block .menu a')
            .once('tabs')
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);

                $this
                    .closest('.menu')
                    .find('a')
                    .each(function () {
                        let item = $(this);

                        item.removeClass('active');

                        $('[data-eat-menu-tab-content="' + item.attr('data-tab') + '"]').removeClass('active');
                    });

                $this.addClass('active');

                $('[data-eat-menu-tab-content="' + $this.attr('data-tab') + '"]').addClass('active');
            });


        $('[data-fade-toggle-link]')
            .once()
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let key = $this.attr('data-fade-toggle-link');

                $('[data-fade-toggle="' + key + '"]')
                    .stop()
                    .fadeToggle('fast');
            });


        $('[data-eat-grid-interactive] [data-toggle]')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('.item')
                    .toggleClass('open');
            });


        $('[data-eat-grid-interactive] [data-choose]')
            .once()
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let item = $this.closest('[data-item]');
                let grid = $this.closest('[data-eat-grid-interactive]');

                grid
                    .find('[data-item]')
                    .removeClass('active');

                item.addClass('active');
            });

    }


    $(document).ready(function () {
        behaviors();
    });


    $(document).ajaxComplete(function () {
        behaviors();
    });

})(jQuery);