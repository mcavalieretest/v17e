$(function() {
	// Global Variable
	var $closebutton = $('a.ibm_cci_closeAddAcc img'),
		$addAccount = $('a.ibm_cci_addAccount, img.ibm_cci_addAccount, p.ibm_cci-addnewAcc'),
		$addAcountBlock = $('.ibm-band.ibm_cci__ibm-band'),
		$addAccountTarget = $('a.ibm_cci_addAccount, img.ibm_cci_addAccount'),
		$pAddnewAcc = $('p.ibm_cci-addnewAcc'),
		$editIcon = $("img.ibm_cci-editIcon"),
		$editModalWin = $('#ibm_cci-modalWin'),
		$pconDiv = $('.ibm_cci__ibm-pcon'),
		$cancelEditModalWin = $('.ibm_cci-deleteButtGray'),
		$deleteButton = $('.ibm_cci-datacell p.ibm_cci-deleteButt a'),
		$deleteModalWin = $('#ibm_cci-modalDelWin');


	// ADD ACCOUNT ONCLICK
	$addAccount.on('click', function(event){
		event.preventDefault();		
		var $targetParent = $(event.target).parent('p');
			$eventTarget = $(event.target);
			if($targetParent.hasClass('.ibm_cci-addnewAccClicked')){
				return true;
			}else{
				$targetParent.addClass('ibm_cci-addnewAccClicked');
				$eventTarget.css({'cursor': 'default'});
				$targetParent.css({'cursor': 'default'});
				$eventTarget.siblings().css({'cursor': 'default'});
				$addAcountBlock.addClass('ibm_cci__ibm_bandShow');
			}
	});
	// CLOSE ADD ACCOUNT
	$closebutton.on('click', function(event){		
		$addAcountBlock.removeClass('ibm_cci__ibm_bandShow');
		$addAccountTarget.css({'cursor': 'pointer'});
		$pAddnewAcc.removeClass('ibm_cci-addnewAccClicked');
	});

	// EDIT BUTTON
	$editIcon.on('click', function(event){
		event.preventDefault();
		$editModalWin.removeClass('ibm_cci_modalWinToggle');
		$pconDiv.addClass('ibm_cci_modalIsOpen');
		$('html').css('overflow', 'hidden');
		hideEditDelete();	
	});
	// CANCEL EDIT BUTTON
	$cancelEditModalWin.on('click', function(event){
		event.preventDefault();
		$editModalWin.addClass('ibm_cci_modalWinToggle');
		$pconDiv.removeClass('ibm_cci_modalIsOpen');
		$('html').removeAttr('style');
		showEditDelete();	
	});

	// DELETE BUTTON
	$deleteButton.on('click', function(event){
		event.preventDefault();
		$deleteModalWin.removeClass('ibm_cci_modalWinToggle');
		$pconDiv.addClass('ibm_cci_modalIsOpen');
		$('html').css('overflow', 'hidden');
		hideEditDelete();
	});

	$cancelEditModalWin.on('click', function(event){
		event.preventDefault();
		$deleteModalWin.addClass('ibm_cci_modalWinToggle');
		$pconDiv.removeClass('ibm_cci_modalIsOpen');
		$('html').removeAttr('style');
		showEditDelete();
	});

	var hideEditDelete = function(){
		$editIcon.each(function(i){
			$(this).css('display', 'none');
		});
		$deleteButton.each(function(i){
			$('.ibm_cci-datacell p.ibm_cci-deleteButt').css('display', 'none');
		});	
	};

	var showEditDelete = function(){
		$editIcon.each(function(i){
			$(this).removeAttr('style');
		});
		$deleteButton.each(function(i){
			$('.ibm_cci-datacell p.ibm_cci-deleteButt').removeAttr('style');
		});		
	};

});