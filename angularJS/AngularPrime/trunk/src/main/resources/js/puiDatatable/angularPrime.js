/*globals angular $ */

(function () {
    "use strict";

angular.module('angular.prime').directive('puiDatatable', function () {
    return {
        restrict: 'A',
        priority: 5,
        compile: function (element, attrs) {
            return function postLink(scope, element, attrs) {
                var options = scope.$eval(attrs.puiDatatable) || {},
                    data = [],
                    functionBasedData = false,
                    columns = element.data('puiColumns') || [],
                    selectionMode = null,
                    paginator = null;

                if (angular.isArray(options)) {
                    data = options;
                }

                if (angular.isFunction(options)) {
                    data = options;
                    functionBasedData = true;
                }

                if (angular.isArray(data) && data.length === 0) {
                    if (angular.isFunction(options.tableData)) {
                        functionBasedData = true;
                    }
                    data = options.tableData;

                }

                if (columns.length === 0) {
                    if (options.columns) {
                        columns = options.columns;
                    }
                    if (!functionBasedData && columns.length === 0) {
                        for (var property in data[0]) {
                            columns.push({field: property, headerText: property});
                        }
                    }
                }

                if (options.rowSelect) {
                    selectionMode = 'single';
                }

                if (options.paginatorRows) {
                    paginator = {
                        rows: options.paginatorRows
                    };
                }

                $(function () {

                    element.puidatatable({
                        caption: options.caption ,
                        datasource : data ,
                        columns: columns ,
                        selectionMode: selectionMode ,
                        rowSelect: options.rowSelect ,
                        paginator: paginator
                    });

                });

            };
        }
    };
});

angular.module('angular.prime').directive('puiColumn', function () {
    return {
        restrict: 'A',
        priority: 5,
        compile: function (element, attrs) {
            return function postLink(scope, element, attrs) {
                  var columns = element.parent().data('puiColumns') ,
                      options = scope.$eval(attrs.puiColumn) || {} ,
                      columnInfo = {};

                if (columns === undefined) {
                    columns = [];
                }

                if (options.hasOwnProperty('field')) {
                    columnInfo.field = options.field;
                    columnInfo.headerText = options.headerText;
                    if (columnInfo.headerText === undefined) {
                        columnInfo.headerText = columnInfo.field;
                    }
                    columnInfo.sortable = options.sortable;

                } else {
                    columnInfo.field = attrs.puiColumn;
                    columnInfo.headerText = attrs.puiColumn;
                }
                columns.push(columnInfo);
                element.parent().data('puiColumns', columns);
            };
        }
    };
});

}());
