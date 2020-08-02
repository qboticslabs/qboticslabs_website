jQuery(document).ready(function($) {
    "use strict";

    $('body.preloader').jpreLoader({
        showSplash : false,
        loaderVPos : '50%',
    }).css('visibility','visible');

    $(".scroll").on('click',function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var hash = href.split('#');
        var url_hash = '#' + hash[1];
        if ($(url_hash).length > 0) {
            var offset = ($(window).width()<769) ? 20 : 100;
            $('html, body').animate({
                scrollTop: $(url_hash).offset().top-offset
            }, 1000);
        } 
        else{
            location.href = href;
        }
    });

    //contact form
    $("#dzencf-submit").on('click',function(e) {
        "use strict";
        e.preventDefault();
        var $button=$(this);
        var $form = $button.parents('form');
        var $wrapper = $form.parents('#dzencf-wrapper');
        $wrapper.find('.dzencf-response-output').slideUp(300);
        $button.val('Sending').prop('disabled', true).addClass('disabled');
        var success_msg = '';
        if($form.find('#formid').val()=='planner'){
            success_msg = "Project details are successfuly sent. Thank you for your interest, we will respond as soon as possible.";
        }
        else{
            success_msg = "Message is successfuly sent. Thank you for your interest, we will respond as soon as possible.";
        }
        var str = $form.serialize() + '&action=js';
        $.ajax({
            type: "POST",
            url: 'php/sendmail.php',
            data: str,
            success: function(msg){
                if(msg == "OK"){
                    $button.val('Sended');
                    $('.gtt_reg_data_field').prop('disabled', true).addClass('disabled_text_input');
                    var form_height = $form.outerHeight();
                    $form.slideUp(1200);
                    $('html, body').animate({scrollTop: $(window).scrollTop() - form_height});
                    $wrapper.find('.dzencf-response-output').addClass('success').html(success_msg).slideDown(600);
                }
                else{
                    $button.val('Send').prop('disabled', false).removeClass('disabled');
                    $wrapper.find('.dzencf-response-output').html(msg).slideDown(600);
                }
            }
        });
        return false;
    });
    

    $('.home.page .dzen_section_DD').waypoint(function(direction) {
        var section_id = $(this).attr('id');
        if(section_id!==undefined){
            $('.current-menu-item, .current-menu-ancestor').removeClass('current-menu-item').removeClass('current-menu-ancestor');
            if(direction==='down'){
                var $menu_item = $('#main_menu a[href=#'+section_id+']').parent();
                if($menu_item.length>0){
                    $menu_item.addClass('current-menu-item');
                }
                else{
                    $('#main_menu .current_page_item').addClass('current-menu-item');
                }
            }
            else if(direction==='up'){
                var previous_section_id = $(this).prevAll('[id]:first').attr('id');
                var $menu_item = $('#main_menu a[href=#'+previous_section_id+']').parent();
                if($menu_item.length>0){
                    $menu_item.addClass('current-menu-item');
                }
                else{
                    $('#main_menu .current_page_item').addClass('current-menu-item');
                }
            }
        }
    },{
      offset: 100
    });



    var $main_header = $('#dz_main_header');
    var $header_spacer = $('#dz_header_spacer');

    var header_height = $main_header.outerHeight();

    $header_spacer.height(header_height).hide();
    var admin_toolbar_height = parseInt($('html').css('marginTop'), 10);

    function sticky_header(){
        if($(window).width()>767){
            $main_header.removeClass('sticky_header').removeClass('sticky_header_low');
            $main_header.css({
                'z-index': '2000',
                'position': 'static'
            });
            $main_header.css('position','fixed').css('top', 0+admin_toolbar_height).addClass('sticky_header');
            $header_spacer.show();
            $(document).scroll(function(){
                var scroll_top = $(document).scrollTop();
                var padding_diff = Math.floor(scroll_top/2);
                padding_diff = (padding_diff > 20) ? 20 : padding_diff;
                if(padding_diff==20){
                    $main_header.addClass('sticky_header_low');
                }
                else{
                    $main_header.removeClass('sticky_header_low').css({'paddingTop':30-padding_diff , 'paddingBottom':30-padding_diff});
                    $header_spacer.height(header_height - padding_diff*2);
                }
            });
        }
        else{
            $header_spacer.hide();
            $main_header.css({
                'position':'relative',
                'top': 0,
                'padding-top': '30px',
                'padding-bottom': '30px',
                'z-index': '0'
            }).removeClass('sticky_header').removeClass('sticky_header_low');
        }
    }
    sticky_header();

    

    $('.accordion-group').on('show', function() {
        $(this).find('i').removeClass('icon-plus').addClass('icon-minus');
    });
    $('.accordion-group').on('hide', function() {
        $(this).find('i').removeClass('icon-minus').addClass('icon-plus');
    });


    var $sf = $('#main_menu');
    if($('#ABdev_menu_toggle').css('display') === 'none') {
        // enable superfish when the page first loads if we're on desktop
        $sf.superfish({
            delay:          300,
            animation:      {opacity:'show',height:'show'},
            animationOut:   {height:'hide'},
            speed:          'fast',
            speedOut:       'fast',            
            cssArrows:      false, 
            disableHI:      true /* load hoverIntent.js in header to use this option */,
            onBeforeShow:   function(){
                var ww = $(window).width();
                if(this.parent().offset() !== undefined){
                    var locUL = this.parent().offset().left + this.width();
                    var locsubUL = this.parent().offset().left + this.parent().width() + this.width();
                    var par = this.parent();
                    if(par.parent().is('#main_menu') && (locUL > ww)){
                        this.css('marginLeft', "-"+(locUL-ww+20)+"px");
                    }
                    else if (!par.parent().is('#main_menu') && (locsubUL > ww)){
                        this.css('left', "-"+(this.width())+"px"); 
                    }
                }
            }
        });
    }


    $('#ABdev_menu_toggle i').on('click',function(){
        if($sf.css('display') === 'none'){
            $sf.show();
        }
        else{
            $sf.hide();
        }
    });


    $(".submit").on('click',function () {
        $(this).closest("form").submit();
    });


    $('input, textarea').placeholder();

    
    var $content = $("#timeline_posts");
    var $loader = $("#timeline_loading");
    var itemSelector = ('.timeline_post');
    function Timeline_Classes(){ 
        $content.find(itemSelector).each(function(){
           var posLeft = $(this).css("left");
           if(posLeft == "0px"){
               $(this).css('opacity','1').removeClass('timeline_post_right').addClass('timeline_post_left');          
           }
           else{
               $(this).css('opacity','1').removeClass('timeline_post_left').addClass('timeline_post_right');
           } 
        });
    }
    $content.imagesLoaded( function() {
        $content.masonry({
          columnWidth: ".timeline_post_first",
          gutter: 100,
          itemSelector: itemSelector,
        });
        Timeline_Classes();
    });
    


    var $isotope_container = $('#dz_latest_portfolio');
    $isotope_container.imagesLoaded( function() {
        $isotope_container.isotope({
            itemSelector : '.portfolio_item',
            animationEngine: 'best-available',
        });
        var $optionSets = $('.option-set'),
            $optionLinks = $optionSets.find('a');
        $optionLinks.on('click',function(){
            var $this = $(this);
            if ( $this.hasClass('selected') ) {
                return false;
            }
            var $optionSet = $this.parents('.option-set');
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            value = value === 'false' ? false : value;
            options[ key ] = value;
            if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
                changeLayoutMode( $this, options );
            } else {
                $isotope_container.isotope( options );
            }
            return false;
        });
    });



    /*Nivo Slider in Portfolio*/

    $(window).load(function() {
        $('#slider').nivoSlider({
            effect:'fade', // Specify sets like: 'fold,fade,sliceDown' 
            pauseTime:3000, // How long each slide will show
            directionNav:false, // Next & Prev navigation
            controlNavThumbs:true,
            controlNavThumbsFromRel:false,
            manualAdvance: false,
        });
    });


        $('.dzen_section_dd').each(function(){
        if ($(this).data('background_image')){
            var background_image = $(this).data('background_image');
            $(this).css('background-image', 'url(' + background_image + ')');
        }
    });


