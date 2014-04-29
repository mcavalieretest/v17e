

(function ($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	/**
	 * @Class WatsonForm
	 */
	IBM.watson.WatsonForm = function (formSelector) {

		var my = this;
		my.form = $(formSelector);



		my.continue_btn = $("input[type=button]", my.form);
		my.submit_btn = $("input[type=submit]", my.form);
		my.sections = $(".section", my.form);
		my.legends = $("legend", my.form);

		my.my_details = $(".details input[type=text]", my.form);
		my.co_inputs = $(".co_details input[type=text]", my.form);
		my.co_drop = $(".co_details select", my.form);

		my.idea_inputs = $(".desc textarea", my.form);
		my.idea_radio = $(".desc input[type=radio]", my.form);
		my.terms_check = $(".desc input[type=checkbox]", my.form);


		my.my_details.bind("blur", function(e){ my.validateSection(0)})


		$(my.sections[0]).show();
		$(my.legends[0]).addClass("current"); 


		if (!Modernizr.input.required || IBM.watson.isSafari) {

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

	IBM.watson.WatsonForm.prototype.validateSection = function(index){

		var my = this;


		if(index == 0){


			var fname = $(".details #NFNAME", my.form );
			var lname = $(".details #NLNAME", my.form );
			var email = $(".details #NELECADR", my.form );
			var phone = $(".details #NPHONE", my.form );

			var phoneRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
			var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


			if(fname.val().length > 1 && lname.val().length > 1){
				if(phoneRegex.test(phone.val()) && phone.val().length >= 10){
					if(emailRegex.test(email.val())){
						console.log("got here 3")
						$(my.continue_btn[index]).addClass("enabled");
						$(my.continue_btn[index]).bind("click", function(e){
							e.preventDefault();
							$(this).unbind('click');
							my.my_details.unbind('blur');
							my.co_inputs.bind("blur", function(e){ my.validateSection(1)})
							my.co_drop.bind("change", function(e){ my.validateSection(1)})

							$(my.legends[index]).removeClass("current").addClass("complete");
							$(my.legends[index + 1]).addClass("current");

							$(my.sections[index]).hide();
							$(my.sections[index + 1]).show();
						})
					}
				}
				
			} 

		}else if(index == 1){
			var cname     = $(".co_details #NCOMPANY", my.form );
			var url       = $(".co_details #COMPANYURL", my.form );
			var city      = $(".co_details #NCITY", my.form );
			var state     = $(".co_details #NSTATE", my.form );
			var country   = $(".co_details #NCOUNTRY", my.form );
			var industry  = $(".co_details #nindustry", my.form );
			var employees = $(".co_details #nemployees", my.form );
			var customers = $(".co_details #ncustomers", my.form );
			var revenues  = $(".co_details #nrevenues", my.form );

			var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;


			if(cname.val().length > 1 && city.val().length > 1){
				if(urlRegex.test(url.val())){
					if(state.val() && country.val() && industry.val() && employees.val() && customers.val() && revenues.val()){
						if($(".co_details input[type=radio]:checked").val() == "Yes"){

							$(my.continue_btn[index]).addClass("enabled");
							$(my.continue_btn[index]).bind("click", function(e){
								e.preventDefault();
								$(this).unbind('click');
								my.co_inputs.unbind("blur");
								my.co_drop.unbind("change");

								my.idea_inputs.bind("blur", function(e){my.validateSection(2)})
								my.terms_check.bind("change", function(e){my.validateSection(2)})
								my.idea_radio.bind("change", function(e){my.validateSection(2)})

								$(my.legends[index]).removeClass("current").addClass("complete");
								$(my.legends[index + 1]).addClass("current");

								$(my.sections[index]).hide();
								$(my.sections[index + 1]).show();
							});
						}
					}
				}
			}

		}else{
			var idea    = $(".desc #IDEA", my.form);
			var support = $(".desc #IDEASUPPORT", my.form);

			var ready = false;


			if(idea.val().length > 1 && support.val().length > 1){
				console.log("before ready", $(my.terms_check).is(":checked"))
				if($(my.terms_check).is(":checked")){
					ready = true;
					console.log("ready")
					my.submit_btn.addClass("enabled");
					my.submit_btn.removeAttr("disabled")
					
				}
			}

			if(!ready ){
				my.submit_btn.removeClass("enabled");
				my.submit_btn.attr("disabled", "")
			}

		}
	};

	IBM.watson.WatsonForm.prototype.validate = function() {

		console.log("validate")

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