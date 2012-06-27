function applyPlaceholders() {
    if (Modernizr == undefined || Modernizr.input == undefined)
        throw "Unable to find Modernizr library."

    this.hasNativePlaceholderSupport = Modernizr.input.placeholder;
    this.hasAppliedFallback = false;
    this.placeholders = $("[placeholder]");
    this.numberOfPlaceholderElements = this.placeholders.length;

    if (!this.hasNativePlaceholderSupport) {        
        applyPlaceholdersOnLoad();
        handleFocusAndBlurEvents();
        removePlaceholdersOnSubmit();
        this.hasAppliedFallback = true;        
    }

    function addPlaceholderClass($input) {
        this.placeholders.addClass('placeholder');
    }
    function applyPlaceholdersOnLoad() { 
        this.placeholders.each(function() {
            var $this = $(this);
            if (isValueEmpty($this) || isValueEqualToPlaceholder($this)) {                                
                setValueEqualToPlaceholder($this); 
                addPlaceholderClass($this);           
            }
        });
    }
    function clearValue($input) {
        return $input.val('');
    }
    function handleFocusAndBlurEvents() {
        this.placeholders.focus(function() {
            var $this = $(this);
            if (isValueEqualToPlaceholder($this)) {
                clearValue($this);
                removePlaceholderClass($this);                
            }
        }).blur(function() {
            var $this = $(this);
            if (isValueEmpty($this) || isValueEqualToPlaceholder($this)) {
                setValueEqualToPlaceholder($(this));
                addPlaceholderClass($this);                
            }
        });
    }
    function isValueEmpty($input) {
        return $input.val() == undefined || $input.val() == '';
    }
    function isValueEqualToPlaceholder($input) { 
        return $input.val() == $input.attr('placeholder');
    }
    function removePlaceholderClass($input) {
        $input.removeClass($input);
    }
    function removePlaceholdersOnSubmit() {
        this.placeholders.closest('form').submit(function() {
            var $this = $(this);
            $this.find('[placeholder]').each(function() {
                if (isValueEqualToPlaceholder($this)) {
                    clearValue($this);
                }
            });
        });
    }
    function setValueEqualToPlaceholder($input) {
        var placeholderValue = $input.attr('placeholder');
        $input.val(placeholderValue);
    }
}
$(function() {
    applyPlaceholders();
});