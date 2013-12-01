/*globals angular */

(function () {
    "use strict";

    angular.module('angular.prime.enterprise', ['angular.prime.prototype']).value('version', "v0.1");

}());
;/*globals angular */

(function () {
    "use strict";

    angular.module('angular.prime.enterprise').factory('puiClientValidation', function (puiMessages) {
        var validation = {},
            helper = {};

        helper.findLabel = function( id) {
            return $("label[for='"+id+"']").html();
        };

        validation.validateForm = function(frm) {
            var errors = [];

            puiMessages.clear();

            angular.forEach(frm.$error.required, function (requiredError) {
               this.push({text: helper.findLabel(requiredError.$name) + ' is required.' });
            }, errors);
            if (errors.length > 0) {
                puiMessages.show(errors);
                for (var field in frm) {
                    if (field[0] != '$' && frm[field].$pristine) {
                        frm[field].$setViewValue(frm[field].$modelValue);
                    }
                }
            }
            return frm.$valid;
        };
        return validation;
    })

}());