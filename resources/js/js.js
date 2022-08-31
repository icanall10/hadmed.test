(function ($) {

    let is_tablet = function () {
        return ($(window).width() > 960 && $(window).width() <= 1200);
    }


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
                dateFormat: 'd.m.Y',
                disableMobile: "true"
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
            .once()
            .on('table', function () {
                let $this = $(this);
                let tr = $this.find('.tr');

                if (is_tablet()) {
                    tr.css('grid-template-columns', $this.attr('data-columns-tablet'));
                } else {
                    tr.css('grid-template-columns', $this.attr('data-columns'));
                }

                $this.show();
            })
            .trigger('table');


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


        $('[data-eat-choose-grid] [data-toggle]')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('.item')
                    .toggleClass('open');
            });


        $('[data-eat-choose-grid] [data-choose]')
            .once()
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let item = $this.closest('[data-item]');
                let grid = $this.closest('[data-eat-choose-grid]');

                grid
                    .find('[data-item]')
                    .removeClass('active');

                item.addClass('active');
            });


        $('[data-eat-history-grid] [data-toggle]')
            .once()
            .click(function (e) {
                e.preventDefault();

                $(this)
                    .closest('.item')
                    .toggleClass('open');
            });


        $('.review-form .item-rating')
            .once()
            .on('update', function (e, value) {
                value = value ?? 0;

                if (value === 0) return;

                let $this = $(this);
                let stars = $this.find('.star');

                stars.removeClass('active');

                for (let i = 1; i <= value; i++) {
                    stars
                        .filter('[data-value="' + i + '"]')
                        .addClass('active');
                }
            })
            .each(function () {
                let $this = $(this);
                let form = $this.closest('form');
                let value = form.find('input[name="rating"]').val();

                $this.trigger('update', [value]);
            })
            .find('.star')
            .on('update', function () {
                let $this = $(this);

                $this
                    .closest('.item-rating')
                    .trigger('update', [$this.attr('data-value')]);
            })
            .hover(
                function () {
                    let $this = $(this);
                    let item = $this.closest('.item-rating');

                    item.addClass('hover');

                    $this.trigger('update');
                },
                function () {
                    let $this = $(this);
                    let item = $this.closest('.item-rating');
                    let form = $this.closest('form');
                    let value = form.find('input[name="rating"]').val();

                    item.removeClass('hover');

                    $(this).trigger('update', [value]);
                }
            )
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let item = $this.closest('.item-rating');
                let form = $this.closest('form');

                item.removeClass('hover');

                form.find('input[name="rating"]').val(
                    $this.attr('data-value')
                );
            });


        $('[data-sidebar-toggle]')
            .once()
            .click(function (e) {
                e.preventDefault();

                $('body').toggleClass('sidebar-visible');
            });


        $('.table .tr[data-patient-card-show]')
            .once('patient-card-toggle')
            .click(function () {
                let $this = $(this);
                let table = $this.closest('.table');

                table.find('.tr').removeClass('active');

                $this.addClass('active');

                $('body').addClass('patient-card-visible');
            });


        $('[data-patient-card-toggle]')
            .once()
            .click(function () {
                $('body').toggleClass('patient-card-visible');
            });

    }


    $(window).resize(function () {
        $('.table').trigger('table');
    });


    $(document).ready(function () {
        behaviors();
    });


    $(document).ajaxComplete(function () {
        behaviors();
    });

})(jQuery);