/*********** Parallax ************************************************************/
    $('.dzen-parallax').each(function(){
        var parallax_amount = $(this).data('parallax');
        if(!jQuery.browser.mobile){
            $(this).css('background-image', 'url(' + $(this).data('background_image') + ')');
            $(this).parallax("50%", parallax_amount,false);
        }
        else{
            $(this).css('background-attachment', 'scroll');
        }
    });


    function dzen_resize_video_bg($section){
        var $video = $section.find('.dzen_video_background');
        $video.width('auto');
        var video_height = $video.height();
        var ratio = $video.width()/video_height;
        var difference = $section.height()-video_height;
        if(difference>0){
            $video.width((video_height+difference)*ratio);
        }
    }

    $('.dzen-video-bg').each(function(){
        dzen_resize_video_bg($(this));
        $(this).find('.dzen_video_background').css({'visibility':'visible'});
    });


/*********** Animations ************************************************************/
    if(!jQuery.browser.mobile){
        $(".dzen-animo").one('inview', function(event, isInView) {
            if (isInView) {
                var animation = $(this).data('animation');
                var duration = $(this).data('duration')/1000;
                var delay = parseInt($(this).data('delay'),10);
                var $element = $(this);
                setTimeout(function() {
                   $element.css({visibility: "visible"}).animo( { animation: animation, duration: duration} );
                }, delay);
                
            }
        });
    }
    else{
        $(".dzen-animo").css({visibility: "visible"});
    }

    $(".dzen-animo-children").one('inview', function(event, isInView) {
        var animation = $(this).data('animation');
        var duration = $(this).data('duration')/1000;
        var delay = parseInt($(this).data('delay'),10);
        var difference = 0;
        if (isInView) {
            $(this).children().each(function(){
                var $element = $(this);
                setTimeout(function() {
                    $element.css({visibility: "visible"}).animo( { animation: animation, duration: duration} );
                }, difference);
                difference = difference + delay;
            });
        }
    });


