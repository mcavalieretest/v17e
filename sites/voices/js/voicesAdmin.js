$(function() {
	// Global Variable
	var $closebutton = $('a.ibm_cci_closeAddAcc img'),
		$addAccount = $('a.ibm_cci_addAccount, img.ibm_cci_addAccount, p.ibm_cci-addnewAcc'),
		$addAcountBlock = $('.ibm-band.ibm_cci__ibm-band'),
		$addAccountTarget = $('a.ibm_cci_addAccount, img.ibm_cci_addAccount'),
		$pAddnewAcc = $('p.ibm_cci-addnewAcc');

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
});