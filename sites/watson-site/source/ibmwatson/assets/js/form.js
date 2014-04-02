

(function ($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	/**
	 * @Class WatsonForm
	 */
	IBM.watson.WatsonForm = function (formSelector) {

		if (!Modernizr.input.required || IBM.watson.isSafari) {

			var my = this;

			my.form = $(formSelector);
			my.isValid = false;
			my.errMsg = $('#err-msg');

			my.form.on('submit', function(e){
				if (!my.validate()) {
					e.preventDefault();
					my.errMsg.show();
				}
			});
		}

	};

	IBM.watson.WatsonForm.prototype.validate = function() {

		var my = this,
			$required = this.form.find('*[required]'),
			$textFields= $required.filter('input:text, textarea'),
			$radioBtns = $required.filter('input:radio'),
			$checkBoxes = $required.filter('input:checkbox'),
			$selects = $required.filter('select'),
			radioGroups = {}, radioName, radioPropName;

		//$textFields= $textFields.add($required.filter('textarea'))


		my.isValid = true;
		my.errMsg.hide();
		$('.error').removeClass('error');

		$radioBtns.each(function(){

			radioName = this.name;
			radioPropName = radioName.replace(/[^a-zA-Z]+/g, '');

			if (!radioGroups[radioPropName]) {
;				radioGroups[radioPropName] = radioName + 'found';
				if (!$radioBtns.filter('[name=' + radioName + ']:checked').val()) {
					my.isValid = false;
					$(this).closest('li').addClass('error');
				}
			}
		});

		$textFields.each(function(){
			if ($(this).val().length < 1) {
				$(this).closest('li').addClass('error');
				my.isValid = false;
			}
		});

		$checkBoxes.each(function(){
			if (!$(this).is(':checked')) {
				$(this).closest('p').addClass('error');
				my.isValid = false;
			}
		});

		$selects.each(function(){
			if ($(this).find('option').eq(0).is(':selected')) {
				$(this).closest('li').addClass('error');
				my.isValid = false;
			}
		});
		//my.isValid = true;

		return my.isValid;


	};
	// adding Authorized agent toggle to disable agent fields
	
	$('input[name="AUTHORIZED-AGENT"]').change( function() {
		var agent = $(this).val();
		//console.log(agent);
		$('#agent-group input, #agent-group select' ).not('[type=radio]').each( function() {
			//console.log($(this).prop('disabled'));
			if ( agent == "Yes" ) {
				$(this).prop('disabled', 'disabled');
				$(this).prop('required', false);
			} else {
				$(this).prop('disabled', false);
				$(this).prop('required', 'required');
			}
		});
	});
	
}(jQuery));