/*********** Accordions ************************************************************/
    $( ".dzen-accordion" ).accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        create: function( event, ui ) {
            var expanded = $(this).data("expanded");
            if(expanded===0){
                expanded = false;
            }
            else{
                expanded = expanded-1;
            }
            $(this).accordion( "option", "active", expanded);
        },
    }); 


/*********** Tabs ************************************************************/
    $('.dzen-tabs').each(function() {
        var $tabs = $(this);
        var effect = $tabs.data("effect");
        var optionSelected = $tabs.data("selected")-1;
        var directions;
        if($tabs.hasClass('dzen-tabs-horizontal')){
            directions = {'after':'right', 'before':'left'};
        }
        else{
            directions = {'after':'down', 'before':'up'};
        }
        $tabs.tabs({ 
            active:optionSelected,
            beforeActivate: function( event, ui ) {
                if(effect==='slide'){
                    var parent = ui.oldPanel.parent();
                    var diffHeight = parent.height() - (ui.oldPanel.height() - ui.newPanel.height());
                    parent.animate({height: diffHeight}, 300, function() {
                        parent.height('auto');
                    });
                    if (ui.newTab.index() > ui.oldTab.index()){
                        $tabs.tabs( "option", "show", { effect: "slide", direction: directions.after, duration: 400 } );
                    }
                    else{
                        $tabs.tabs( "option", "show", { effect: "slide", direction: directions.before, duration: 400 } );
                    }
                }
                else if(effect==='fade'){
                    $tabs.tabs( "option", "show", true );
                }
            },
        });
    });

    function dzen_tabs_responsive(){
        $('.dzen-tabs').each(function(){
            var $tabs = $(this);
            if($tabs.width() < parseInt($tabs.data('break_point'),10)){
                $tabs.addClass('dzen-tabs-fullwidthtabs');
            }
            else{
                $tabs.removeClass('dzen-tabs-fullwidthtabs');
            }
        });
    }

    dzen_tabs_responsive();



/*********** Alert Box ************************************************************/
    $( ".dzen_alert_box_close" ).on('click',function(){
        var $parent = $(this).parent();
        $parent.animate({height:"0px", paddingTop:"0px", paddingBottom:"0px", margin:"0px", opacity:"0"},400);
    });


