'use strict';

function PanelController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.panelOptions = {collapsed: false};

    $scope.expandPanel = function () {
        $scope.panelOptions.collapsed = false;
    };

    $scope.collapsePanel = function () {
        $scope.panelOptions.collapsed = true;
    };

    $scope.panelTitle = "Change me";

}

function AccordionController($scope, Widgets) {
    $scope.widgets = Widgets;

    $scope.title1 = 'title1';
    $scope.description1 = 'description1';
    $scope.title2 = 'title2';
    $scope.description2 = 'description2';

    $scope.panelSelected = function (index) {
        alert('Accordion panel with index '+ index + ' selected');
    };

    $scope.programmaticOptions = {
        activeIndex : 1
    };

    $scope.setFirstActive = function() {
        $scope.programmaticOptions.activeIndex = 0;
    };

    $scope.includeList = ["partials/puiAccordion/include/panel1.html"
            , "partials/puiAccordion/include/panel2.html"];

    $scope.distributedData = {
        field1: "field1"
        , field2: "field2"
        , field3: "field3"
    };

    $scope.addPanel = function() {
        $scope.includeList.push("partials/puiAccordion/include/panel3.html");
    }

}

function ButtonController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.showMessage = function(msg) {
        alert(msg);
    };

    $scope.buttonDisabled = true;

    $scope.enableButton = function() {
        $scope.buttonDisabled = false;
    };

    $scope.disableButton = function() {
        $scope.buttonDisabled =  true;
    };

    $scope.buttonTitle = 'change me';

}

function TabviewController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.title1 = 'title1';
    $scope.description1 = 'description1';
    $scope.title2 = 'title2';
    $scope.description2 = 'description2';

    $scope.tabSelected = function (index) {
        alert('Tab with index '+ index + ' selected');
    };

    $scope.tabViewOptions = {
        activeElement : 1
    };

    $scope.includeList = ["partials/puiTabview/include/panel1.html"
        , "partials/puiTabview/include/panel2.html"];

    $scope.distributedData = {
        field1: "field1"
        , field2: "field2"
        , field3: "field3"
    };

    $scope.addPanel = function() {
        $scope.includeList.push("partials/puiTabview/include/panel3.html");
    }
}

function CheckBoxController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.checkboxSelectedValue1 = true;
    $scope.checkboxSelectedValue2 = false;
    $scope.checkboxSelectedValue3 = false;
    $scope.checkboxSelectedValue4 = true;

    $scope.disabledWidget = true;

    $scope.enableWidget = function() {
        $scope.disabledWidget = false;
    };

    $scope.disableWidget = function() {
        $scope.disabledWidget =  true;
    };

    $scope.checkboxClicked = function () {
        alert("checkbox changed his state");
    }

}

function DialogController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.dialogOptions = {
        dlgVisible : false
    };

    $scope.showDlg = function() {
        $scope.dialogOptions.dlgVisible = true;
    };

    $scope.closeDlg = function() {
        $scope.dialogOptions.dlgVisible = false;
    };

    $scope.nonModalDialogOptions = {
        dlgVisible : false
        ,modal : false
        ,minimizable: true
        ,maximizable: true
    };

    $scope.nonModalShowDlg = function() {
        $scope.nonModalDialogOptions.dlgVisible = true;
    };

    $scope.nonModalCloseDlg = function() {
        $scope.nonModalDialogOptions.dlgVisible = false;
    };

    $scope.dialogEffectOptions = {
        dlgVisible: false
        ,showEffect: "drop"
        ,hideEffect: "explode"
    };

    $scope.showEffectDlg = function() {
        $scope.dialogEffectOptions.dlgVisible = true;
    };

    $scope.closeEffectDlg = function() {
        $scope.dialogEffectOptions.dlgVisible = false;
    };

}

function NotifyController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.notifyOptions = {
        visible : false
    };

    $scope.show = function() {
        $scope.notifyOptions.visible = true;
    };

    $scope.notifyBottomOptions = {
        visible : false
        , position : 'bottom'
    };

    $scope.showBottom = function() {
        $scope.notifyBottomOptions.visible = true;
    };

    $scope.prop = 'Change me';

    $scope.notifyDynamicOptions = {
        visible : false
    };

    $scope.showDynamic = function() {
        $scope.notifyDynamicOptions.visible = true;
    };

    $scope.hideDynamic = function() {
        $scope.notifyDynamicOptions.visible = false;
    };

    $scope.notifyCallbackOptions = {
        visible : false
        ,callback : function () {
            alert('Notify widget closed by user');
        }
    };

    $scope.showWithCallback = function() {
        $scope.notifyCallbackOptions.visible = true;
    };

}

