"use strict";
(function () {
	// Global variables
	var userAgent = navigator.userAgent.toLowerCase(),
			initialDate = new Date(),

			$document = $(document),
			$window = $(window),
			$html = $("html"),
			$body = $("body"),

			isDesktop = $html.hasClass("desktop"),
			isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false,
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
			windowReady = false,
			isNoviBuilder = false,
			pageTransitionDuration = 500,

			plugins = {
				bootstrapTooltip: $("[data-toggle='tooltip']"),
				bootstrapTabs: $('.tabs-custom'),
				counter: $(".counter"),
				captcha: $('.recaptcha'),
				campaignMonitor: $('.campaign-mailform'),
				copyrightYear: $(".copyright-year"),
				isotope: $(".isotope"),
				materialParallax: $(".parallax-container"),
				mailchimp: $('.mailchimp-mailform'),
				owl: $(".owl-carousel"),
				preloader: $(".preloader"),
				rdNavbar: $(".rd-navbar"),
				maps: $(".google-map-container"),
				rdMailForm: $(".rd-mailform"),
				rdInputLabel: $(".form-label"),
				regula: $("[data-constraints]"),

				wow: $(".wow"),

				buttonWinona: $('.button-winona'),

				animePresets: document.querySelectorAll('[data-anime]'),
				navbar: document.querySelectorAll('.navbar'),
			};

	/**
	 * @desc Calls a function when element has been scrolled into the view
	 * @param {object} element - jQuery object
	 * @param {function} func - init function
	 */


	// Initialize scripts that require a loaded page
	$window.on('load', function () {
		// Page loader & Page transition
		if (plugins.preloader.length && !isNoviBuilder) {
			pageTransition({
				target: document.querySelector('.page'),
				delay: 0,
				duration: pageTransitionDuration,
				classIn: 'fadeIn',
				classOut: 'fadeOut',
				classActive: 'animated',
				conditions: function (event, link) {
					return !/(\#|callto:|tel:|mailto:|:\/\/)/.test(link)
							&& !event.currentTarget.hasAttribute('data-lightgallery');
				},
				onTransitionStart: function (options) {
					setTimeout(function () {
						plugins.preloader.removeClass('loaded');
					}, options.duration * .75);
				},
				onReady: function () {
					plugins.preloader.addClass('loaded');
					windowReady = true;
				}
			});
		}
	});

	// Carousel JQuery
	$(function () {
				isNoviBuilder = window.xMode;

				function initOwlCarousel(c) {
					var aliaces = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"],
							values = [0, 576, 768, 992, 1200, 1600],
							responsive = {};

					for (var j = 0; j < values.length; j++) {
						responsive[values[j]] = {};
						for (var k = j; k >= -1; k--) {
							if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
								responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"), 10);
							}
							if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
								responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"), 10);
							}
							if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
								responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"), 10);
							}
							if (!responsive[values[j]]["autoWidth"] && responsive[values[j]]["autoWidth"] !== 0 && c.attr("data" + aliaces[k] + "auto-width")) {
								responsive[values[j]]["autoWidth"] = k < 0 ? false : c.attr("data" + aliaces[k] + "auto-width");
							}
						}
					}

					// Enable custom pagination
					if (c.attr('data-dots-custom')) {
						c.on("initialized.owl.carousel", function (event) {
							var carousel = $(event.currentTarget),
									customPag = $(carousel.attr("data-dots-custom")),
									active = 0;

							if (carousel.attr('data-active')) {
								active = parseInt(carousel.attr('data-active'), 10);
							}

							carousel.trigger('to.owl.carousel', [active, 300, true]);
							customPag.find("[data-owl-item='" + active + "']").addClass("active");

							customPag.find("[data-owl-item]").on('click', function (e) {
								e.preventDefault();
								carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item"), 10), 300, true]);
							});

							carousel.on("translate.owl.carousel", function (event) {
								customPag.find(".active").removeClass("active");
								customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
							});
						});
					}

					// Create custom Numbering
					if (typeof (c.attr("data-numbering")) !== 'undefined') {
						var numberingObject = $(c.attr("data-numbering"));

						c.on('initialized.owl.carousel changed.owl.carousel', function (numberingObject) {
							return function (e) {
								if (!e.namespace) return;
								numberingObject.find('.numbering-current').text(e.item.index + 1);
								numberingObject.find('.numbering-count').text(e.item.count);
							};
						}(numberingObject));
					}

					if (typeof (c.attr("data-custom-next")) !== 'undefined') {
						var customNext = $(c.attr("data-custom-next"));

						customNext.on('click', function (customNext, c) {
							return function () {
								c.trigger('next.owl.carousel');
							};
						}(customNext, c));
					}

					c.owlCarousel({
						autoplay: isNoviBuilder ? false : c.attr("data-autoplay") === "true",
						autoplayTimeout: c.attr("data-autoplay-timeout") ? parseInt(c.attr("data-autoplay-timeout"), 10) : 100,
						autoplayHoverPause: true,
						smartSpeed: c.attr("data-speed") ? parseInt(c.attr("data-speed")) : 250,
						loop: isNoviBuilder ? false : c.attr("data-loop") !== "false",
						items: 1,
						easing: c.attr('data-easing') ? c.attr('data-easing') : 'swing',
						center: c.attr("data-center") === "true",
						dotsContainer: c.attr("data-pagination-container") || false,
						navContainer: c.attr("data-navigation-container") || false,
						mouseDrag: isNoviBuilder ? false : c.attr("data-mouse-drag") !== "false",
						nav: c.attr("data-nav") === "true",
						dots: c.attr("data-dots") === "true",
						dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each"), 10) : false,
						animateIn: c.attr('data-animation-in') ? c.attr('data-animation-in') : false,
						animateOut: c.attr('data-animation-out') ? c.attr('data-animation-out') : false,
						responsive: responsive,
						navText: c.attr("data-nav-text") ? $.parseJSON(c.attr("data-nav-text")) : [],
						navClass: c.attr("data-nav-class") ? $.parseJSON(c.attr("data-nav-class")) : ['owl-prev', 'owl-next']
					});
				}

				/**
				 * jQuery parallax. efecto scroll imagen principal
				 */
				function isScrolledIntoView(elem) {
					if (!isNoviBuilder) {
						return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
					} else {
						return true;
					}
				}

				/**
				 * jQuery parallax. efecto scroll imagen principal
				 */
				function lazyInit(element, func) {
					var handler = function () {
						if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
							func.call();
							element.addClass('lazy-loaded');
						}
					};

					handler();
					$window.on('scroll', handler);
				}
        
        				// Material Parallax, plugins
				if (plugins.materialParallax.length) {
					if (!isNoviBuilder && !isIE && !isMobile) {
						plugins.materialParallax.parallax();

						// heavy pages fix
						$window.on('load', function () {
							setTimeout(function () {
								$window.scroll();
							}, 500);
						});
					} else {
						for (var i = 0; i < plugins.materialParallax.length; i++) {
							var parallax = $(plugins.materialParallax[i]),
									imgPath = parallax.data("parallax-img");

							var parallaxBg = document.createElement('div');
							parallaxBg.classList.add('material-parallax');
							parallax.prepend(parallaxBg);

							parallaxBg.style.backgroundImage = 'url(' + imgPath + ')';
							parallaxBg.style.backgroundSize = 'cover';
						}
					}
				}




				/**
				 * validadores formulario contacto
				 */
				function attachFormValidator(elements) {
					// Custom validator - phone number
					regula.custom({
						name: 'PhoneNumber',
						defaultMessage: 'Invalid phone number format',
						validator: function () {
							if (this.value === '') return true;
							else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test(this.value);
						}
					});

					for (var i = 0; i < elements.length; i++) {
						var o = $(elements[i]), v;
						o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
						v = o.parent().find(".form-validation");
						if (v.is(":last-child")) o.addClass("form-control-last-child");
					}

					elements.on('input change propertychange blur', function (e) {
						var $this = $(this), results;

						if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
						if ($this.parents('.rd-mailform').hasClass('success')) return;

						if ((results = $this.regula('validate')).length) {
							for (i = 0; i < results.length; i++) {
								$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
							}
						} else {
							$this.siblings(".form-validation").text("").parent().removeClass("has-error")
						}
					}).regula('bind');

					var regularConstraintsMessages = [
						{
							type: regula.Constraint.Required,
							newMessage: "The text field is required."
						},
						{
							type: regula.Constraint.Email,
							newMessage: "The email is not a valid email."
						},
						{
							type: regula.Constraint.Numeric,
							newMessage: "Only numbers are required"
						},
						{
							type: regula.Constraint.Selected,
							newMessage: "Please choose an option."
						}
					];


					for (var i = 0; i < regularConstraintsMessages.length; i++) {
						var regularConstraint = regularConstraintsMessages[i];

						regula.override({
							constraintType: regularConstraint.type,
							defaultMessage: regularConstraint.newMessage
						});
					}
				}

				/**
				 *validadores formulario contacto
				 */
				function isValidated(elements, captcha) {
					var results, errors = 0;

					if (elements.length) {
						for (var j = 0; j < elements.length; j++) {

							var $input = $(elements[j]);
							if ((results = $input.regula('validate')).length) {
								for (k = 0; k < results.length; k++) {
									errors++;
									$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
								}
							} else {
								$input.siblings(".form-validation").text("").parent().removeClass("has-error")
							}
						}

						if (captcha) {
							if (captcha.length) {
								return validateReCaptcha(captcha) && errors === 0
							}
						}

						return errors === 0;
					}
					return true;
				}



				/**
				 * @desc Initialize Google maps
				 */
				function initMaps() {
					var key;



					$.getScript('//maps.google.com/maps/api/js?' + (key ? 'key=' + key + '&' : '') + 'sensor=false&libraries=geometry,places&v=quarterly', function () {
						var head = document.getElementsByTagName('head')[0],
								insertBefore = head.insertBefore;


						var geocoder = new google.maps.Geocoder;
						for (var i = 0; i < plugins.maps.length; i++) {
							var zoom = parseInt(plugins.maps[i].getAttribute("data-zoom"), 10) || 11;
							var styles = plugins.maps[i].hasAttribute('data-styles') ? JSON.parse(plugins.maps[i].getAttribute("data-styles")) : [];
							var center = plugins.maps[i].getAttribute("data-center") || "New York";

							// Initialize map
							var map = new google.maps.Map(plugins.maps[i].querySelectorAll(".google-map")[0], {
								zoom: zoom,
								styles: styles,
								scrollwheel: false,
								center: {lat: 0, lng: 0}
							});

							// Add map object to map node
							plugins.maps[i].map = map;
							plugins.maps[i].geocoder = geocoder;
							plugins.maps[i].google = google;

							// Get Center coordinates from attribute
							getLatLngObject(center, null, plugins.maps[i], function (location, markerElement, mapElement) {
								mapElement.map.setCenter(location);
							});

							// Add markers from google-map-markers array
							var markerItems = plugins.maps[i].querySelectorAll(".google-map-markers li");

						}
					});
				}



				// Flecha para subir pagina al inicio
				if (isDesktop && !isNoviBuilder) {
					$().UItoTop({
						easingType: 'easeOutQuad',
						containerClass: 'ui-to-top mdi mdi-chevron-up'
					});
				}

				// etiquetas formulario desaparecen al rellenar
				if (plugins.rdInputLabel.length) {
					plugins.rdInputLabel.RDInputLabel();
				}

				// error rojo si no se completa bien campo
				if (plugins.regula.length) {
					attachFormValidator(plugins.regula);
				}






			}
	);
}());