/*********** Stats excerpt counter ************************************************************/
    function dzen_counter($object,interval,max,increment) {
        var number = parseInt($object.text(),10) + increment;
        if (number < max){
            setTimeout(function() {dzen_counter($object,interval,max,increment);} ,interval);
            $object.text(number);
        }
        else{
            $object.text(max);
        }
    }

    if(!jQuery.browser.mobile){
        $(".dzen_stats_number").one('inview', function(event, isInView) {
            if (isInView) {
                var max = $(this).data("number");
                var increment = 1;
                if (max > 50) increment = 10;
                if (max > 500) increment = 100;
                if (max > 5000) increment = 200;
                if (max > 10000) increment = 1000;
                var interval = $(this).data("duration")/(max/increment);
                $(this).text('0');
                dzen_counter($(this),interval,max,increment);
            }
        });
    }
    else{
        $(".dzen_stats_number").each(function() {
            var max = $(this).data("number");
            $(this).text(max);
        });
    }


/*********** Knob ************************************************************/
    $(".dzen_knob_wrapper").each(function(){
        var $knob = $(this).find(".dzen_knob");
        var $number_sign = $(this).find(".dzen_knob_number_sign");
        var $number = $(this).find(".dzen_knob_number");

        $knob.knob({
            'displayInput' : false,
        });

        var canvas_width = $(this).find("canvas").width();

        $number_sign.css({
            'visibility' : 'visible',
            'lineHeight' : canvas_width+'px',
        });
    
        if(!jQuery.browser.mobile){
            $knob.val(0).trigger('change');
            $(this).one('inview', function(event, isInView) {
                if (isInView) {
                    $({value: 0}).animate({value: $knob.data("number")}, {
                        duration: 1000,
                        easing:'swing',
                        step: function() 
                        {
                            var current = Math.ceil(this.value);
                            $knob.val(current).trigger('change');
                            $number.html(current);
                        }
                    })
                }
            });
        }
        else{
            $number.html($knob.data("number"));
        }
    });


/*********** Tooltip ************************************************************/
    $('.dzen_tooltip').tipsy({
        fade: true,
        opacity: 0.8,
        gravity: function(){
            var gravity = $(this).data("gravity");
            gravity = (gravity !== undefined) ? gravity : 's';
            return gravity;
        }
    });


/*********** Back to Top ************************************************************/
    $('.dzen_divider a').on('click',function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, 'slow');
    });


/*********** Team Member ************************************************************/
    $('.dzen_team_member_modal_link').on('click',function(e){
        e.preventDefault();
        var $parent = $(this).closest('.dzen_team_member');
        var $modal = $parent.find('.dzen_team_member_modal');
        var $section = $parent.closest('.dzen_section_DD');
        $modal.detach().appendTo('body').fadeIn().addClass('dzen_team_member_modal_opened');
        $parent.addClass('dzen_team_member_with_opened_modal');
    });
    $('.dzen_team_member_modal_close').on('click',function(e){
        e.preventDefault();
        $(this).parent().fadeOut('slow', function(){
            $(this).detach().appendTo($('.dzen_team_member_with_opened_modal')).removeClass('dzen_team_member_modal_opened');
            $('.dzen_team_member_with_opened_modal').removeClass('dzen_team_member_with_opened_modal');
        })
    });
    $(document).on('keydown', function(e) {
        if ( e.keyCode === 27 ) { //ESC
            $('.dzen_team_member_modal_opened').fadeOut('slow', function(){
                $(this).detach().appendTo($('.dzen_team_member_with_opened_modal')).removeClass('dzen_team_member_modal_opened');
                $('.dzen_team_member_with_opened_modal').removeClass('dzen_team_member_with_opened_modal');
            })
        }
    });


