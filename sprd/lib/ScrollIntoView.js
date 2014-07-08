define([], function() {

    // easing functions http://goo.gl/5HLl8
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) {
            return c / 2 * t * t + b
        }
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
    var requestAnimationFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    /***
     *
     * @param {String|HTMLElement} idOrElement
     * @param {Number} [offset=0]
     * @param {Number} [duration=500]
     * @param {Function} callback
     */
    return function (idOrElement, offset, duration, callback) {

        if (offset instanceof Function) {
            callback = offset;
            offset = 0;
        }

        if (duration instanceof Function) {
            callback = duration;
            duration = null;
        }

        duration = duration || 500;
        offset = offset || 0;

        if (!idOrElement) {
            callback && callback();
            return;
        }

        if (idOrElement instanceof HTMLElement) {
            element = idOrElement;
        } else {
            var element = document.getElementById(idOrElement);
        }

        if (!element) {
            callback && callback();
            return;
        }

        var body = document.body || document.getElementsByTagName("body")[0],
            to = element.getBoundingClientRect().top + body.scrollTop;

        scrollTo(to + offset);

        function scrollTo(to) {

            // figure out if this is moz || IE because they use documentElement
            var start = body.scrollTop,
                change = to - start,
                currentTime = 0,
                increment = 20;

            var animateScroll = function () {
                // increment the time
                currentTime += increment;
                // find the value with the quadratic in-out easing function

                body.scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);

                // do the animation unless its over
                if (currentTime < duration) {
                    requestAnimationFrame(animateScroll);
                } else {
                    callback && callback();
                }
            };

            animateScroll();
        }

    };

});