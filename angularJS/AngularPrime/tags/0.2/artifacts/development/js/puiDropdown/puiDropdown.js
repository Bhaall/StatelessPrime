"use strict";

/*globals angular $ */

angular.module('angular.prime').directive('puiDropdown', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: '?ngModel', // get a hold of NgModelController
            compile: function (element, attrs) {
                return function postLink (scope, element, attrs, ngModel) {

                    if (attrs.ngOptions) {
                        // This builds the Option tags
                        ngModel.$render();
                        // Remove the null option added by angular
                        var firstChild = element.children()[0];
                        if (firstChild.text === '' && firstChild.value === '?') {
                            element[0].removeChild(firstChild);
                        }

                    }

                    var options = scope.$eval(attrs.puiDropdown) || {};

                    options.editable = (options.editable !== undefined) ? options.editable : false;
                    if (options.editable) {
                        // TODO Give warning when explicit useLabel set to False as not compatible with editable
                        options.useLabel = true;
                    }
                    options.useLabel = (options.useLabel !== undefined) ? options.useLabel : false;
                    options.filter = (options.filter !== undefined) ? options.filter : false;
                    options.effect = options.effect || 'fade';
                    options.effectSpeed = options.effectSpeed || 'normal';
                    options.filterMatchMode = options.filterMatchMode || 'startsWith';
                    options.caseSensitiveFilter = (options.caseSensitiveFilter !== undefined) ? options.caseSensitiveFilter : false;
                    options.scrollHeight = options.scrollHeight || 200;


                    $(function () {
                        element.puidropdown({
                            editable: options.editable
                            ,filter : options.filter
                            ,effect: options.effect
                            ,effectSpeed: options.effectSpeed
                            ,filterMatchMode: options.filterMatchMode
                            ,caseSensitiveFilter: options.caseSensitiveFilter
                            ,filterFunction: options.filterFunction
                            ,scrollHeight: options.scrollHeight
                        });
                    });

                    // Specify how UI should be updated
                    ngModel.$render = function () {
                        if (options.useLabel) {
                            element.puidropdown('selectValue', ngModel.$viewValue)
                        } else {
                            element.puidropdown('selectIndex', ngModel.$viewValue)
                        }
                    };

                    // Listen for change events to enable binding
                    element.bind('puidropdownchange', function () {
                        scope.safeApply(read());
                        if (options.callback) {
                            var idx = element.puidropdown('getSelectedValue');
                            var label = element.puidropdown('getCustomInputVal'); // This also works when not editable
                            options.callback(idx, label);
                        }
                    });

                    read(); // initialize

                    // Write data to the model
                    function read () {
                        var sel = undefined;
                        if (options.editable) {
                            sel = element.puidropdown('getCustomInputVal');
                        } else {
                            if (options.useLabel) {
                                sel = element.puidropdown('getSelectedLabel');

                            } else {
                                sel = element.puidropdown('getSelectedValue');
                            }
                        }
                        ngModel.$setViewValue(sel);
                    }

                    if (attrs.ngDisabled) {
                        scope.$watch(attrs.ngDisabled, function (value) {

                            if (value === false) {
                                $(function () {
                                    element.puidropdown('enable');
                                });
                            } else {
                                $(function () {
                                    element.puidropdown('disable');

                                });

                            }
                        });
                    }


                }
            }
        }

    }]

);
;/**
 * PrimeUI dropdown widget
 */