function LightboxController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.items = [
        { shortTitle: 'Sopranos1'
         ,longTitle: 'One line about Sopranos1'
         ,image: 'demo/images/sopranos/sopranos1.jpg'
         ,thumbnail: 'demo/images/sopranos/sopranos1_small.jpg'
        },
        { shortTitle: 'Sopranos2'
         ,longTitle: 'One line about Sopranos2'
         ,image: 'demo/images/sopranos/sopranos2.jpg'
         ,thumbnail: 'demo/images/sopranos/sopranos2_small.jpg'
        },
        { shortTitle: 'Sopranos3'
         ,longTitle: 'One line about Sopranos3'
         ,image: 'demo/images/sopranos/sopranos3.jpg'
         ,thumbnail: 'demo/images/sopranos/sopranos3_small.jpg'
        },
        { shortTitle: 'Sopranos4'
         ,longTitle: 'One line about Sopranos4'
         ,image: 'demo/images/sopranos/sopranos4.jpg'
         ,thumbnail: 'demo/images/sopranos/sopranos4_small.jpg'
        }
    ]
}

function DropdownController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.selectedBasic = null;

    $scope.selectedLabel = null;

    $scope.selectedValue = null;

    $scope.friends =
         [{name:'John', phone:'555-1212', age:10},
          {name:'Mary', phone:'555-9876', age:19},
          {name:'Mike', phone:'555-4321', age:21},
          {name:'Adam', phone:'555-5678', age:35},
          {name:'Julie', phone:'555-8765', age:29}];

    $scope.disabledWidget = true;

    $scope.enableWidget = function() {
        $scope.disabledWidget = false;
    };

    $scope.disableWidget = function() {
        $scope.disabledWidget =  true;
    };

    $scope.dropdownOptions = {
        callback : function (idx, label) {
            alert('user selected option with index '+idx+' and label '+label);
        }
    }
}

function FieldsetController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.fieldsetOptions = {
        collapsed : true
    };

    $scope.collapseFieldset = function() {
        $scope.fieldsetOptions.collapsed = true;
    };

    $scope.expandFieldset = function() {
        $scope.fieldsetOptions.collapsed = false;
    };

    $scope.callbackOptions = {
        collapsed : false
        ,callback : function () {
            alert('User toggled the fieldset');
        }
    };

    $scope.fieldsetName = 'Change me';
}

function GalleriaController($scope, Widgets) {

    $scope.widgets = Widgets;

}

function GrowlController($scope, Widgets, puiGrowl) {

    $scope.widgets = Widgets;

    $scope.showInfoGrowl = function() {
        $scope.showInfoMessage('Info message title', "Info detail message");
    };

    $scope.showErrorGrowl = function() {
        $scope.showErrorMessage('Error message title', "Error detail message");
    };

    $scope.showWarnGrowl = function() {
        $scope.showWarnMessage('Warn message title', "Warn detail message");
    };

    $scope.showStickyMessage = function() {
        puiGrowl.setSticky(true);
        $scope.showInfoMessage('Message', "Message remains until close icon clicked or other message requested");
    };

    $scope.resetGrowlOptions = function() {
            puiGrowl.setSticky(false);
    }
}

function TooltipController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.dynamicTooltip = {
        content : 'Tooltip contains value of name {{name}}'
    };

    $scope.name = "Change me";

    $scope.htmlContent = {
        showEvent: 'focus'
        ,hideEvent: 'blur'
        , at: 'left bottom'
        , content: '<img src="demo/images/galleria/galleria5.jpg" />'
    }
}

function InputController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.value1 = 'Change me';

    $scope.numbers = 123;

    $scope.fieldDisabled = true;

    $scope.enableField = function() {
        $scope.fieldDisabled = false;
    };

    $scope.disableField = function() {
        $scope.fieldDisabled =  true;
    };

}

function TextareaController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.value1 = 'Change me';

    $scope.fieldDisabled = true;

    $scope.enableField = function() {
        $scope.fieldDisabled = false;
    };

    $scope.disableField = function() {
        $scope.fieldDisabled =  true;
    };

    $scope.value2 = '';

    $scope.autoCompleteMethod = function (request, response) {
        var data = [];
        var query = request.query;
        for (var i = 0; i < 5; i++) {
            data.push({"label": query + i, "value": query + i});
        }
        response.call(this, data);
    };

}

