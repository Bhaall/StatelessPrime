"use strict";

/*globals angular $ */

angular.module('angular.prime').directive('puiLightbox', function () {
    return {
        restrict: 'A',
        priority: 5,
        compile: function (element, attrs) {

            return function postLink (scope, element, attrs) {
                var options = scope.$eval(attrs.puiLightbox) || {};
                // TODO check if iframeWidth or iframeWidth the directive is placed on a <a>-tag
                options.iframe = 'A' === element[0].nodeName;

                /*
                scope.$watch(function () {
                    console.log('Digest done ');
                });
                */
                $(function () {
                    element.puilightbox({
                        iframe: options.iframe
                        , iframeWidth: options.iframeWidth
                        , iframeHeight: options.iframeHeight
                    });
                });

            };

        }
    };
}).directive('puiLightboxItem', function () {
    return {
        restrict: 'A',
        priority: 10,
        compile: function (element, attrs) {
            var lightboxItemType = function() {
                var items = element.parent().children('[pui-lightbox-item]');
                if (items.length == 0) {
                    // This is the case for the ng-repeat situation
                } else {
                    if (items.length > 1) {
                        return 'images';
                    } else {
                        return 'inline';
                    }
                }
            };

            var type = element.parent().data('puiLightboxType');

            if (type === undefined) {
                type = lightboxItemType();
                element.parent().data('puiLightboxType', type);
            }

            var lightboxInlineType = function() {
                element.addClass('ui-helper-hidden');
                element.before('<a class="group" href="#">'+attrs.title +'</a>  ');
            };

            var lightboxImagesType = function() {
                var image = element.children('img');
                var title = element.attr('title');
                var thumbnailSrc = element.attr('src');
                var imageSrc = image.attr('src');
                var imageTitle = image.attr('alt') || image.attr('title');

                $(function () {
                    element.children().attr('src', thumbnailSrc);
                    element.children().attr('alt', title);
                    element.children().attr('title', title);
                    element.children().wrap('<a href="' + imageSrc + '" title="' + imageTitle + '">');
                    element.replaceWith(element.html());
                });

            };

            if ('inline' === type) {
                lightboxInlineType();
                element.removeAttr('pui-lightbox-item');
            }

            if ('images' === type) {
                lightboxImagesType();
            }
        }
    };
});