/*********** Progress Bar ************************************************************/
    if(!jQuery.browser.mobile){
        $(".dzen_meter .dzen_meter_percentage").width(0).one('inview', function(event, isInView) {
          if (isInView) {
            var newwidth = $(this).data("percentage") + '%';
            $(this).animate({width: newwidth}, {
                duration:1500,
                step: function(now) {
                    $(this).find('span').html(Math.floor(now) + '%');
                    var above_tenths = Math.floor(now/10);
                    for(var i=1; i<=above_tenths; i++){
                        $(this).addClass('dzen_meter_above'+above_tenths*10);
                    }
                }
            });
          }
        });
    }
    else{
        $(".dzen_meter .dzen_meter_percentage").each(function(){
            var newwidth = $(this).data("percentage");
            $(this).css('width', newwidth+'%');
            for(var i=0; i<=newwidth; i++){
                var above_tenths = Math.floor(i/10);
                $(this).addClass('dzen_meter_above'+above_tenths*10);
            }

        });
    }

    
    /*********** Google Maps ************************************************************/
    //contact page google maps
    function initialize_gmap($element) {
        var myLatlng = new google.maps.LatLng($element.data('lat'),$element.data('lng'));
        var markerLatlng = new google.maps.LatLng($element.data('markerlat'),$element.data('markerlng'));
        var scrollwheel = ($element.data('scrollwheel') == 1 ? true : false);
        var mapTypeControl = ($element.data('maptypecontrol') == 1 ? true : false);
        var panControl = ($element.data('pancontrol') == 1 ? true : false);
        var zoomControl = ($element.data('zoomcontrol') == 1 ? true : false);
        var scaleControl = ($element.data('scalecontrol') == 1 ? true : false);
        var map_type = google.maps.MapTypeId.ROADMAP;
        if ($element.data('map_type') == 'SATELLITE') map_type = google.maps.MapTypeId.SATELLITE;
        if ($element.data('map_type') == 'HYBRID') map_type = google.maps.MapTypeId.HYBRID;
        if ($element.data('map_type') == 'TERRAIN') map_type = google.maps.MapTypeId.TERRAIN;
      var mapOptions = {
        zoom: parseInt($element.data('zoom'),10),
        center: myLatlng,
        mapTypeId: map_type,
        scrollwheel: scrollwheel,
        mapTypeControl: mapTypeControl,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: panControl,
        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        zoomControl: zoomControl,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: scaleControl,
        scaleControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
      };
      var elemnt_id = $element.attr('id');
      var map = new google.maps.Map(document.getElementById(elemnt_id), mapOptions);
      var infowindow = new google.maps.InfoWindow({
          content: $element.data('markercontent')
      });
      var marker = new google.maps.Marker({
          position: markerLatlng,
          map: map,
          title: $element.data('markertitle'),
          icon: $element.data('markericon')
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    }


    $('.dzen_google_map').each(function(){
        google.maps.event.addDomListener(window, 'load', initialize_gmap($(this)));
    });



    $(window).resize(function() {

        Timeline_Classes();

        sticky_header();

        $(".dzen_knob_wrapper").each(function(){
            var $number_sign = $(this).find(".dzen_knob_number_sign");
            var canvas_width = $(this).find("canvas").width();
            $number_sign.css({
                'lineHeight' : canvas_width+'px',
            });
        });

        $('.dzen-video-bg').each(function(){
            dzen_resize_video_bg($(this));
        });

        dzen_tabs_responsive();
        
        $('#dz_latest_portfolio').isotope('reLayout');

        if($('#ABdev_menu_toggle').css('display') === 'none' && !$sf.hasClass('sf-js-enabled')) {
            // you only want SuperFish to be re-enabled once (sf.hasClass)
            $sf.show();
            $sf.superfish({
                delay:          300,
                animation:      {opacity:'show',height:'show'},
                animationOut:   {height:'hide'},
                speed:          'fast',
                speedOut:       'fast',            
                cssArrows:      false, 
                disableHI:      true /* load hoverIntent.js in header to use this option */,
                onBeforeShow:   function(){
                    var ww = $(window).width();
                    var locUL = this.parent().offset().left + this.width();
                    var locsubUL = this.parent().offset().left + this.parent().width() + this.width();
                    var par = this.parent();
                    if(par.hasClass("menu-item-depth-0") && (locUL > ww)){
                        this.css('marginLeft', "-"+(locUL-ww+20)+"px");
                    }
                    else if (!par.hasClass("menu-item-depth-0") && (locsubUL > ww)){
                        this.css('left', "-"+(this.width())+"px"); 
                    }
                }
            });
        } else if($('#ABdev_menu_toggle').css('display') != 'none' && $sf.hasClass('sf-js-enabled')) {
            // smaller screen, disable SuperFish
            $sf.superfish('destroy');
            $sf.hide();
        }
    });
    

});



/******************************************
    -   REVOLUTION SLIDER  -
******************************************/
var setREVStartSize = function() {
    var tpopt = new Object();
        tpopt.startwidth = 1170;
        tpopt.startheight = 455;
        tpopt.container = jQuery('#rev_slider_1_1');
        tpopt.fullScreen = "off";
        tpopt.forceFullWidth="off";

    tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),10);tpopt.height=parseInt(tpopt.container.height(),10);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj=jQuery;
tpj.noConflict();
var revapi1;

