
	var map; 																	// Map Variable for Google Maps API	(Property Locations)	
	var office_map;																// Map Variable for Google Maps API (Office location)																	
	var $uislider =  $("#ui-slider");											// UI Slider Variables
	var $beds = $("#beds");														//
	var $uiAmount = $("#amount");												//
	var $uiSliderPrice = $("#ui-slider-price");									//
	var $cheight = $("footer").height()+$("header").height();					// Footer Staydown() function variable
	var $shortlistCount = $("#short-list-count-js");							// ShortList counter


	/* ---------------------------------------------------------------------- */
	/*	On Page Load
	/* ---------------------------------------------------------------------- */
	
	$(document).ready( function() {
    var url = (window.location.href).split("/").pop();
    $('ul.nav li').removeClass('active');
    $('ul.nav a[href="'+url+'"]').parent('li').addClass('active');
		
		$('.user a img').click(function(){
			$('.usermenu').stop().slideToggle(300);
		});
		
		if ($("#renting-map-js").length > 0){
		  generateMapMarkers ();
		}

	 	// Ini GPS Converter	
	 	
		GPSconverter();
		
	 	// Ini downBoy
	 	
		var $documentHeight = $(window).height();
		downBoy($documentHeight);
					
	 	//	Ini Accordion Menu
	 	 	
		$("#accordion-menu").ctAccordion();	
	 		
	 	//	Ini Calculate Short List Count  
	 	  
		calculateShortListCount(); 		
 	   	
		/* ---------------------------------------------------------------------- */
		/*	Function Detect iDevice
		 *	Documentation: http://ivaynberg.github.com/select2/	
		/* ---------------------------------------------------------------------- */ 	   	
 	   	
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
			
			/* ---------------------------------------------------------------------- */
			/*	Initialize Hide iDevice Address bar
			/* ---------------------------------------------------------------------- */
			
			window.addEventListener("load",function() {
				
			  // Set a timeout...
			  
			  setTimeout(function(){
			  	
			    // Hide the address bar!
			    
			    window.scrollTo(0, 1);
			  }, 0);
			});
			
			/*end hide address*/
		  	
		  	// Initialize Append Phone Footer
		  	
		  	createPhoneFooter ();
		  	
		} else {
			
			//Initialize Select2 if iDevice = false
			
			$(".chzn-select").select2(); 
		}
			
		/* ---------------------------------------------------------------------- */
		/*	Function Image Gallery Sticker
		/* ---------------------------------------------------------------------- */
	 	
		if ($(".gallery").length) {
			var gallery = new $.ThumbnailGallery($(".gallery"));
			var $galleryNotation = $(".gallery").attr('data-sticker');
			if ($galleryNotation.length) {
				$(".gallery").append("<span class='sticker sticker-hot'>"+$galleryNotation+"</span>");
			}
		}

		// Load videos
		
	 	if ($(".new-video-js").length) {
	 		$(".new-video-js").each(function(index, value){
	 			// for each node apply the following
	 			var videoURL = $(this).attr('data-url');
			    if (videoURL.indexOf('http') >= 0) 
			    {
			     // Approx ratio
			       vidWidth = $(this).width();
			       vidHeight = vidWidth/1.789473;
			       $(this).append("<iframe src="+videoURL+"?portrait=0&amp;color=ffffff width="+vidWidth+" height="+vidHeight+" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>");
			    }
	 		});
	 	}
		
	  	// Ini Responsive Videos
	  	
	  	$("body").fitVids();
	 
	 	// Ini Equal Heights (resize appartment listing divs to keep consistant height) 
	 	
		$(".appartment-listing").equalHeights(); 
		
		/* ---------------------------------------------------------------------- */
		/*	Ini oneByOne Banner
		/* ---------------------------------------------------------------------- */	
	 	
        $("#banner").oneByOne({													// the wrapper's name	
			className: 'oneByOne1',	             								// the wrapper div's class name of each slider	
			/* Please provide the width and height in the responsive 
			version, for the slider will keep the ratio when resize 
			depends on these size. */
			pauseByHover: true,													// pause the auto delay slideshow when user hover		
			width: 940,															// width of the slider		
			height: 341,														// height of the slider		
			easeType: 'random',													// will override effect if you don't pre-defined it in the element
			delay: 300,  														// the delay of the touch/drag tween	
			tolerance: 0.25, 													// the tolerance of the touch/drag
			slideShow: true,													// auto play the slider or not		
			slideShowDelay: 3000,												// the delay millisecond of the slidershow	
			responsive: true,													// slider's size with the media query in CSS
			minWidth: 480														// text is hidden at this width
		});  
		
		/*end oneByOne*/ 
		 
		/* ---------------------------------------------------------------------- */
		/*	Ini jQuery UI Slider
		/* ---------------------------------------------------------------------- */
	 	
		$uislider.slider({
			range : true,
			min : 0,
			max : 10,
			values : [1, 4],
			slide : function(event, ui) {
				$beds.val("Select Bedrooms: " + ui.values[0] + " - " + ui.values[1]);
			}
		});
		$beds.val("Select Bedrooms: " + $uislider.slider("values", 0) + " - " + $uislider.slider("values", 1));
		$uiSliderPrice.slider({
			range : true,
			min : 25000,
			max : 925000,
			values : [110000, 255000],
			slide : function(event, ui) {
				$uiAmount.val("Price Range: $" + ui.values[0] + " - $" + ui.values[1]);
			}
		});
		$uiAmount.val("Price Range: $" + $uiSliderPrice.slider("values", 0) + " - $" + $uiSliderPrice.slider("values", 1)); 
		
		/*end jQuery UI Slider*/ 
		
		
		/* ---------------------------------------------------------------------- */
		/*	Function Contact Form
		/* ---------------------------------------------------------------------- */
		
		$('#contactform').submit(function() {
	
			var action = $(this).attr('action');
			var values = $(this).serialize();
	
			$('#submit').attr('disabled', 'disabled').after('<img src="img/loader.gif" class="loader" />');
	
			$("#message").slideUp(750, function() {
	
				$('#message').hide();
	
				$.post(action, values, function(data) {
					$('#message').html(data);
					$('#message').slideDown('slow');
					$('#contactform img.loader').fadeOut('fast', function() {
						$(this).remove()
					});
					$('#submit').removeAttr('disabled');
					if (data.match('success') != null) $('#contactform').slideUp('slow');
				});
	
			});
	
			return false;
	
		});
		
		/* end contact form*/
		
	}); 
	
	/* end $(document).ready() */

	/* ---------------------------------------------------------------------- */
	/*	Custom Functions
	/* ---------------------------------------------------------------------- */
		
	$(function() {

	 	// Twitter Feeds
		$(".tweet").tweet({
          username: "peach03926297",
          avatar_size: 30,
          count: 8,
          filter: function(t){ return ! /^@\w+/.test(t.tweet_raw_text); },
          auto_join_text_url: null,
          loading_text: "loading ..."
        }).bind("loaded", function() {
          var ul = $(this).find(".tweet_list");
          var ticker = function() {
            setTimeout(function() {
              ul.find('li:first').fadeOut(1000, function() {
                $(this).detach().appendTo(ul).removeAttr('style');
              });
              ticker();
            }, 5000);
          };
          ticker();
        });
        
		/* end twitter feed */

	 	// Ini Calculator & Recalculator Mortgage btn
		$(".calculate-btn-js").click(function () {
				calculateMortgage()
			}
		);
		
		$(".recalculate-btn-js").click(function () {
			$(".results-js").fadeOut(400, function(){
				$(".calculation-js").fadeIn()
			})
			}
		);
		/*end calculator & recalculator btn*/

	}); 
	
	/* end Custom Functions */

	/* ---------------------------------------------------------------------- */
	/*	Generate Google Map Markers
	/* ---------------------------------------------------------------------- */
		
	function generateMapMarkers () {

			var map_locations = [],
				container = document.getElementById('renting-map-js'),
				c = $(container).children().get(),
				l = c.length,
				i, obj, p, m, j;
			
			//loop through all child nodes
			for (i = 0; i < l; i++) {
				obj = {};
				obj.img = c[i].getElementsByTagName('img')[0].src;
				p = c[i].getElementsByTagName('p');
				m = p.length;
				for (j = 0; j < m; j++)
				obj[p[j].className] = p[j].firstChild.nodeValue;
				map_locations[i] = obj;
				//console.log(obj);
			}
			
			//print all arrays
			//console.log(map_locations);
			
			//ini google map plot
			google.maps.event.addDomListener(window, 'load', initializeMap(map_locations));
	}
	
	/* end google map markers */
	
	/* ---------------------------------------------------------------------- */
	/*	Convert normal address to google map coordinates
	/* ---------------------------------------------------------------------- */
	
	function GPSconverter() {
		if($('#single_map').length == 0) 
		return;
		var $single_map =  $("#single_map");
		var theAddress = $single_map.attr('data-address');
		var iconRel = 	$single_map.attr('data-iconrel');
		var zoomLevel = parseInt($single_map.attr('data-zoom'));
		var mygc = new google.maps.Geocoder(theAddress);
		mygc.geocode({'address' : theAddress}, function(results, status){
			var mLat = results[0].geometry.location.lat();
		 	var mLong = results[0].geometry.location.lng();
		 	//console.log(mLat, mLong, iconRel, zoomLevel)
		 	initializeOneMap(mLat, mLong, iconRel, zoomLevel)
		});
	}

	/* end convert */

	/* ---------------------------------------------------------------------- */
	/*	Plot single map pin
	/* ---------------------------------------------------------------------- */
	
	function initializeOneMap(mLat, mLong, iconRel, zoomLevel) {
		var myOptions = {
			zoom: zoomLevel,
			center: new google.maps.LatLng(mLat, mLong),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable: true,
			disableDoubleClickZoom: false,
			zoomControl: false,
			overviewMapControl: false,
			streetViewControl: false,
			mapTypeControl: false,
			scrollwheel: true,
			disableDefaultUI: false
		};
		var office_map = new google.maps.Map(document.getElementById('single_map'), myOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(mLat, mLong),
			map: office_map,
			icon: iconRel
		});
	}

	/* end single map plot*/

	/* ---------------------------------------------------------------------- */
	/*	Google Map API: Plant Pins
	 * 
	 *  For control options please go to:
	 *  https://developers.google.com/maps/documentation/javascript/controls
	 *
	/* ---------------------------------------------------------------------- */	
	
	function initializeMap(map_locations) {
		if($("#map_div").length == 0)
			return;
		$thisMap = $("#google-map-js");
		var latc = $thisMap.attr('data-lat');
		var lngc = $thisMap.attr('data-lng');
		var zoomc = parseInt($thisMap.attr('data-zoom'));
		//console.log(latc, lngc);
		var iniLat = new google.maps.LatLng(latc, lngc);
		var mapOptions = {
			zoom: zoomc,
			center: iniLat,
			//disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var infowindow = new google.maps.InfoWindow();
		var map = new google.maps.Map(document.getElementById("map_div"), mapOptions);
		$.each(map_locations, function(key, value) { 
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(value['lat'], value['lng']),
				map: map,
				icon: "img/pin/marker.png",
				scrollwheel: false,
				streetViewControl:true,
				title: value['title']
			});
			
			var link = "link";
			google.maps.event.addListener( marker, 'click', function() {
				// Setting the content of the InfoWindow
				var content = '<div id="info" style="width:300px; height:100px;"><div>' + 
							  '<div style="display:inline-block; width:86px; verticle-align:top; float:left;"><img src='+value['img']+' class="thumbnail" style="width:80%; verticle-align:top;" /></div>' + 
							  '<div style="display:inline-block; width:200px; float:left;"><h6>' + 
							  value['prop-title'] + 
							  '</h6><b>' + 
							  value['street'] + 
							  '</b><br/>' + 
							  '<strong>&#36;' + 
							  value['price'] + 
							  '</strong>' + 
							  '<p><a href="property.html" class="btn btn-mini pull-right">Read More</a></p>' + 
							  '</div></div></div>';
				infowindow.setContent(content);
				infowindow.open(map, marker);
			});
			
		});
	 }
	 
	/* end Google Map Pins */
	
	/* ---------------------------------------------------------------------- */
	/*	Mortgage Calculator
	/* ---------------------------------------------------------------------- */
	
	function floor(number) {
		return Math.floor(number * Math.pow(10, 2)) / Math.pow(10, 2);
	}
	
	function calculateMortgage() {
		$(".calculation-js").fadeOut(400, function(){
			$(".results-js").fadeIn()
		})
		
		
		var mi = document.temps.IR.value / 1200;
		var base = 1;
		var mbase = 1 + mi;
		for ( i = 0; i < document.temps.YR.value * 12; i++) {
			base = base * mbase
		}
		document.temps.PI.value = floor(document.temps.LA.value * mi / (1 - (1 / base)))
		document.temps.MT.value = floor(document.temps.AT.value / 12)
		document.temps.MI.value = floor(document.temps.AI.value / 12)
		var dasum = document.temps.LA.value * mi / (1 - (1 / base)) + document.temps.AT.value / 12 + document.temps.AI.value / 12;
		document.temps.MP.value = floor(dasum);
	}
	
	/* end Mortgage Calculator */

	/* ---------------------------------------------------------------------- */
	/*	Keep footer down
	/* ---------------------------------------------------------------------- */
		
	function downBoy($documentHeight){
		
		$("#main").css('min-height', ($documentHeight-$cheight)-76+'px');
	}
	
	/* end Keep footer down *

	/* ---------------------------------------------------------------------- */
	/*	My Shortlist count
	/* ---------------------------------------------------------------------- */
	
	function calculateShortListCount() {
		//count start
		count = $(".shortlist li").length;
		$shortlistCount.text(count);
	}
			
	/* end MyShort list count */

	/* ---------------------------------------------------------------------- */
	/*	Phone dynamic Footer
	/* ---------------------------------------------------------------------- */
	
	function createPhoneFooter () {
		$(".body-text").append("<div class='iphone-footer-border visible-phone'></div>");
		$(".body-text").append(
			"<div class='iphone-footer visible-phone'><ul> <li><a href='javascript:void(0);'><i class='icon-search'></i></a></li><li><a href='javascript:void(0);'><i class='icon-star'></i><label class='badge badge-important' id='short-list-count-js'>3</label></a></li><li><a href='javascript:void(0);'><i class='icon-trash'></i></a></li> </ul></div>"
			) 	    
	}

	/* ---------------------------------------------------------------------- */
	/*	Window.resize functions
	/* ---------------------------------------------------------------------- */
		
	$(window).resize(function(){
		//Resize Mortgage Calculator Widget Input
		$(".calculation-js input").width(($(".width-js").width()-102)+'px');
		//CSS 100% with borders add extra 2px width, so we take out the extra 2px
		$("#map_div").width(($(".google-map-js").width()-2+'px'));
		//Resize appartment listing divs to keep consistant height
		$(".appartment-listing").equalHeights(); 
		//call Footer down function
		var $documentHeight = $(window).height();
		downBoy($documentHeight);

	});
	
	/* end Window.resize functions */
	
	/* ---------------------------------------------------------------------- */
	/*	Window.load functions
	/* ---------------------------------------------------------------------- */	
	
	$(window).load(function(){
		//Resize Mortgage Calculator Widget Input
		$(".calculation-js input").width(($(".width-js").width()-102)+'px');
		//CSS 100% with borders add extra 2px width, so we take out the extra 2px
		$("#map_div").width(($(".google-map-js").width()-2+'px'));

	});
	
	/* end Window.load functions */