function AutocompleteController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.country = null;

    $scope.countries = new Array('Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia',
                'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda',
                'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia',
                'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic',
                'Congo, Republic of the', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica',
                'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland',
                'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
                'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan',
                'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
                'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
                'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Mongolia', 'Morocco', 'Monaco', 'Mozambique', 'Namibia',
                'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Papua New Guinea',
                'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Samoa', 'San Marino', ' Sao Tome',
                'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
                'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
                'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates',
                'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe');

    $scope.autoCompleteMethod = function (request, response) {
        var data = [];
        var query = request.query;
        for (var i = 0; i < 5; i++) {
            data.push({"label": query + i, "value": query + i});
        }
        response.call(this, data);
    };

    $scope.fieldDisabled = true;

    $scope.enableField = function() {
        $scope.fieldDisabled = false;
    };

    $scope.disableField = function() {
        $scope.fieldDisabled =  true;
    };

    $scope.multipleCountry = {
        multiple: true
        , completeSource: $scope.countries
        , multipleValues: []
    };

    $scope.limitToList = {
        forceSelection : true
        , completeSource: $scope.countries

    };

    $scope.callbackOptions = {
        completeSource: $scope.countries
        , callback: function(label) {
            alert(label+' selected ');
        }
    }

}

function RatingController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.rating = 3;

    $scope.disabledWidget = true;

    $scope.enableWidget = function() {
        $scope.disabledWidget = false;
    };

    $scope.disableWidget = function() {
        $scope.disabledWidget =  true;
    };

    $scope.ratingClicked = function () {
        alert("Rating has a new value : "+$scope.rating);
    }

}

function RadiobuttonController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.radioValue1 = null;

    $scope.radioValue2 = 1;

    $scope.disabledWidget = true;

    $scope.enableWidget = function() {
        $scope.disabledWidget = false;
    };

    $scope.disableWidget = function() {
        $scope.disabledWidget =  true;
    };

    $scope.selectionMade = function () {
        alert('Current selected value with radio button is '+$scope.radioValue1);
    };

    $scope.optionExample = {
        selectedOptionValue: null
    };

    $scope.options = [
        {
            value: "1", description: "Option 1"
        },
        {
            value: "2", description: "Option 2"
        },
        {
            value: "3", description: "Option 3"
        }
    ];

}

function SpinnerController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.value = null;

    $scope.disabledWidget = true;

    $scope.enableWidget = function() {
        $scope.disabledWidget = false;
    };

    $scope.disableWidget = function() {
        $scope.disabledWidget =  true;
    };

}

function PasswordController($scope, Widgets) {

    $scope.widgets = Widgets;

    $scope.value = null;
}

function ProgressbarController($scope, $timeout, Widgets) {
    $scope.widgets = Widgets;

    $scope.value = 0;

    $scope.timedValue = 0;

    $scope.smoothProgress = {
        value : 0,
        showLabel : false,
        easing: 'linear',
        effectSpeed: 1000
    }

    $scope.doStep = function() {
        $scope.timedValue = $scope.timedValue + 10;
        $scope.smoothProgress.value = $scope.smoothProgress.value + 10;
        $timeout(function() {
            if ($scope.timedValue < 100) {
                $scope.doStep();
            }
        }, 1000);
    };

    $scope.startTimer = function() {
        $scope.timedValue = 0;
        $scope.smoothProgress.value = 0;
        $scope.doStep();
    }

}

function MenuController($scope, Widgets) {
    $scope.widgets = Widgets;

    $scope.doCommand = function(commandText) {
        alert("Click on item '"+commandText+"'");
    };

    $scope.popupOptions = {
        trigger : "#showBtn"
    }

    $scope.submenuOptions = {
        autoDisplay : false
    }
}

function MenubarController($scope, Widgets) {
    $scope.widgets = Widgets;

    $scope.doCommand = function(commandText) {
        alert("Click on item '"+commandText+"'");
    };

}

function BreadcrumbController($scope, Widgets) {
    $scope.widgets = Widgets;

    $scope.doCommand = function(commandText) {
        alert("Click on item '"+commandText+"'");
    };

}

function Ctrl($scope, Widgets, version) {

    $scope.widgets = Widgets;

    $scope.version = version;

    $scope.angularVersion = angular.version;
}

