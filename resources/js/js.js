(function ($) {

    let is_mobile = function () {
        return ($(window).width() <= 1440);
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
                locale: 'ru', dateFormat: 'd.m.Y', disableMobile: "true"
            });


        $('[data-timemask]')
            .once(function () {
                new Cleave(this, {
                    time: true, timePattern: ['h', 'm']
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
                setTimeout(() => {
                    $('.select2-results__options')
                        .once()
                        .niceScroll({
                            cursorcolor: "#0E7ABC", cursorwidth: '4px', railpadding: {
                                top: 4, right: 0, left: 0, bottom: 4
                            }, cursoropacitymin: 0.2, cursoropacitymax: 0.6
                        });
                }, 0);
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

                if (is_mobile()) {
                    tr.css('grid-template-columns', $this.attr('data-columns-mobile'));
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


        $('[data-eat-choose-grid] [data-item]')
            .once()
            .click(function (e) {
                e.preventDefault();

                if (!is_mobile()) return;

                let $this = $(this);

                let key = $this.attr('data-item');

                $('[data-eat-bottom-sheet="' + key + '"]')
                    .closest('[data-bottom-sheet]')
                    .addClass('open');
            });


        $('[data-eat-choose-grid] [data-toggle]')
            .once()
            .click(function (e) {
                e.preventDefault();

                if (is_mobile()) return;

                $(this)
                    .closest('.item')
                    .toggleClass('open');
            });


        $('[data-eat-choose-grid] [data-choose]')
            .once()
            .on('choose', function (e) {
                e.preventDefault();

                let $this = $(this);
                let item = $this.closest('[data-item]');
                let grid = $this.closest('[data-eat-choose-grid]');
                let key = item.attr('data-item');
                let bottomSheet = $('[data-eat-bottom-sheet="' + key + '"]');

                grid
                    .find('[data-item]')
                    .removeClass('active')
                    .each(function () {
                        let itemKey = $(this).attr('data-item');

                        $('[data-eat-bottom-sheet="' + itemKey + '"]').removeClass('active');
                    });

                item.addClass('active');
                bottomSheet.addClass('active')
            })
            .click(function (e) {
                e.preventDefault();

                if (is_mobile()) return;

                $(this).trigger('choose');
            });


        $('[data-eat-bottom-sheet] [data-choose]')
            .once()
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);

                let key = $this
                    .closest('[data-eat-bottom-sheet]')
                    .attr('data-eat-bottom-sheet');

                let item = $('[data-eat-choose-grid] [data-item="' + key + '"]');

                item
                    .find('[data-choose]')
                    .first()
                    .trigger('choose');
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
            .hover(function () {
                let $this = $(this);
                let item = $this.closest('.item-rating');

                item.addClass('hover');

                $this.trigger('update');
            }, function () {
                let $this = $(this);
                let item = $this.closest('.item-rating');
                let form = $this.closest('form');
                let value = form.find('input[name="rating"]').val();

                item.removeClass('hover');

                $(this).trigger('update', [value]);
            })
            .click(function (e) {
                e.preventDefault();

                let $this = $(this);
                let item = $this.closest('.item-rating');
                let form = $this.closest('form');

                item.removeClass('hover');

                form.find('input[name="rating"]').val($this.attr('data-value'));
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


        $('[data-order-toggle]')
            .once()
            .click(function () {
                $('body').toggleClass('order-visible');
            });


        $('[data-bottom-sheet-link]')
            .once('bottom-sheet-link')
            .click(function () {
                let $this = $(this);
                let key = $this.attr('data-bottom-sheet-link');

                $('[data-bottom-sheet="' + key + '"]').addClass('open');
            });


        $('[data-bottom-sheet]')
            .find('.overlay, .toggle')
            .once('close')
            .click(function (e) {
                $(this)
                    .closest('[data-bottom-sheet]')
                    .removeClass('open');
            });

    }


    $(document).click(function (event) {
        let selector = '[data-fade-toggle]';
        let $target = $(event.target);

        if (!$target.closest(selector).length && $(selector).is(':visible') && !$target.closest('[data-fade-toggle-link]').length && !$target.filter('[data-fade-toggle-link]').length) {
            $(selector).fadeOut('fast');
        }
    });


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