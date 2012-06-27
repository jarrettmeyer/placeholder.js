function applyPlaceholders() {
    "use strict";
    if (Modernizr === undefined || Modernizr.input === undefined) {
        throw "Unable to find Modernizr library.";
    }

    var hasNativePlaceholderSupport = Modernizr.input.placeholder,
        hasAppliedFallback = false,
        placeholders = $("[placeholder]");

    function addPlaceholderClass($input) {
        $input.addClass('placeholder');
    }
    function removePlaceholderClass($input) {
        $input.removeClass($input);
    }
    function clearValue($input) {
        return $input.val('');
    }
    function isValueEmpty($input) {
        return $input.val() === undefined || $input.val() === '';
    }
    function isValueEqualToPlaceholder($input) {
        return $input.val() === $input.attr('placeholder');
    }
    function setValueEqualToPlaceholder($input) {
        var placeholderValue = $input.attr('placeholder');
        $input.val(placeholderValue);
    }
    function applyPlaceholdersOnLoad() {
        placeholders.each(function () {
            var $this = $(this);
            if (isValueEmpty($this) || isValueEqualToPlaceholder($this)) {
                setValueEqualToPlaceholder($this);
                addPlaceholderClass($this);
            }
        });
    }
    function handleFocusAndBlurEvents() {
        placeholders.focus(function () {
            var $this = $(this);
            if (isValueEqualToPlaceholder($this)) {
                clearValue($this);
                removePlaceholderClass($this);
            }
        }).blur(function () {
            var $this = $(this);
            if (isValueEmpty($this) || isValueEqualToPlaceholder($this)) {
                setValueEqualToPlaceholder($(this));
                addPlaceholderClass($this);
            }
        });
    }
    function removePlaceholdersOnSubmit() {
        placeholders.closest('form').submit(function () {
            var $this = $(this);
            $this.find('[placeholder]').each(function () {
                if (isValueEqualToPlaceholder($this)) {
                    clearValue($this);
                }
            });
        });
    }

    if (!hasNativePlaceholderSupport) {
        applyPlaceholdersOnLoad();
        handleFocusAndBlurEvents();
        removePlaceholdersOnSubmit();
        hasAppliedFallback = true;
    }
}
$(function () {
    "use strict";
    applyPlaceholders();
});