
angularPrime.run(function ($rootScope) {

    var growl;

    $(function () {
        $('[type="text"]').puiinputtext();

        $('[type="button"]').puibutton();

    });

    $rootScope.showMessage = function (title, msg) {
        if ($rootScope.growl == undefined ) {
            $(function () {
                $rootScope.growl = $('#growl');
                $rootScope.growl.puigrowl();
            });
        }

        $rootScope.growl.puigrowl('show', [
            {severity: 'info', summary: title, detail: msg}
        ]);
    }
});


angularPrime.directive('puiPanel', function () {
    return {
        restrict: 'A',
        replace: true,
        compile: function (element, attrs, transclude) {
            $(function () {

                element.puipanel();
            });
        }

    };

});