tpj(document).ready(function() {

if(tpj('#rev_slider_1_1').revolution == undefined)
    revslider_showDoubleJqueryError('#rev_slider_1_1');
else
   revapi1 = tpj('#rev_slider_1_1').show().revolution(
    {
        dottedOverlay:"none",
        delay:9000,
        startwidth:1170,
        startheight:455,
        hideThumbs:200,

        thumbWidth:100,
        thumbHeight:50,
        thumbAmount:3,
        

        simplifyAll:"off",

        navigationType:"bullet",
        navigationArrows:"solo",
        navigationStyle:"round",

        touchenabled:"on",
        onHoverStop:"on",
        nextSlideOnWindowFocus:"off",

        swipe_threshold: 0.7,
        swipe_min_touches: 1,
        drag_block_vertical: false,
        


        keyboardNavigation:"off",

        navigationHAlign:"center",
        navigationVAlign:"bottom",
        navigationHOffset:0,
        navigationVOffset:20,

        soloArrowLeftHalign:"left",
        soloArrowLeftValign:"center",
        soloArrowLeftHOffset:0,
        soloArrowLeftVOffset:0,

        soloArrowRightHalign:"right",
        soloArrowRightValign:"center",
        soloArrowRightHOffset:0,
        soloArrowRightVOffset:0,

        shadow:0,
        fullWidth:"on",
        fullScreen:"off",

        spinner:"spinner0",
        
        stopLoop:"off",
        stopAfterLoops:-1,
        stopAtSlide:-1,

        shuffle:"off",

        autoHeight:"off",
        forceFullWidth:"off",
        
        
        
        hideThumbsOnMobile:"off",
        hideNavDelayOnMobile:1500,
        hideBulletsOnMobile:"off",
        hideArrowsOnMobile:"off",
        hideThumbsUnderResolution:0,

        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        startWithSlide:0    });
    
}); /*ready*/

            

/******************************************
    -   PREPARE PLACEHOLDER FOR SLIDER  -
******************************************/
var setREVStartSize = function() {
    var tpopt = new Object();
        tpopt.startwidth = 570;
        tpopt.startheight = 300;
        tpopt.container = jQuery('#rev_slider_2_1');
        tpopt.fullScreen = "off";
        tpopt.forceFullWidth="off";

    tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),10);tpopt.height=parseInt(tpopt.container.height(),10);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj=jQuery;
tpj.noConflict();
var revapi2;

tpj(document).ready(function() {

if(tpj('#rev_slider_2_1').revolution == undefined)
    revslider_showDoubleJqueryError('#rev_slider_2_1');
else
   revapi2 = tpj('#rev_slider_2_1').show().revolution(
    {
        dottedOverlay:"none",
        delay:9000,
        startwidth:570,
        startheight:300,
        hideThumbs:0,

        thumbWidth:100,
        thumbHeight:50,
        thumbAmount:2,
        

        simplifyAll:"off",

        navigationType:"bullet",
        navigationArrows:"solo",
        navigationStyle:"round",

        touchenabled:"on",
        onHoverStop:"on",
        nextSlideOnWindowFocus:"off",

        swipe_threshold: 0.7,
        swipe_min_touches: 1,
        drag_block_vertical: false,
        


        keyboardNavigation:"off",

        navigationHAlign:"center",
        navigationVAlign:"bottom",
        navigationHOffset:0,
        navigationVOffset:20,

        soloArrowLeftHalign:"left",
        soloArrowLeftValign:"center",
        soloArrowLeftHOffset:0,
        soloArrowLeftVOffset:0,

        soloArrowRightHalign:"right",
        soloArrowRightValign:"center",
        soloArrowRightHOffset:0,
        soloArrowRightVOffset:0,

        shadow:0,
        fullWidth:"on",
        fullScreen:"off",

        spinner:"spinner0",
        
        stopLoop:"off",
        stopAfterLoops:-1,
        stopAtSlide:-1,

        shuffle:"off",

        autoHeight:"off",
        forceFullWidth:"off",
        
        
        
        hideThumbsOnMobile:"off",
        hideNavDelayOnMobile:1500,
        hideBulletsOnMobile:"off",
        hideArrowsOnMobile:"off",
        hideThumbsUnderResolution:0,

        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        startWithSlide:0    });
    
}); /*ready*/

            
/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);