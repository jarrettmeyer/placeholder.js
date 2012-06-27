$(function() {	
	test("qunit is working", function() {
		ok(true, "working!");
	});

	var $input = $("[placeholder]");
	var ph = new applyPlaceholders();

	if (Modernizr.input.placeholder) {

		test("native support should be true", function() {
			ok(ph.hasNativePlaceholderSupport, "According to Modernizr, your browser supports the 'placeholder' tag natively. There is no need for fallback.");
		});

	} else {

		test("native support check should be false", function() {
			ok(!ph.hasNativePlaceholderSupport);
		});

		test("finds at least one element with placeholder", function() {
			ok(ph.numberOfPlaceholderElements > 0);
		});

		test("input should have value applied", function() {
			equal("Name", $input.val());
		});

		test("should set placeholder fallback to true", function(){
			ok(ph.hasAppliedFallback);
		});

	}
});