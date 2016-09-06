angular
  .module('theme.core.rw_generator_controller', ['theme.core.services'])
  .controller('RWGeneratorController', ['$scope', '$theme', '$bootbox', '$modal', 'ReportWriterDataSource',
    function($scope, $theme, $bootbox, $modal, ReportWriterDataSource) {

    $scope.compareOps = [
        {"id": "=", name: "="},
        {"id": "!=", name: "!="},
        {"id": "<", name: "<"},
        {"id": ">", name: ">"},
        {"id": "<=", name: "<="},
        {"id": ">=", name: ">="}
    ];

    $scope.equalOps = [
        {"id": "=", name: "="},
        {"id": "!=", name: "!="}
    ];

    $scope.boolOps = [
        { Name: "", Value: "" },
        { Name: "checked", Value: "true" },
        { Name: "unchecked", Value: "false" }
    ];

    $scope.displayPoses = ["header", "footer", "headerAndFooter"];

    $scope.compareModel = null;

    $scope.steps = {
        new: "new",
        selectFile: "selectFile",
        selectColumns: "selectColumns",
        selectFilters: "selectFilters",
        display: "display"
    };

    $scope.fcoFields = ['client.id', 'room.name', 'item'];

    function getNewReport() {
        return {
            //Id: "",
            Name: "New Report",
            Object: null,
            Config: {
                excludeFromBudget: false,
                firstComponentOnly: false,
                showDetails: false,
                headers: [],
                columns: [],
                filters: []
            }
        }
    }

    $scope.reportConfig = getNewReport();

    $scope.data = {
        reportTypes: [],
        reports: null,
        lookups: null,
        pickLists: null,
        headers: null,
        columns: null,
        filters: null
    };

    $scope.structForEmail = {
        isEmail: false,
        to: "",
        subject: "",
        message: ""
    };

    //$scope.sortableColumns = null;
    //$scope.sortableHeaders = null;
    //$scope.sortableFilters = null;

    function init () {
        $scope.openStartPage();
    }

    $scope.onPrev = function () {

        if($scope.currentStep == $scope.steps.display) {

            $scope.currentStep = $scope.steps.new;

        } else if($scope.currentStep == $scope.steps.selectFile) {

            $scope.currentStep = $scope.steps.new;
            $scope.reportConfig = getNewReport();

        } else if($scope.currentStep == $scope.steps.selectColumns) {

            $scope.currentStep = $scope.steps.selectFile;
            $scope.reportConfig = getNewReport();

        } else if($scope.currentStep == $scope.steps.selectFilters) {

            $scope.currentStep = $scope.steps.selectColumns;

        }

    };

    $scope.openStartPage = function () {
        $scope.currentStep = $scope.steps.new;

        ReportWriterDataSource.getObjects({ showreports : true }, function (res) {
            $scope.data.reportTypes = res;
            angular.forEach($scope.data.reportTypes, function (report) {
                report.isExpanded = false;
            });
        });


    };

    $scope.openColumnsPage = function (report) {

        $scope.currentStep = $scope.steps.selectColumns;

        ReportWriterDataSource.getChapters({object: report.Object}, function (res) {
            $scope.data.columns = res;
            $scope.data.filters = angular.copy($scope.data.columns);

            ReportWriterDataSource.getField({chapter: 0}, function (res) {
                $scope.data.headers = res;

                $scope.data.headers.push({Id: -1, Name: "Report Id", Field: "report.id"});
                $scope.data.headers.push({Id: -2, Name: "Report Name", Field: "report.name"});
                $scope.data.headers.push({Id: -3, Name: "Report Date", Field: "report.date"});
                $scope.data.headers.push({Id: -4, Name: "Report Time", Field: "report.time"});
                $scope.data.headers.push({Id: -5, Name: "Report Page Number", Field: "report.pagenumber"});

            });

            var fieldids = [];

            angular.forEach($scope.data.filters, function (column) {
                angular.forEach(column.Fields, function (field) {
                    if(field.PicklistId) {
                        fieldids.push(field.PicklistId);
                    }
                });
            });

            if(fieldids.length) {
                ReportWriterDataSource.getPickLists({fieldids: ""+fieldids}, function (res) {
                    $scope.data.pickLists = res;
                });
            }
            $scope.inspectColumns();
        });

        /*setTimeout(function() {

            $scope.sortableHeaders = Sortable.create(document.getElementById('headers'), { handle: "td", onEnd: function(evt){
                $scope.reportConfig.Config.headers.splice(evt.newIndex, 0, $scope.reportConfig.Config.headers.splice(evt.oldIndex, 1)[0]);
            }});

            $scope.sortableColumns = Sortable.create(document.getElementById('columns'), { handle: "td", onEnd: function(evt){
                $scope.reportConfig.Config.columns.splice(evt.newIndex, 0, $scope.reportConfig.Config.columns.splice(evt.oldIndex, 1)[0]);
            }});

        }, 500);*/

    };

    $scope.onCancel = function () {
        $scope.currentStep = $scope.steps.new;
        $scope.reportConfig = getNewReport();
    };

    $scope.onNewReport = function () {
        $scope.reportConfig = getNewReport();
        $scope.currentStep = $scope.steps.selectFile;
    };

    $scope.onAddBtn = function (objectId) {
        $scope.reportConfig.Object = objectId;
        $scope.openColumnsPage($scope.reportConfig);
    };

    $scope.isExpanded = false;
    $scope.onExpandAllObjects = function () {
        var expandedCount = 0;

        angular.forEach($scope.data.reportTypes, function (report) {
            if(report.isExpanded) expandedCount++;
        });

        angular.forEach($scope.data.reportTypes, function (report) {
            report.isExpanded = expandedCount != $scope.data.reportTypes.length;
        });

        $scope.isExpanded = expandedCount == 0;
    };

    $scope.onExpandObject = function () {
        var expandedCount = 0;

        angular.forEach($scope.data.reportTypes, function (report) {
            if(report.isExpanded) expandedCount++;
        });

        $scope.isExpanded = expandedCount == 0;
    };

    $scope.onSelectColumnsNext = function () {
        $scope.currentStep = $scope.steps.selectFilters;

        /*setTimeout(function() {
            $scope.sortableFilters = Sortable.create(document.getElementById('filters'), { handle: "td", onEnd: function(evt){
                $scope.reportConfig.Config.filters.splice(evt.newIndex, 0, $scope.reportConfig.Config.filters.splice(evt.oldIndex, 1)[0]);
            }});
        }, 500);*/
    };

    $scope.onGeneratePDF = function (report) {

        var rep = {
            Id: report.Id,
            Name: report.Name,
            Object: report.Object,
            ShowDetails: report.Config.showDetails,
            ExcludeFromBudget: report.Config.excludeFromBudget,
            FirstComponentOnly: report.Config.firstComponentOnly,
            Columns: report.Config.columns,
            Filters: report.Config.filters,
            Headers: report.Config.headers
        };

        ReportWriterDataSource.generatePDF(rep, function (res) {
            var file = new Blob([res], {type: 'application/pdf'});
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);

            //TODO Для скачивания раскомментировать
            //var fileName = "test.pdf";
            //var a = document.createElement("a");
            //document.body.appendChild(a);
            //a.href = fileURL;
            //a.download = fileName;
            //a.click();
        });
    };

    $scope.onEmailBtn = function () {
        $scope.structForEmail.isEmail = true;
        $scope.currentStep = $scope.steps.display;
    };

    $scope.onSendEmail = function () {
        $bootbox.alert("Email Sended");
    };

    $scope.onExportBtn = function () {
        //Popup.showSuccess("Export");
    };

    $scope.onEditBtn = function (report) {

        $scope.reportConfig = angular.copy(report);
        $scope.openColumnsPage($scope.reportConfig);

    };

    $scope.onGenerateBtn = function (report) {

        var rep = {
            Id: report.Id,
            Name: report.Name,
            Object: report.Object,
            ShowDetails: report.Config.showDetails,
            ExcludeFromBudget: report.Config.excludeFromBudget,
            FirstComponentOnly: report.Config.firstComponentOnly,
            Columns: report.Config.columns,
            Filters: report.Config.filters,
            Headers: report.Config.headers
        };

        ReportWriterDataSource.generateReport(rep, function (res) {
          $modal.open({
            templateUrl: 'views/__rw_res_popup.tpl.html',
            size: 'lg',
            controller: function($scope, $modalInstance) {
              setTimeout(function() {
                document.getElementById("random322").innerHTML = res;
              }, 1000);
            }
          });
        });
    };

    $scope.onDeleteBtn = function (report, reports) {

      $bootbox.confirm('Are you sure you want to delete this report?', function (res) {
        if(res) {
          ReportWriterDataSource.deleteReport(report, function (res) {

              var index = reports.indexOf(report);
              reports.splice(index, 1);

          });

        }
      });
    };
    /**********/

    //Headers
    $scope.onAddHeader = function (header) {
        header.HeaderPosition = 'header';
        $scope.reportConfig.Config.headers.push(header);
    };

    $scope.isHeaderFieldUsed = function (header) {

        var result = false;

        angular.forEach($scope.reportConfig.Config.headers, function(headerField) {
            if(headerField.Id == header.Id) {
                result = true;
            }
        });

        return result;
    };

    $scope.onDeleteHeader = function (header) {
        var index = $scope.reportConfig.Config.headers.indexOf(header);
        $scope.reportConfig.Config.headers.splice(index, 1);
    };
    /**********/

    //Chapters
    $scope.onAddColumnField = function (field) {
        $scope.reportConfig.Config.columns.push(field);
        $scope.inspectColumns();
    };

    $scope.inspectColumns = function () {

        var needInspect = false;
        var groupedByPrefixes = [];

        function isPrefixExists (fieldName) {
            var result = false;

            angular.forEach(groupedByPrefixes, function(prefix) {
                if(fieldName.indexOf(prefix) > -1) result = true;
            });

            return result;
        }

        angular.forEach($scope.reportConfig.Config.columns, function(column) {
            if(column.GroupBy) {
                needInspect = true;
                if(column.Field != "id" && column.Field.indexOf('.id') == column.Field.length - 3) {
                    groupedByPrefixes.push(column.Field.substr(0, column.Field.length - 3));
                }
            }
        });

        if(needInspect && !$scope.reportConfig.Config.showDetails && !$scope.reportConfig.Config.firstComponentOnly) {
            angular.forEach($scope.reportConfig.Config.columns, function(column) {

                if(column.GroupBy || column.FieldType == "f" || (column.FieldType == "i" && !column.Lookup)) {
                    column.warn = false;
                    return;
                }

                var result = true;

                angular.forEach(groupedByPrefixes, function(prefix) {
                    if(column.Field.indexOf(prefix) > -1) result = false;
                });

                column.warn = result;

            });
        } else {
            angular.forEach($scope.reportConfig.Config.columns, function(column) {
                column.warn = false;
            });
        }

    };

    $scope.onFCOBtn = function () {
        if($scope.reportConfig.Config.firstComponentOnly) {

            $scope.reportConfig.Config.showDetails = false;

            angular.forEach($scope.data.columns, function(column) {
                angular.forEach(column.Fields, function(Field) {
                    if($scope.fcoFields.indexOf(Field.Field) > -1 && !$scope.isColumnFieldUsed(Field)) {
                        Field.GroupBy = true;
                        $scope.reportConfig.Config.columns.push(Field);
                    }
                });
            });

            angular.forEach($scope.reportConfig.Config.columns, function(column) {
                if($scope.fcoFields.indexOf(column.Field) > -1) {
                    column.GroupBy = true;
                }
            });
        }

        $scope.inspectColumns();
    };

    $scope.isColumnFieldUsed = function (field) {

        var result = false;

        angular.forEach($scope.reportConfig.Config.columns, function(columnField) {
            if(columnField.Id == field.Id) {
                result = true;
            }
        });

        return result;
    };

    $scope.onDeleteColumnField = function (field) {
        var index = $scope.reportConfig.Config.columns.indexOf(field);
        $scope.reportConfig.Config.columns.splice(index, 1);
    };
    /**********/

    //Filters
    $scope.onAddFilterField = function (field) {
        if(field.Lookup) {
            field.compareMethod = "=";
        }
        $scope.reportConfig.Config.filters.push(field);
    };

    var lookupTimer;
    $scope.loadLookup = function (field, needClear) {
        lookupTimer && clearTimeout(lookupTimer);

        lookupTimer = setTimeout(function () {
            var offset = 0;

            if(field.LookupData && field.LookupData.Values && field.LookupData.Values.length) {
                offset = field.LookupData.Values.length;
            }

            if(field.lastSearchTerm != field.searchTerm || needClear) offset = 0;

            var params = {
                object: field.Lookup,
                limit: 50,
                offset: offset,
                search: field.searchTerm || ""
            };

            //if(!field.LookupData || field.LookupData.Values.length < field.LookupData.Total) {

                ReportWriterDataSource.getLookup(params, function(res) {

                    field.lastSearchTerm = field.searchTerm;

                    if(needClear) field.LookupData = null;

                    if(field.LookupData) {
                        if(res.Values != null) {
                            field.LookupData.Values = field.LookupData.Values.concat(res.Values);
                        }
                    } else {
                        field.LookupData = res;
                    }
                });

            //}
        }, 500);

    };

    $scope.closePopupList = function (filter, item) {
        filter.defaultValue = item.Id;
        filter.defaultValueName = item.Name;
        filter.openPopup = false;
    };

    $scope.clearSearchTerm = function(filter) {
        filter.searchTerm = '';
    };

    $scope.clearDefaultValue = function(filter) {
        filter.defaultValue = '';
        filter.defaultValueName = '';
    };

    $scope.editDefaultValue = function (filter, needClear) {
        filter.openPopup = !filter.openPopup;
        $scope.loadLookup(filter, needClear);
    };

    $scope.isFilterFieldUsed = function (field) {

        var result = false;

        angular.forEach($scope.reportConfig.Config.filters, function(filterField) {
            if(filterField.Id == field.Id) {
                result = true;
            }
        });

        return result;
    };

    $scope.onDeleteFilterField = function (field) {
        var index = $scope.reportConfig.Config.filters.indexOf(field);
        $scope.reportConfig.Config.filters.splice(index, 1);
    };
    /**********/

    $scope.onDisplayPDF = function () {
        //Popup.showSuccess("PDF SUCCESS");
    };

    $scope.onDisplaySaveFilter = function () {
        //Popup.showSuccess("Save Filter SUCCESS");
    };

    $scope.onSaveNewReport = function () {

        if($scope.reportConfig.Id) {

            ReportWriterDataSource.updateReport($scope.reportConfig, function(res) {
                $scope.openStartPage();
            });

        } else {

            ReportWriterDataSource.createReport($scope.reportConfig, function(res) {
                $scope.openStartPage();
            });
        }

    };

    $scope.onSaveExistingReport = function () {

        /*Find and replace Existing Report
        angular.forEach($scope.data.reports, function(section){
            if(section.name == $scope.reportConfig.type) {
                angular.forEach(section.data, function(item) {
                    if(item.id == $scope.reportConfig.id) {
                        item = $scope.reportConfig;
                    }
                });
            }
        });*/

    };

    $scope.onLogout = function () {
        ReportWriterDataSource.logout({}, function(res, isSuccess) {
            if(isSuccess) {
                $state.go('login', {stateFrom: $state.current.name});
            }
        });
    };

    $scope.selectedItem = {};

    $scope.options = {
        levelThreshold: 300000
      };

    $scope.toggle = function(scope) {
      scope = !scope;
    };

    init();

    }])
  .requires.push('ui.tree')
;
