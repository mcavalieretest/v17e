

(function ($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	/**
	 * @Class WatsonForm
	 */
	IBM.watson.WatsonFormFull = function (formSelector) {

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
		my.terms_check = $(".market input[type=checkbox]", my.form);



		my.my_details.bind("blur", function(e){ my.validateSection(0)})

		$(my.sections[0]).show();
		$(my.legends[0]).addClass("current"); 


		//show hide optional fields
		var otherbtns = [
						$(".co_details #INDUSTRY", my.form ),
						$(".market #bussiness-model_monetization", my.form ),
						$(".market #senior_sponsor", my.form )]

		
		$.each(otherbtns, function(index, val) {
			 val.bind("change", function(e){
			 	my.showHiddenField($(this), $(this).val())
			 });

		});

		$(".market input[name=sell_application_to_customers]", my.form).bind("change", function(e){
			my.showHiddenField($(".market .how_do", my.form), $(this).val())
		})


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

	IBM.watson.WatsonFormFull.prototype.showHiddenField = function(el, val){
				if(val.toLowerCase() == "other"){
					$(el).closest("li").next().show();
					$(el).closest("li").addClass('addy')
				}else{
					$(el).closest("li").next().hide();
					$(el).closest("li").removeClass('addy')
				}
	}

	IBM.watson.WatsonFormFull.prototype.setSections = function(index){
		var my = this;

		$(my.legends[index]).removeClass("current").addClass("complete");
		$(my.legends[index + 1]).addClass("current");

		$(my.sections[index]).hide();
		$(my.sections[index + 1]).show();
	}

	IBM.watson.WatsonFormFull.prototype.validateSection = function(index){

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
							console.log("continue one")
							$(this).unbind('click');
							my.my_details.unbind('blur');
							my.co_inputs.bind("blur", function(e){ my.validateSection(1)})
							my.co_drop.bind("change", function(e){ my.validateSection(1)})

							my.setSections(index)
						})
					}
				}
				
			} 

		}else if(index == 1){

			var cname     = $(".co_details #NCOMPANY", my.form );
			var address   = $(".co_details #NADLINE1", my.form);
			var city      = $(".co_details #NCITY", my.form );
			var state     = $(".co_details #NSTATE", my.form );
			var postal    = $(".co_details #NZIP",  my.form );
			var country   = $(".co_details #NCOUNTRY", my.form );
			var url       = $(".co_details #COMPANY_URL", my.form );
			var industry  = $(".co_details #INDUSTRY", my.form );
			var employees = $(".co_details #Employees", my.form );
			var revenues  = $(".co_details #Revenues", my.form );

			var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;


			if(cname.val().length > 1 && city.val().length > 1 && postal.val().length >= 5 && address.val().length > 5){
				console.log("name city postal addy ok")
				if(urlRegex.test(url.val())){
					console.log("url ok")
					console.log(state.val(), country.val(), industry.val(), employees.val(), revenues.val());
					if(state.val() && country.val() && industry.val() && employees.val() && revenues.val()){
						console.log("state country industry employees revenues ok")
						if($(".co_details input[name=IBM_Partner_World_memeber]:checked").val() == "Yes"){

							$(my.continue_btn[index]).addClass("enabled");
							$(my.continue_btn[index]).bind("click", function(e){
								e.preventDefault();
								$(this).unbind('click');
								my.co_inputs.unbind("blur");
								my.co_drop.unbind("change");

								my.idea_inputs.on("blur", function(e){my.validateSection(2)})
								// my.terms_check.bind("change", function(e){my.validateSection(2)})
								// my.idea_radio.bind("change", function(e){my.validateSection(2)})

								my.setSections(index);
							});
						}
					}
				}
			}

		}else if(index == 2){

			var idea    = $(".desc #application_description", my.form);

			if(idea.val().length > 5){
				console.log(my.continue_btn[index])
				$(my.continue_btn[index]).addClass("enabled");
				$(my.continue_btn[index]).bind("click", function(e){
					$(my.terms_check).bind("change", function(){my.validateSection(3)});
					my.setSections(index);
				});
			}


		}else{

			var ready = false;
			if($(my.terms_check).is(":checked")){
				ready = true;
				my.submit_btn.addClass("enabled");
				my.submit_btn.removeAttr("disabled")
					
			}
			if(!ready ){
				my.submit_btn.removeClass("enabled");
				my.submit_btn.attr("disabled", "")
			}
	

		}
	};


	
}(jQuery));