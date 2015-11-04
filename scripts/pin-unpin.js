(function() {
	
    'use strict';

	// constructor object to create ocntentScroll objects
	var ocntentScroll = {

		init: function(targetElm, watchElm, offset) {
			
			this.targetElm   = document.getElementById(targetElm);
			this.watchElm   = document.getElementById(watchElm);  
			this.offset  = offset;
		},

		logger: function() {
			console.log ( this.targetElm + ' is set to pin or unpin in comparison with ' + this.watchElm ) ;    
		},
		
		getViewPort: function() {
        	
        	var winW = window.innerWidth;
        	
        	var chkViewPort = (winW < 768) ? 'mobile' : ((winW > 991) ? 'desktop' : 'tablet ');
			
			return chkViewPort;
        	
        },
		
		getOnScrollEvent: function() {
            var scrollEvent = /Android|Nexus|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)? "touchmove" : "scroll";
            
            return scrollEvent;
        }
	};


	// create ocntentScroll objects for pinUnpin
	var pinUnpin = Object.create(ocntentScroll);

    // initialize for pinUnpin
	pinUnpin.init('side-nav',  'side-nav-wrapper', 90);
	
	// call method on pinUnpin's ocntentScroll
	pinUnpin.logger();
	
	
	pinUnpin.onScroll = {
		
	    isPin: true,
		
		
		eventStart: function (scrollDirection) {
		
			var that = this,    //pinUnpin.onScroll
		        isPin = that.isPin,
				caller = pinUnpin,   
				targetElm = caller.targetElm,
				offset = caller.offset,
			    targetElmHeight = caller.targetElm.offsetHeight,
				bottom = caller.watchElm.getBoundingClientRect().bottom;
			
			if ( bottom - offset <= targetElmHeight && isPin && scrollDirection === 'down' ) {

				targetElm.classList.remove('yesme-pinOnTop');
				targetElm.classList.add('yesme-pinOnBottom');
				
		        that.isPin = false;


			} else if ( bottom - offset > targetElmHeight && !isPin && scrollDirection === 'up') {
				
                targetElm.classList.add('yesme-pinOnTop');
				targetElm.classList.remove('yesme-pinOnBottom');
				that.isPin = true;

			}    

		   
		}
    };
	
	
	var cachedScrollYpos =  window.pageYOffset;
	var isScrolled = false;
	
	var onScroll = function() {
		let scrollYpos = window.pageYOffset;
		let scrollDirection = (scrollYpos > cachedScrollYpos) ? 'down' : 'up';
		
		pinUnpin.onScroll.eventStart(scrollDirection);
		
		cachedScrollYpos = scrollYpos;

	}
	
	window.addEventListener("scroll", function() {
		
		isScrolled = true;

	});

	setInterval( function() {
               
		if ( isScrolled ) {
			isScrolled = false;

			onScroll();
		}
	}, 100);

} ());