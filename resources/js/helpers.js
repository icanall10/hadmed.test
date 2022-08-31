(function ($) {

    let cache = {}, uuid = 0;

    $.fn.once = function (id, fn) {
        if (typeof id != 'string') {
            if (!(id in cache)) {
                cache[id] = ++uuid;
            }

            if (!fn) {
                fn = id;
            }
            id = 'jquery-once-' + cache[id];
        }

        let name = id + '-processed';
        let elements = this.not('.' + name).addClass(name);

        return $.isFunction(fn) ? elements.each(fn) : elements;
    }


})(jQuery);