
require.config( {

	baseUrl: "src",

	paths: {
		ui: "../src/components",
		util: "../src/util",
		modules: "../src/modules"
	}
} );

require( [
        "ui/anchor/anchor",
        "ui/sidenav/sidenav-ng",
        "util/ng-afterRender",
        "demo/modal/index",
        "demo/tab/index",
        "demo/message/index",
        "demo/autoComplete/index",
        "demo/toast/index",
        "demo/getstarted/index",
        "demo/tooltip/index",
        "demo/sidenav/index",
        "demo/dateutil/index",
        "demo/tree/index",
        "demo/rate/index",
        "demo/progress/index",
        "demo/calendar/index",
        "demo/dropdown/index",
        "demo/ripple/index",
        "demo/checkbox/index",
        "demo/switcher/index",
        "demo/button/index",
        "demo/radio/index",
        "demo/loading/index",
        "demo/pagination/index",
        "demo/accordion/index",
        "demo/validation/index" ], function() {

	"use strict";

	var app = angular

	.module( "neoui", [ "ngRoute", "afterRender", "$ui.sidenav",
	        "demo.modal",
	        "demo.tab",
	        "demo.message",
	        "demo.autoComplete",
	        "demo.validation",
	        "demo.toast",
	        "demo.getstarted",
	        "demo.tooltip",
	        "demo.sidenav",
	        "demo.dateutil",
	        "demo.tree",
	        "demo.checkbox",
	        "demo.switcher",
	        "demo.radio",
	        "demo.rate",
	        "demo.dropdown",
	        "demo.ripple",
	        "demo.button",
	        "demo.loading",
	        "demo.pagination",
	        "demo.accordion",
	        "demo.progress",
	        "demo.calendar" ] )

        .config( [ "$httpProvider", function( $httpProvider ) {

        var progress;

        setTimeout( function() {

            progress = $( ".md-progress:first" ).progress();

            $httpProvider.defaults.transformResponse.push( function( data, headers ) {
                setTimeout( function() {
                    progress.done();
                }, 1000 );
                return data;
            } );
            $httpProvider.defaults.transformRequest.push( function( data, headers ) {
                progress.start();
                return data;
            } );
        } );
    } ] )

	.config( [ "$routeProvider", function( $routeProvider ) {

		$routeProvider
		    .when( "/home", {
		        templateUrl: "src/demo/home/index.html"
		    } )
			.when( "/color", {
				templateUrl: "src/demo/color/index.html"
			} )
			.when( "/getstarted", {
				templateUrl: "src/demo/getstarted/index.html"
			} )
			.when( "/tooltip", {
				templateUrl: "src/demo/tooltip/index.html"
			} )
			.when( "/modal", {
				templateUrl: "src/demo/modal/index.html"
			} )
		    .when( "/tab", {
		        templateUrl: "src/demo/tab/index.html"
		    } )
		    .when( "/message", {
		        templateUrl: "src/demo/message/index.html"
		    } )
		    .when( "/autoComplete", {
		        templateUrl: "src/demo/autoComplete/index.html"
		    } )
		    .when( "/validation", {
		        templateUrl: "src/demo/validation/index.html"
		    } )
		    .when( "/toast", {
		        templateUrl: "src/demo/toast/index.html"
		    } )
		    .when( "/tree", {
		        templateUrl: "src/demo/tree/index.html"
		    } )
		    .when( "/loading", {
		        templateUrl: "src/demo/loading/index.html"
		    } )
		    .when( "/sidenav", {
		        templateUrl: "src/demo/sidenav/index.html"
		    } )
		    .when( "/dateutil", {
		        templateUrl: "src/demo/dateutil/index.html"
		    } )
		    .when( "/editor", {
		        templateUrl: "src/demo/editor/index.html"
		    } )
		    .when( "/calendar", {
		        templateUrl: "src/demo/calendar/index.html"
		    } )
		    .when( "/rate", {
		        templateUrl: "src/demo/rate/index.html"
		    } )
		    .when( "/ripple", {
		        templateUrl: "src/demo/ripple/index.html"
		    } )
		    .when( "/progress", {
		        templateUrl: "src/demo/progress/index.html"
		    } )
		    .when( "/button", {
		        templateUrl: "src/demo/button/index.html"
		    } )
		    .when( "/checkbox", {
		        templateUrl: "src/demo/checkbox/index.html"
		    } )
		    .when( "/switcher", {
		        templateUrl: "src/demo/switcher/index.html"
		    } )
		    .when( "/radio", {
		        templateUrl: "src/demo/radio/index.html"
		    } )
		    .when( "/dropdown", {
		        templateUrl: "src/demo/dropdown/index.html"
		    } )
		    .when( "/accordion", {
		        templateUrl: "src/demo/accordion/index.html"
		    } )
		    .when( "/pagination", {
		        templateUrl: "src/demo/pagination/index.html"
		    } )
			.otherwise( {
				redirectTo: "/home"
			} );
	} ] )

        .controller( "mainController", [ "$scope", "$location", function( $scope, $location ) {

        $scope.openMenu = function( menu ) {

            $scope.title = location.hash.split( "/" )[1];

            setTimeout( function() {

            menu
            .left()
            .$node
            .delegate( "[data-url]", "click", function( e ) {

                $location.path( "/" + this.getAttribute( "data-url" ) );
                $scope.$apply();

                setTimeout( function() {
                menu.close();
                $( "html, body" ).scrollTop( 0 );
                }, 500 );
            } );
            }, 500 );
        };
    } ] );

    $( function() {
        setTimeout( function() {
            $( ".md-loading:first" ).loading().hide();
        }, 1000 );
    } );

	angular.bootstrap( document, [ "neoui" ] );
} );
