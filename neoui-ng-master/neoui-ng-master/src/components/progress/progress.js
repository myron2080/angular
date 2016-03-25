
define( [ "util/poll" ], function( poll ) {

	"use strict";

	var
	namespace = "$ui.progress",

	Progress = function( target, settings ) {

		var self = this;

		this.$node = target;
		this.settings = settings;

		if ( settings.template ) {
			this.$node.html( settings.template );
		}
	};

	Progress.prototype = {

		start: function() {

			var settings = this.settings;

			this.set( 0 );
			this.runner && poll.remove( this.runner );
			this.runner = runner.call( this, settings );

			/** Fadein */
			this.$node.find( settings.selector4bar + "," + settings.selector4icon ).css( {

				"opacity": 1,
				"visibility": "visible",
				"display": ""
			} );

			poll.start( this.runner );
			return this;
		},

		set: function( status ) {

			this.status = status;
			this.settings.render.call( this, status );

			return this;
		},

		done: function() {

			var self = this, settings = this.settings;

			self.set( 1 );

			setTimeout( function() {

				self.$node.find( settings.selector4bar + "," + settings.selector4icon ).css( {
					"opacity": 0,
					"visibility": "hidden"
				} );

				setTimeout( function() {
					self.set( 0 );
					self.$node.find( settings.selector4icon ).css( "display", "none" );
				}, 800 );
			}, 400 );

			poll.remove( self.runner );

			return this;
		},

		inc: function() {

            var
            status = this.status,
            settings = this.settings;

		    status += Math.random() * settings.seed;
            status = status > settings.max ? settings.max : status;
            this.status = status;
            return this;
		},

		dec: function() {

            var
            status = this.status,
            settings = this.settings,
            value = Math.random() * settings.seed;

		    status -= value;
            status = status < 0.02 ? value : status;
            this.status = status;
            return this;
		}
	};

	function runner( settings ) {

		var self = this;

		return poll.add( {

			action: function( deferred ) {

				var status = +self.status || 0;

				status += Math.random() * settings.seed;
				status = status > settings.max ? settings.max : status;
				self.set( status );
				deferred.resolve();
			},

            delay: true,
            interval: settings.speed
		} );
	}

	$.fn.progress = function( options ) {

		var
		settings,
		instance = this.data( namespace );

		if ( !instance ) {

			settings = $.extend( {}, $.fn.progress.defaults, options || {} );
			settings.max = settings.max > 1 ? 0.99123 : settings.max;
			instance = new Progress( this, settings );
			this.data( namespace, instance );
		}

		return instance;
	};

	$.fn.progress.defaults = {

		seed 		    : 0.05,
		speed 		    : 800,

		max 		    : 0.99123,

		template 	    : "<div class='md-progress-bar'><div></div></div><div class='md-progress-spinner'><div></div></div>",

		selector4bar 	: ".md-progress-bar",
		selector4icon 	: ".md-progress-spinner",

		render          : function( status ) {

            this
            .$node
            .find( this.settings.selector4bar )
            .css( {
                "width": status * 100 + "%",
                "-webkit-transition": "all .2s ease-out",
                "-moz-transition": "all .2s ease-out",
                "-ms-transition": "all .2s ease-out",
                "-o-transition": "all .2s ease-out",
                "transition": "all .2s ease-out",
            } );
		}
	};
} );

