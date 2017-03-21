(function() {
	function LandingCtrl() {
		this.heroTitle = "Turn Down For What!"
	}

	angular
		.module('blocJams')
		.controller('LandingCtrl', LandingCtrl);
})();