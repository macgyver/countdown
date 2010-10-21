/**
 * jQuery plugin for Countdown
 *
 * @author Jon z <jon@brokendisk.com>
 * @copyright 2010-infinity BrokenDisk <http://brokendisk.com>
 * @usage: http://brokendisk.com/code/countdown.html
 */
(function($) {
    /**
     *  string target: the id of the element that will contain the countdown.
     *  object options:
     *      duration - number of ticks to count, default 30
     *      interval - length in seconds of each tick, default 1
     *  function callback: function to call when finished counting down.
     */
    function brokenCountdown(target, options, callback) {
        this.id = target;
        this.duration = options.duration || 30;
        this.interval = options.interval || 1;
        this.current = this.duration;
        this.callback = callback || function() { return true; };

        $('#' + this.id).text(this.current);
        this.iterate();
    }
    brokenCountdown.prototype.iterate = function() {
        // cancercancercancer
        var that = this;

        setTimeout(
            function() {
                $('#' + that.id).text(--that.current);
                if (that.current > 0) {
                    that.iterate();
                }
                else {
                    that.callback();
                }
            },
            that.interval * 1000
        );
    };

    /**
     * Polymorphic-ish
     * Countdown options may be specified by attributes in the html
     * or by function arguments;
     * in the case of a collision
     * the javascript functional arguments will take precedence.
     */
    $.fn.brokenCountdown = function(options, callback) {
        return this.each(function() {
            // countdown([callback])
            if (typeof(options) == "function") {
                callback = options;
                options = undefined;
            }
            // countdown()
            if (typeof(options) == "undefined") {
                options =  {
                    duration: $(this).attr('duration'),
                    interval: $(this).attr('interval')
                }
            }
            // countdown([duration], [callback])
            else if (typeof(options) == "number") {
                options = {
                    duration: options,
                    interval: $(this).attr('interval')
                };
            }
            // countdown([options], [callback])
            else if (typeof(options) == "object") {
                options.interval = options.interval || $(this).attr('interval');
                options.duration = options.duration || $(this).attr('duration');
            }
            new brokenCountdown(this.id, options, callback);
        });
    };
})(jQuery);