$(function() {

    $.widget("primeui.puidropdown", {
       
        options: {
            effect: 'fade',
            effectSpeed: 'normal',
            filter: false,
            filterMatchMode: 'startsWith',
            caseSensitiveFilter: false,
            filterFunction: null,
            source: null,
            content: null,
            scrollHeight: 200
        },

        _create: function() {
            if(this.options.source) {
                for(var i = 0; i < this.options.source.length; i++) {
                    var choice = this.options.source[i];
                    if(choice.label)
                        this.element.append('<option value="' + choice.value + '">' + choice.label + '</option>');
                    else
                        this.element.append('<option value="' + choice + '">' + choice + '</option>');
                }
            }
            
            this.element.wrap('<div class="pui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix" />')
                    .wrap('<div class="ui-helper-hidden-accessible" />');
            this.container = this.element.closest('.pui-dropdown');
            this.focusElementContainer = $('<div class="ui-helper-hidden-accessible"><input type="text" /></div>').appendTo(this.container);
            this.focusElement = this.focusElementContainer.children('input');
            this.label = this.options.editable ? $('<input type="text" class="pui-dropdown-label pui-inputtext ui-corner-all"">') 
                                : $('<label class="pui-dropdown-label pui-inputtext ui-corner-all"/>');
            this.label.appendTo(this.container);
            this.menuIcon = $('<div class="pui-dropdown-trigger ui-state-default ui-corner-right"><span class="ui-icon ui-icon-triangle-1-s"></span></div>')
                                .appendTo(this.container);
            this.panel = $('<div class="pui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden pui-shadow" />').appendTo(document.body);
            this.itemsWrapper = $('<div class="pui-dropdown-items-wrapper" />').appendTo(this.panel);
            this.itemsContainer = $('<ul class="pui-dropdown-items pui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"></ul>')
                                    .appendTo(this.itemsWrapper);
            this.disabled = this.element.prop('disabled');
            this.choices = this.element.children('option');
            this.optGroupsSize = this.itemsContainer.children('li.puiselectonemenu-item-group').length;
            
            if(this.options.filter) {
                this.filterContainer = $('<div class="pui-dropdown-filter-container" />').prependTo(this.panel);
                this.filterInput = $('<input type="text" autocomplete="off" class="pui-dropdown-filter pui-inputtext ui-widget ui-state-default ui-corner-all" />')
                                            .appendTo(this.filterContainer);
                this.filterContainer.append('<span class="ui-icon ui-icon-search"></span>');
            }

            this._generateItems();
            
            var $this = this,
            selectedOption = this.choices.filter(':selected');

            //disable options
            this.choices.filter(':disabled').each(function() {
                $this.items.eq($(this).index()).addClass('ui-state-disabled');
            });

            //triggers
            this.triggers = this.options.editable ? this.menuIcon : this.container.children('.pui-dropdown-trigger, .pui-dropdown-label');

            //activate selected
            if(this.options.editable) {
                var customInputVal = this.label.val();

                //predefined input
                if(customInputVal === selectedOption.text()) {
                    this._highlightItem(this.items.eq(selectedOption.index()));
                }
                //custom input
                else {
                    this.items.eq(0).addClass('ui-state-highlight');
                    this.customInput = true;
                    this.customInputVal = customInputVal;
                }
            }
            else {
                this._highlightItem(this.items.eq(selectedOption.index()));
            }

            if(!this.disabled) {            
                this._bindEvents();
                this._bindConstantEvents();
            }

            this._initDimensions();
        },
        
        _generateItems: function() {
            for(var i = 0; i < this.choices.length; i++) {
                var option = this.choices.eq(i),
                optionLabel = option.text(),
                content = this.options.content ? this.options.content.call(this, this.options.source[i]) : optionLabel;
                    
                this.itemsContainer.append('<li data-label="' + optionLabel + '" class="pui-dropdown-item pui-dropdown-list-item ui-corner-all">' + content + '</li>');
            }
            
            this.items = this.itemsContainer.children('.pui-dropdown-item');
        },
        
        _bindEvents: function() {
            var $this = this;

            this.items.filter(':not(.ui-state-disabled)').on('mouseover.puidropdown', function() {
                var el = $(this);

                if(!el.hasClass('ui-state-highlight'))
                    $(this).addClass('ui-state-hover');
            })
            .on('mouseout.puidropdown', function() {
                $(this).removeClass('ui-state-hover');
            })
            .on('click.puidropdown', function() {
                $this._selectItem($(this));   
            });

            this.triggers.on('mouseenter.puidropdown', function() {
                if(!$this.container.hasClass('ui-state-focus')) {
                    $this.container.addClass('ui-state-hover');
                    $this.menuIcon.addClass('ui-state-hover');
                }
            })
            .on('mouseleave.puidropdown', function() {
                $this.container.removeClass('ui-state-hover');
                $this.menuIcon.removeClass('ui-state-hover');
            })
            .on('click.puidropdown', function(e) {
                if($this.panel.is(":hidden")) {
                    $this._show();
                }
                else {
                    $this._hide();

                    $this._revert();
                }

                $this.container.removeClass('ui-state-hover');
                $this.menuIcon.removeClass('ui-state-hover');          
                $this.focusElement.trigger('focus.puidropdown');
                e.preventDefault();
            });

            this.focusElement.on('focus.puidropdown', function() {
                $this.container.addClass('ui-state-focus');
                $this.menuIcon.addClass('ui-state-focus');
            })
            .on('blur.puidropdown', function() {
                $this.container.removeClass('ui-state-focus');
                $this.menuIcon.removeClass('ui-state-focus');
            });

            if(this.options.editable) {
                this.label.on('change.pui-dropdown', function() {
                    //$this._triggerChange(true);  Moved for AngularPrime
                    $this.customInput = true;
                    $this.customInputVal = $(this).val();
                    $this._triggerChange(true); // new place for AngularPrime
                    $this.items.filter('.ui-state-highlight').removeClass('ui-state-highlight');
                    $this.items.eq(0).addClass('ui-state-highlight');
                });
            }

            this._bindKeyEvents();

            if(this.options.filter) {
                this._setupFilterMatcher();

                this.filterInput.puiinputtext();

                this.filterInput.on('keyup.pui-dropdown', function() {
                    $this._filter($(this).val());
                });
            }
        },
        
        _bindConstantEvents: function() {
            var $this = this;
            
            $(document.body).bind('mousedown.pui-dropdown', function (e) {
                if($this.panel.is(":hidden")) {
                    return;
                }

                var offset = $this.panel.offset();
                if (e.target === $this.label.get(0) ||
                    e.target === $this.menuIcon.get(0) ||
                    e.target === $this.menuIcon.children().get(0)) {
                    return;
                }

                if (e.pageX < offset.left ||
                    e.pageX > offset.left + $this.panel.width() ||
                    e.pageY < offset.top ||
                    e.pageY > offset.top + $this.panel.height()) {

                    $this._hide();
                    $this._revert();
                }
            });

            this.resizeNS = 'resize.' + this.id;
            this._unbindResize();
            this._bindResize();
        },
        
        _bindKeyEvents: function() {
            var $this = this;

            this.focusElement.on('keydown.puiselectonemenu', function(e) {
                var keyCode = $.ui.keyCode,
                key = e.which;

                switch(key) { 
                    case keyCode.UP:
                    case keyCode.LEFT:
                        var activeItem = $this._getActiveItem(),
                        prev = activeItem.prevAll(':not(.ui-state-disabled,.ui-selectonemenu-item-group):first');

                        if(prev.length == 1) {
                            if($this.panel.is(':hidden')) {
                                $this._selectItem(prev);
                            } 
                            else {
                                $this._highlightItem(prev);
                                PUI.scrollInView($this.itemsWrapper, prev);
                            }
                        }

                        e.preventDefault();                    
                    break;

                    case keyCode.DOWN:
                    case keyCode.RIGHT:
                        var activeItem = $this._getActiveItem(),
                        next = activeItem.nextAll(':not(.ui-state-disabled,.ui-selectonemenu-item-group):first');

                        if(next.length == 1) {
                            if($this.panel.is(':hidden')) {
                                if(e.altKey) {
                                    $this._show();
                                } else {
                                    $this._selectItem(next);
                                }
                            }
                            else {
                                $this._highlightItem(next);
                                PUI.scrollInView($this.itemsWrapper, next);
                            }
                        }

                        e.preventDefault();
                    break;

                    case keyCode.ENTER:
                    case keyCode.NUMPAD_ENTER: 
                        if($this.panel.is(':hidden')) {
                            $this._show();
                        }
                        else {
                            $this._selectItem($this._getActiveItem());
                        }

                        e.preventDefault();
                    break;

                    case keyCode.TAB:
                        if($this.panel.is(':visible')) {
                            $this._revert();
                            $this._hide();
                        }
                    break;

                    case keyCode.ESCAPE:
                        if($this.panel.is(':visible')) {
                            $this._revert();
                            $this._hide();
                        }
                    break;

                    default:    
                        var k = String.fromCharCode((96 <= key && key <= 105)? key-48 : key),
                        currentItem = $this.items.filter('.ui-state-highlight');

                        //Search items forward from current to end and on no result, search from start until current
                        var highlightItem = $this._search(k, currentItem.index() + 1, $this.options.length);
                        if(!highlightItem) {
                            highlightItem = $this._search(k, 0, currentItem.index());
                        }

                        if(highlightItem) {
                            if($this.panel.is(':hidden')) {
                                $this._selectItem(highlightItem);
                            }
                            else {
                                $this._highlightItem(highlightItem);
                                PUI.scrollInView($this.itemsWrapper, highlightItem);
                            }    
                        }

                    break;
                }
            });
        },
        
        _initDimensions: function() {
            var userStyle = this.element.attr('style');

            //do not adjust width of container if there is user width defined
            if(!userStyle||userStyle.indexOf('width') == -1) {
                this.container.width(this.element.outerWidth(true) + 5);  
            }

            //width of label
            this.label.width(this.container.width() - this.menuIcon.width());

            //align panel and container
            var jqWidth = this.container.innerWidth();
            if(this.panel.outerWidth() < jqWidth) {
                this.panel.width(jqWidth);
            }

            this.element.parent().addClass('ui-helper-hidden').removeClass('ui-helper-hidden-accessible');
            
            if(this.options.scrollHeight && this.panel.outerHeight() > this.options.scrollHeight) {
                this.itemsWrapper.height(this.options.scrollHeight);
            }
        },
        
        _selectItem: function(item, silent) {
            var selectedOption = this.choices.eq(this._resolveItemIndex(item)),
            currentOption = this.choices.filter(':selected'),
            sameOption = selectedOption.val() == currentOption.val(),
            shouldChange = null;

            if(this.options.editable) {
                shouldChange = (!sameOption)||(selectedOption.text() != this.label.val());
            }
            else {
                shouldChange = !sameOption;
            }

            if(shouldChange) {
                this._highlightItem(item);
                this.element.val(selectedOption.val());

                // this._triggerChange();  Moved for AngularPrime

                if(this.options.editable) {
                    this.customInput = false;
                }

                this._triggerChange();  // New location for AngularPrime
            }

            if(!silent) {
                this.focusElement.trigger('focus.puidropdown');
            }

            if(this.panel.is(':visible')) {
                this._hide();
            }
        },
        
        _highlightItem: function(item) {
            this.items.filter('.ui-state-highlight').removeClass('ui-state-highlight');
            item.addClass('ui-state-highlight');

            this._setLabel(item.data('label'));
        },
        
        _triggerChange: function(edited) {
            //this.changed = false; Removed for AngularPrime

            // if(this.options.change) { Removed for AngularPrime
                this._trigger('change');
            // }

            if(!edited) {
                this.value = this.choices.filter(':selected').val();
            }
        },
        
        _resolveItemIndex: function(item) {
            if(this.optGroupsSize === 0)
                return item.index();
            else
                return item.index() - item.prevAll('li.pui-dropdown-item-group').length;        
        },
        
        _setLabel: function(value) {
            if(this.options.editable) {
                this.label.val(value);
            }
            else {
                if(value === '&nbsp;')
                    this.label.html('&nbsp;');
                else
                    this.label.text(value);
            }
        },
        
        _bindResize: function() {
            var $this = this;

            $(window).bind(this.resizeNS, function(e) {
                if($this.panel.is(':visible')) {
                    $this._alignPanel();
                }
            });
        },

        _unbindResize: function() {
            $(window).unbind(this.resizeNS);
        },

        _unbindEvents: function() {
            this.items.off();
            this.triggers.off();
            // this.input.off(); Is undefined and not set in this file
            // this.focusInput.off(); Does not exists, should be removed (AngularPrime)
            this.label.off();
        },
        
        _alignPanel: function() {        
            this.panel.css({left:'', top:''}).position({
                                            my: 'left top'
                                            ,at: 'left bottom'
                                            ,of: this.container
                                        });
        },
        
        _show: function() {
            this._alignPanel();

            this.panel.css('z-index', ++PUI.zindex);
            
            if(this.options.effect != 'none')
                this.panel.show(this.options.effect, {}, this.options.effectSpeed);
            else
                this.panel.show();

            this.preShowValue = this.choices.filter(':selected');
        },

        _hide: function() {
            this.panel.hide();
        },
        
        _revert: function() {
            if(this.options.editable && this.customInput) {
                this._setLabel(this.customInputVal);
                this.items.filter('.ui-state-active').removeClass('ui-state-active');
                this.items.eq(0).addClass('ui-state-active');
            }
            else {
                this._highlightItem(this.items.eq(this.preShowValue.index()));
            }
        },
        
        _getActiveItem: function() {
            return this.items.filter('.ui-state-highlight');
        },
        
        _setupFilterMatcher: function() {
            this.filterMatchers = {
                'startsWith': this._startsWithFilter
                ,'contains': this._containsFilter
                ,'endsWith': this._endsWithFilter
                ,'custom': this.options.filterFunction
            };

            this.filterMatcher = this.filterMatchers[this.options.filterMatchMode];
        },

        _startsWithFilter: function(value, filter) {
            return value.indexOf(filter) === 0;
        },

        _containsFilter: function(value, filter) {
            return value.indexOf(filter) !== -1;
        },

        _endsWithFilter: function(value, filter) {
            return value.indexOf(filter, value.length - filter.length) !== -1;
        },

        _filter: function(value) {
            this.initialHeight = this.initialHeight||this.itemsWrapper.height();        
            var filterValue = this.options.caseSensitiveFilter ? $.trim(value) : $.trim(value).toLowerCase();

            if(filterValue === '') {
                this.items.filter(':hidden').show();
            }
            else {
                for(var i = 0; i < this.choices.length; i++) {
                    var option = this.choices.eq(i),
                    itemLabel = this.options.caseSensitiveFilter ? option.text() : option.text().toLowerCase(),
                    item = this.items.eq(i);

                    if(this.filterMatcher(itemLabel, filterValue))
                        item.show();
                    else
                        item.hide();
                }
            }

            if(this.itemsContainer.height() < this.initialHeight) {
                this.itemsWrapper.css('height', 'auto');
            }
            else {
                this.itemsWrapper.height(this.initialHeight);
            }
        },
        
        _search: function(text, start, end) { 
            for(var i = start; i  < end; i++) {
                var option = this.choices.eq(i);

                if(option.text().indexOf(text) == 0) {
                    return this.items.eq(i);
                }
            }

            return null;
        },

        getSelectedValue: function() {
            return this.element.val();
        },

        getSelectedLabel: function() {
            return this.choices.filter(':selected').text();
        },

        selectValue : function(value) {
            var option = this.choices.filter('[value="' + value + '"]');

            this._selectItem(this.items.eq(option.index()), true);
        },

        // Added for AngularPrime
        getCustomInputVal: function() {
            return this.customInput === true ? this.customInputVal : this.getSelectedLabel();
        },

        disable: function() {
            this._unbindEvents();
            this.label.addClass('ui-state-disabled');
            this.menuIcon.addClass('ui-state-disabled');
        },

        enable: function() {
            this._bindEvents();
            //this._bindConstantEvents();  Because they are never unbinded
            this.label.removeClass('ui-state-disabled');
            this.menuIcon.removeClass('ui-state-disabled');
        },

        selectIndex : function(idx) {
            this._selectItem(this.items.eq(idx), true);
        }


    });
    
});