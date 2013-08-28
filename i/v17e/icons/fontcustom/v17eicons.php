<?php

$path_to_file = 'fontcustom.css';
$file_contents = file_get_contents($path_to_file);

#add spacing around Unicode PUA
$file_contents = str_replace("content: \"","content: \"\\00a0",$file_contents);
$file_contents = str_replace("\"; }","\\00a0\"; }",$file_contents);

#anchor 
$file_contents = str_replace(".ibm-a-anchor:before {",".ibm-anchor-down-link:before,
.ibm-anchor-down-em-link:before {",$file_contents);

#arrow 
$file_contents = str_replace(".ibm-forward-link:before {",".ibm-forward-link:before,
.ibm-callaction-link:before {",$file_contents);

#back 
$file_contents = str_replace(".ibm-a-back-link:before {",".ibm-back-link:before,
.ibm-backup-link:before {",$file_contents);

#external 
$file_contents = str_replace(".ibm-a-external-link:before {",".ibm-external-link:before {",$file_contents);

#pagination forward
$file_contents = str_replace(".ibm-pag-next:before {",".ibm-forward-em-link:before,
.ibm-forward-pg-link:before {",$file_contents);

#pagination back
$file_contents = str_replace(".ibm-pag-prev:before {",".ibm-back-em-link:before {",$file_contents);

#pagination first
$file_contents = str_replace(".ibm-pag-first:before {",".ibm-firstpage-link:before {",$file_contents);

#pagination last
$file_contents = str_replace(".ibm-pag-last:before {",".ibm-lastpage-link:before {",$file_contents);



#forward bold 
$file_contents = str_replace(".ibm-a-forward-bd:before {",".ibm-generic-link:before {",$file_contents);

#upward
$file_contents = str_replace(".ibm-a-top:before {",".ibm-upward-link:before,
.ibm-anchor-up-link:before {",$file_contents);

#bullet check
$file_contents = str_replace(".ibm-bullet-check:before {",".ibm-checkLarge-link:before {",$file_contents);

#bullets
$file_contents = str_replace(".ibm-bullet-square:before {",".ibm-bullet:before,
#ibm-common-menu .ibm-ribbon-pane li:before,
#ibm-footer-module li:before {",$file_contents);

#check bold
$file_contents = str_replace(".ibm-check-bold:before {",".ibm-check-link:before {",$file_contents);

#chevron link
$file_contents = str_replace(".ibm-cta-chevron-link:before {","a.ibm-chevron-link:after,
li.ibm-chevron-link a:after,
a.ibm-chevron-alternate-link:after,
li.ibm-chevron-alternate-link a:after {",$file_contents);

#pdf link
$file_contents = str_replace(".ibm-doc-pdf:before {",".ibm-pdf-link:before {",$file_contents);

#form alert
$file_contents = str_replace(".ibm-form-alert:before {",".ibm-error-link:before,
.ibm-errorLarge-link:before {",$file_contents);

#form cancel
$file_contents = str_replace(".ibm-form-cancel:before {",".ibm-cancel-link:before,
.ibm-incorrect-link:before {",$file_contents);

#form confirm link
$file_contents = str_replace(".ibm-form-confirm-link:before {",".ibm-confirm-link:before {",$file_contents);

#form reset link
$file_contents = str_replace(".ibm-form-reset:before {",".ibm-reset-link:before {",$file_contents);

#question large link
$file_contents = str_replace(".ibm-help-lg:before {",".ibm-questionLarge-link:before {",$file_contents);

#help / question link
$file_contents = str_replace(".ibm-help:before {",".ibm-question-link:before,
.ibm-help-link:before {",$file_contents);

#update existing e-mail icon
$file_contents = str_replace(".ibm-email-link:before {",".ibm-email-link-alt:before {",$file_contents);

#email
$file_contents = str_replace(".ibm-ldr-email:before {",".ibm-email-link:before {",$file_contents);

#phone
$file_contents = str_replace(".ibm-ldr-phone:before {",".ibm-phone-link:before,
.ibm-call-link:before {",$file_contents);

#quote
$file_contents = str_replace(".ibm-ldr-quote:before {",".ibm-requestquote-link:before {",$file_contents);

#register / signin
$file_contents = str_replace(".ibm-ldr-register:before {",".ibm-signin-link:before {",$file_contents);

#callme
$file_contents = str_replace(".ibm-ldr-repcall:before {",".ibm-callme-link:before {",$file_contents);

#anchor down
$file_contents = str_replace(".ibm-link-down:before {",".ibm-anchor-down-link:before {",$file_contents);

#audio
$file_contents = str_replace(".ibm-media-audio:before {",".ibm-audio-link:before {",$file_contents);

#demoplay
$file_contents = str_replace(".ibm-media-play:before {",".ibm-demoplay-link:before,
.ibm-media-play:before,
.ibm-video-link:before {",$file_contents);

#document / symp doc / spreadsheet / presentation
$file_contents = str_replace(".ibm-document-link:before {",".ibm-document-link:before,
.ibm-symp-doc:before,
.ibm-symp-spreadsheet:before,
.ibm-symp-presentation:before {",$file_contents);


#ribbon chevrons------------------------
#left bold
$file_contents = str_replace(".ibm-pag-chev-l-bd:before {","a.ibm-ribbon-prev:active:before,
a.ibm-ribbon-prev:focus:before {",$file_contents);

#left light
$file_contents = str_replace(".ibm-pag-chev-l-lt:before {","a.ibm-ribbon-prev:before {",$file_contents);

#left medium
$file_contents = str_replace(".ibm-pag-chev-l-md:before {","a.ibm-ribbon-prev:hover:before {",$file_contents);

#right bold
$file_contents = str_replace(".ibm-pag-chev-r-bd:before {","a.ibm-ribbon-next:active:before,
a.ibm-ribbon-next:focus:before {",$file_contents);

#right light
$file_contents = str_replace(".ibm-pag-chev-r-lt:before {","a.ibm-ribbon-next:before {",$file_contents);

#right medium
$file_contents = str_replace(".ibm-pag-chev-r-md:before {","a.ibm-ribbon-next:hover:before {",$file_contents);
#ribbon chevrons------------------------


#popup
$file_contents = str_replace(".ibm-popup:before {",".ibm-popup-link:before {",$file_contents);

#rate star
$file_contents = str_replace(".ibm-rate-star:before {",".ibm-fullstar-link:before {",$file_contents);

#rate star half
$file_contents = str_replace(".ibm-rate-star-half:before {",".ibm-halfstar-link:before {",$file_contents);

#rate star no
$file_contents = str_replace(".ibm-rate-star-no:before {",".ibm-nostar-link:before {",$file_contents);

#rss
$file_contents = str_replace(".ibm-rss:before {",".ibm-rss-link:before {",$file_contents);

#social / blog
$file_contents = str_replace(".ibm-soc-blog:before {",".ibm-blog-link:before,
.ibm-chat-link:before {",$file_contents);

#facebook
$file_contents = str_replace(".ibm-soc-facebook:before {",".ibm-facebook-link:before {",$file_contents);

#flickr
$file_contents = str_replace(".ibm-soc-flickr:before {",".ibm-flickr-link:before {",$file_contents);

#linkedin
$file_contents = str_replace(".ibm-soc-linkedin:before {",".ibm-linkedin-link:before {",$file_contents);

#twitter
$file_contents = str_replace(".ibm-soc-twitter:before {",".ibm-twitter-link:before {",$file_contents);

#youtube
$file_contents = str_replace(".ibm-soc-youtube:before {",".ibm-youtube-link:before {",$file_contents);

#caution
$file_contents = str_replace(".ibm-status-caution:before {",".ibm-caution-link:before,
.ibm-cautionLarge-link:before {",$file_contents);

#minus
$file_contents = str_replace(".ibm-tog-minus:before {",".ibm-delete-link:before,
.ibm-minimize-link:before,
.ibm-show-hide h2 a.ibm-show-active:before {",$file_contents);

#plus
$file_contents = str_replace(".ibm-tog-plus:before {",".ibm-add1-link:before,
.ibm-maximize-link:before,
.ibm-show-hide h2 a:before {",$file_contents);

#info link
$file_contents = str_replace(".ibm-tool-info:before {",".ibm-information-link:before,
.ibm-informationLarge-link:before {",$file_contents);

#bookmark
$file_contents = str_replace(".ibm-tool-bookmark:before {",".ibm-dogear-link:before {",$file_contents);

#community, form, usergroup
$file_contents = str_replace(".ibm-tool-forum:before {",".ibm-community:before,
.ibm-community-link:before,
.ibm-forum-link:before,
.ibm-usergroup-link:before,
.ibm-usergroup:before {",$file_contents);

#print
$file_contents = str_replace(".ibm-tool-print:before {",".ibm-print-link:before {",$file_contents);

#setting alt (replace)
$file_contents = str_replace(".ibm-settings-link:before {",".ibm-setting-link-alt:before {",$file_contents);

#setting
$file_contents = str_replace(".ibm-tool-settings:before {",".ibm-setting-link:before {",$file_contents);

#close link
$file_contents = str_replace(".ibm-x:before {",".ibm-close:before {",$file_contents);

#upload
$file_contents = str_replace(".ibm-v17-upload:before {",".ibm-upload-link:before {",$file_contents);

#calendar
$file_contents = str_replace(".ibm-v17-calender:before {",".ibm-calendar-link:before {",$file_contents);

#menu
$file_contents = str_replace(".ibm-nav-menu:before {",".ibm-menu-link:before {",$file_contents);

#sort
$file_contents = str_replace(".ibm-nav-dropdown:before {",".ibm-sort-link:before {",$file_contents);

#sort up
$file_contents = str_replace(".ibm-sort-up:before {",".ibm-sort-up-link:before {",$file_contents);

#sort down
$file_contents = str_replace(".ibm-sort-down:before {",".ibm-sort-down-link:before {",$file_contents);

#wireless
$file_contents = str_replace(".ibm-tool-mobile:before {",".ibm-wireless-link:before {",$file_contents);

#calculator
$file_contents = str_replace(".ibm-tool-calc:before {",".ibm-calculator-link:before {",$file_contents);

#new
$file_contents = str_replace(".ibm-status-new:before {",".ibm-new-link:before,
.ibm-newLarge-link:before {",$file_contents);

#secure
$file_contents = str_replace(".ibm-secure:before {",".ibm-secure-link:before {",$file_contents);

#non-secure
$file_contents = str_replace(".ibm-secure-non:before {",".ibm-non-secure-link:before {",$file_contents);

#recommend
$file_contents = str_replace(".ibm-recommend:before {",".ibm-recommend-link:before {",$file_contents);

#default for missing icons
$file_contents = str_replace(".ibm-cta-arrow:before {",".ibm-contrast-link:before,
.ibm-fontsize-link:before,
.ibm-digg-link:before,
.ibm-delicious-link:before,
.ibm-friendfeed-link:before,
.ibm-stumbleupon-link:before,
.ibm-livedoor-link:before,
.ibm-hatena-link:before,
.ibm-baidu-link:before,
.ibm-renren-link:before,
.ibm-kaixn-link:before,
.ibm-wykop-link:before,
.ibm-blip-link:before,
.ibm-livestream-link:before,
.ibm-weibo-link:before,
.ibm-vaideo-link:before,
.ibm-xing-link:before,
.ibm-skype-link:before,
.ibm-googleplus-link:before,
.ibm-yahoojapan-link:before {",$file_contents);



file_put_contents('v17e-map.css',$file_contents);

?>