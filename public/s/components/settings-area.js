/* jshint browser: true */
/* global $, libsb */

$(function() {
	var $tabTmpl = $(".config .tab");
	var currentConfig;

	function renderTab(label) {
		var tab = $tabTmpl.clone();
		tab.text(label);
		return tab;
	}

	$('.settings-menu').click(function(event) {
		// check event.target.closest('.tab').text()
	});

	$(".configure-button").on("click", function() {
        libsb.emit('navigate', { mode: "conf", tab: "general-settings", source: "configure-button" });
	});

	$(".conf-save").on("click", function() {
		currentConfig = null;
        libsb.emit('navigate', { mode: "normal", tab: "info", source: "conf-save" });
	});

	$(".conf-cancel").on("click", function() {
		currentConfig = null;
        libsb.emit('navigate', { mode: "normal", tab: "info", source: "conf-cancel" });
	});

	libsb.on('navigate', function(state, next) {
		// check state.mode == settings
		if(state.mode === "conf"){
			if(currentConfig && state.tab) $('.settingsview').empty().append(currentConfig[state.tab]);
			// if currentConfig is blank, then
			if(!currentConfig){
				libsb.emit('config-show', {},function(err, config) {
					currentConfig = config;
					$('conf-area').empty();
					for(i in config) {
						var className = 'tab-' + i + '-settings';
						$('.settings-menu ul').append('<li class = "tab ' + className + '">' + i + '</li>');
						// $('.settings-menu').addClass(config[i]);
					}
				});
			}
			else{
				libsb.emit('navigate', {tab: 'General'});
			}
		}
		next();
	});
});
