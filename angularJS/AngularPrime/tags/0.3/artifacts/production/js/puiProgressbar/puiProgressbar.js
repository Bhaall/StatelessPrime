angular.module("angular.prime").directive("puiProgressbar",function(){return{restrict:"A",link:function(a,b,c){$(function(){var d=a.$eval(c.puiProgressbar),e=!1;angular.isNumber(d)?(e=!0,b.puiprogressbar({})):b.puiprogressbar({value:d.value,labelTemplate:d.labelTemplate,showLabel:d.showLabel,easing:d.easing,effectSpeed:d.effectSpeed});e?a.$watch(c.puiProgressbar,function(a){a!=null&&b.puiprogressbar("setValue",a)}):a.$watch(c.puiProgressbar+".value",function(a){a!=null&&b.puiprogressbar("setValue",
a)})})}}});$(function(){$.widget("primeui.puiprogressbar",{options:{value:0,labelTemplate:"{value}%",complete:null,easing:"easeInOutCirc",effectSpeed:"normal",showLabel:!0},_create:function(){this.element.addClass("pui-progressbar ui-widget ui-widget-content ui-corner-all").append('<div class="pui-progressbar-value ui-widget-header ui-corner-all"></div>').append('<div class="pui-progressbar-label"></div>');this.jqValue=this.element.children(".pui-progressbar-value");this.jqLabel=this.element.children(".pui-progressbar-label");
0!==this.options.value&&this._setValue(this.options.value,!1);this.enableARIA()},setValue:function(a,b){var c=void 0===b||b?!0:!1;0<=a&&100>=a&&(0===a?(this.jqValue.hide().css("width","0%").removeClass("ui-corner-right"),this.jqLabel.hide()):(c?this.jqValue.show().animate({width:a+"%"},this.options.effectSpeed,this.options.easing):this.jqValue.show().css("width",a+"%"),this.options.labelTemplate&&this.options.showLabel&&(c=this.options.labelTemplate.replace(/{value}/gi,a),this.jqLabel.html(c).show()),
100===a&&this._trigger("complete")),this.options.value=a,this.element.attr("aria-valuenow",a))},_getValue:function(){return this.options.value},enableARIA:function(){this.element.attr("role","progressbar").attr("aria-valuemin",0).attr("aria-valuenow",this.options.value).attr("aria-valuemax",100)},_setOption:function(a,b){"value"===a&&this._setValue(b);$.Widget.prototype._setOption.apply(this,arguments)},_destroy:function(){}})});