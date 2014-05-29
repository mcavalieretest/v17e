

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
		my.isReady = new Array(false, false, false);

		// if(IBM.watson.isMobile){
			$(".ibm-live-assistance-list").remove();
		// }




		my.continue_btn = $("input[type=button]", my.form);
		my.submit_btn = $("input[type=submit]", my.form);
		my.sections = $(".section", my.form);
		my.legends = $("legend", my.form);

		my.my_details = $(".details input[type=text]", my.form);
		my.co_inputs = $(".co_details input[type=text]", my.form);
		my.co_drop = $(".co_details select", my.form);

		my.idea_inputs = $(".desc textarea", my.form);
		my.terms_check = $(".desc input[type=checkbox]", my.form);


		my.my_details.bind("blur", function(e){ my.validateSection(0)})



		$(my.sections[0]).show();
		$(my.legends[0]).addClass("current"); 

		$(my.legends[0]).bind("click", function(e){my.sectionSelect(this)});


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

	IBM.watson.WatsonForm.prototype.sectionSelect = function(item){
		var newIndex = $.inArray(item, $(this.legends));
		$(this.sections).hide();
		$(item).next().show();
		this.validateSection(newIndex)
	}

	IBM.watson.WatsonForm.prototype.validateSection = function(index){

		var my = this;


		if(index == 0){


			var fname = $(".details #NFNAME", my.form );
			var lname = $(".details #NLNAME", my.form );
			var email = $(".details #NELECADR", my.form );
			var phone = $(".details #NPHONE", my.form );

			var phoneRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
			var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			my.isReady[0] = false;
			

			if(fname.val().length > 1 && lname.val().length > 1){
				if(phoneRegex.test(phone.val()) && phone.val().length >= 10){
					if(emailRegex.test(email.val())){
						console.log("got here 3")
						my.isReady[0] = true;
					}
				}		
			} 

			if(my.isReady[0]){
				$(my.continue_btn[index]).addClass("enabled");
				$(my.continue_btn[index]).bind("click", function(e){
					e.preventDefault();
					$(this).unbind('click');
							// my.my_details.unbind('blur');
					my.co_inputs.bind("blur", function(e){ my.validateSection(1)})
					my.co_drop.bind("change", function(e){ my.validateSection(1)})
					$(".co_details input[type=radio]").bind("change", function(e){ my.validateSection(1)})

					my.setSections(index)



				})
				$(my.legends[1]).bind("click", function(e){my.sectionSelect(this)});
			}else{
				$(my.legends[1]).unbind("click");
				$(my.continue_btn[index]).removeClass("enabled");
				$(my.continue_btn[index]).unbind("click");
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

			var urlRegex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;


			my.isReady[1] = false;


			if(cname.val().length > 1 && city.val().length > 1){
				if(urlRegex.test(url.val())){
					console.log("got here")
					if(country.val() && industry.val() && employees.val() && customers.val() && revenues.val()){
						// console.log("got here co 3")
						if($(".co_details input[type=radio]").is(":checked")){
							my.isReady[1] = true;
						}
					}
				}
			}



			// console.log("////////////////////////")

			if(my.isReady[1]){
				$(my.continue_btn[index]).addClass("enabled");
				$(my.legends[2]).bind("click", function(e){my.sectionSelect(this)});
				$(my.continue_btn[index]).bind("click", function(e){
					e.preventDefault();
					$(this).unbind('click');
					my.idea_inputs.bind("blur", function(e){my.validateSection(2)})
					my.terms_check.bind("change", function(e){my.validateSection(2)})

					my.setSections(index)
				});
			}else{
				$(my.legends[2]).unbind("click");
				$(my.continue_btn[index]).removeClass("enabled");
				$(my.continue_btn[index]).unbind("click");	
			}



		}else{
			var idea    = $(".desc #IDEA", my.form);
			var support = $(".desc #IDEASUPPORT", my.form);

			my.isReady[2] = false;


			if(idea.val().length > 1 && support.val().length > 1){
				if($(my.terms_check).is(":checked")){
					my.isReady[2] = true;
					console.log("ready")
					my.submit_btn.addClass("enabled");
					my.submit_btn.removeAttr("disabled")
					
				}
			}



			if(my.isReady.indexOf(false) < 0){
				my.submit_btn.addClass("enabled");
				my.submit_btn.removeAttr("disabled")
			}else{
				my.submit_btn.removeClass("enabled");
				my.submit_btn.attr("disabled", "")
			}

		}

	};

	IBM.watson.WatsonForm.prototype.setSections = function(index){
		var my = this;

		$(my.legends[index]).removeClass("current").addClass("complete");
		$(my.legends[index + 1]).addClass("current");

		$(my.sections[index]).hide();
		$(my.sections[index + 1]).show();
	}

	
}(jQuery));