angular.module("angular.prime").directive("puiButton",["$interpolate",function(a){return{restrict:"A",compile:function(){return function(c,b,d){var e=[],f=a(b.text());b.text(c.$eval(f));angular.forEach(f.parts,function(a){angular.isFunction(a)&&e.push(a.exp)},e);$(function(){var a=c.$eval(d.puiButton)||{};b.puibutton({icon:a.icon,iconPos:a.iconPosition||"left"})});d.ngDisabled&&c.$watch(d.ngDisabled,function(a){!1===a?$(function(){b.puibutton("enable")}):$(function(){b.puibutton("disable")})});angular.forEach(e,
function(a){c.$watch(a,function(){$(function(){b.puibutton("setTitle",c.$eval(f))})})})}}}}]);$(function(){$.widget("primeui.puibutton",{options:{icon:null,iconPos:"left"},_create:function(){var a=this.element,c=a.text()||"pui-button",b=a.prop("disabled"),d=null,d=this.options.icon?"pui-button"===c?"pui-button-icon-only":"pui-button-text-icon-"+this.options.iconPos:"pui-button-text-only";b&&(d+=" ui-state-disabled");this.element.addClass("pui-button ui-widget ui-state-default ui-corner-all "+d).text("");this.options.icon&&this.element.append('<span class="pui-button-icon-'+this.options.iconPos+
" ui-icon "+this.options.icon+'" />');this.element.append('<span class="pui-button-text">'+c+"</span>");a.attr("role","button").attr("aria-disabled",b);b||this._bindEvents()},_bindEvents:function(){var a=this.element,c=this;a.on("mouseover.puibutton",function(){a.prop("disabled")||a.addClass("ui-state-hover")}).on("mouseout.puibutton",function(){$(this).removeClass("ui-state-active ui-state-hover")}).on("mousedown.puibutton",function(){a.hasClass("ui-state-disabled")||a.addClass("ui-state-active").removeClass("ui-state-hover")}).on("mouseup.puibutton",
function(b){a.removeClass("ui-state-active").addClass("ui-state-hover");c._trigger("click",b)}).on("focus.puibutton",function(){a.addClass("ui-state-focus")}).on("blur.puibutton",function(){a.removeClass("ui-state-focus")}).on("keydown.puibutton",function(b){(b.keyCode==$.ui.keyCode.SPACE||b.keyCode==$.ui.keyCode.ENTER||b.keyCode==$.ui.keyCode.NUMPAD_ENTER)&&a.addClass("ui-state-active")}).on("keyup.puibutton",function(){a.removeClass("ui-state-active")});return this},_unbindEvents:function(){this.element.off("mouseover.puibutton mouseout.puibutton mousedown.puibutton mouseup.puibutton focus.puibutton blur.puibutton keydown.puibutton keyup.puibutton")},
disable:function(){this._unbindEvents();this.element.attr({disabled:"disabled","aria-disabled":!0}).addClass("ui-state-disabled")},enable:function(){this._bindEvents();this.element.removeAttr("disabled").attr("aria-disabled",!1).removeClass("ui-state-disabled")},setTitle:function(a){this.element.find(".pui-button-text").html(a)}})});