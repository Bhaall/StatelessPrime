/*globals angular */

(function () {
    "use strict";

    angular.module('angular.prime.prototype', []).value('version', "v0.1");

}());
;/*globals angular $ window PUI*/

(function () {
    "use strict";

    angular.module('angular.prime.prototype').directive('puiBlockui', function () {
        return {
            priority: 100,
            replace: true,
            transclude: 'element',
            template: '<div id="blocker">' +
                '<div class="ui-blockui ui-widget-overlay ui-helper-hidden" ></div> ' +
                '<div ng-transclude class="ui-blockui-content ui-widget ui-widget-content ui-corner-all ui-helper-hidden ui-shadow" style="left: 606.5px; top: 138.5px; display: none;">'+
                ' </div>'
        };

    });

    angular.module('angular.prime.prototype').factory('puiBlockui', function () {

        var blockDiv = null,
            showCount = 0,
            puiBlockui = {};

        var initBlockDiv = function() {
            if (blockDiv === null) {
                blockDiv = $("#blocker");
            }
        };

        var show = function () {
            if (showCount === 0) {
                var blockWidth = $(window).width(),
                    blockHeight = $(window).height();

                $(".ui-blockui").css({
                    width: blockWidth,
                    height: blockHeight,
                    'z-index': ++PUI.zindex
                });
                var content = $(".ui-blockui-content");
                content.css({
                    'left': (blockWidth - content.outerWidth()) / 2,
                    'top': (blockHeight - content.outerHeight()) / 2,
                    'z-index': ++PUI.zindex
                });
            }
            showCount++;
        };

        puiBlockui.showSpinner = function() {
            initBlockDiv();
            $(function () {
                if (blockDiv.length !== 0) {
                    show();
                    blockDiv.children().css('display', 'block');
                }
            });
        };

        puiBlockui.hideSpinner = function() {
            initBlockDiv();
            $(function() {
                if (blockDiv.length !== 0) {
                    showCount--;
                    if (showCount === 0) {
                        blockDiv.children().css('display', 'none');
                    }

                }
            });
        };

        return puiBlockui;
    });

}());;/*globals angular $ */

(function () {
    "use strict";

    angular.module('angular.prime.prototype').factory('puiMessages', function () {

        var puiMessages = {},
            messagesDiv,
            initMessages = function() {
            if (!messagesDiv) {
                messagesDiv = $('.ui-messages-error');
            }
        };

        puiMessages.clear = function() {
            initMessages();
            messagesDiv.addClass('ui-helper-hidden');
            messagesDiv.find('ul').html('');
        };

        puiMessages.show = function(messages) {
            initMessages();
            var messageContainer = messagesDiv.find('ul'),
                $messages = angular.isArray(messages) ? messages : [].concat(messages);
            angular.forEach($messages, function(message) {
               messageContainer.append('<li><span class="ui-messages-error-summary">'+message.text+'</span></li>');
            });
            if ($messages.length > 0) {
                messagesDiv.removeClass('ui-helper-hidden');
            }
        };

        return puiMessages;
    });

    angular.module('angular.prime.prototype').directive('puiMessages', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    element.addClass("ui-messages ui-widget");
                    element.append('<div class="ui-messages-error ui-corner-all ui-helper-hidden"><span class="ui-messages-error-icon"></span><ul></ul></div>');


                }
            };
        });

})();