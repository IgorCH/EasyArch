angular
  .module('theme.core.rw_cpanel_controller', ['flow', 'xeditable', 'theme.core.directives', 'theme.core.services'])
  .controller('RWCPanelController', ['$scope', '$bootbox', '$theme', '$q', 'ReportWriterDataSource',
    function($scope, $bootbox, $theme, $q, ReportWriterDataSource) {

    $scope.dataTypes = [
        {code: "b", name: "boolean"},
        {code: "i", name: "integer"},
        {code: "u", name: "unsigned"},
        {code: "f", name: "float"},
        {code: "s", name: "string"},

        {code: "d", name: "date"},
        {code: "t", name: "timestamp"},

        {code: "p", name: "picklist"},
        {code: "m", name: "multipicklist"},

        {code: "l", name: "lookup"}
    ];

    $scope.getTypeNameByCode = function (code) {
        if(code == "b") return "boolean";
        if(code == "i") return "integer";
        if(code == "u") return "unsigned";
        if(code == "f") return "float";
        if(code == "s") return "string";
        if(code == "d") return "date";
        if(code == "t") return "timestamp";
        if(code == "p") return "picklist";
        if(code == "m") return "multipicklist";
        if(code == "l") return "lookup";
    };

    $scope.data = {
        headers: [],
        objects: null,
        columns: [],
        fields: []

    };

    $scope.configData = {
        currentObject: null,
        currentColumnId: 5,
        currentColumnData: null,
        newColumnName: null,
        autoComplete: null

        //sortableChapters: null,
        //sortableFields: null
    };

    function init () {
        ReportWriterDataSource.getObjects({}, function (res) {
            $scope.data.objects = res;
            if($scope.data.objects.length) {
                $scope.configData.currentObject = $scope.data.objects[0];

                ReportWriterDataSource.getChapter({object: $scope.configData.currentObject.Id}, function(res) {
                    $scope.data.columns = res;

                    if($scope.data.columns) {
                        $scope.configData.currentColumnId = $scope.data.columns[0].Id;

                        ReportWriterDataSource.getField({chapter: $scope.configData.currentColumnId}, function(res) {
                            $scope.data.fields = res || [];
                        });
                    }
                });
            }
        });

        /*setTimeout(function() {
            $scope.configData.sortableFields = Sortable.create(document.getElementById('fields'), { handle: "td", onEnd: function(evt) {
                $scope.data.fields.splice(evt.newIndex, 0, $scope.data.fields.splice(evt.oldIndex, 1)[0]);
                var params = [];
                for(var i=0;i<$scope.data.fields.length;i++) {
                    $scope.data.fields[i].OrderIndex = i;
                    params.push($scope.data.fields[i].Id);
                }

                ReportWriterDataSource.reorderField(params, function(res) {});
            }});

            $scope.configData.sortableChapters = Sortable.create(document.getElementById('chapters'), { handle: "div", onEnd: function(evt) {
                $scope.data.columns.splice(evt.newIndex, 0, $scope.data.columns.splice(evt.oldIndex, 1)[0]);
                var params = [];
                for(var i=0;i<$scope.data.columns.length;i++) {
                    $scope.data.columns[i].OrderIndex = i;
                    params.push($scope.data.columns[i].Id);
                }

                ReportWriterDataSource.reorderChapter(params, function(res) {});
            }});

        }, 500);*/

    }

    init();

    var autoCompleteTimer;
    $scope.getAutoComplete = function (text) {

        if(!text) return;

        var deferred = $q.defer();

        autoCompleteTimer && clearTimeout(autoCompleteTimer);
        autoCompleteTimer = setTimeout(function(){

            var params = {
                object: $scope.configData.currentObject.ApiName,
                text: text
            };

            if($scope.configData.currentColumnId == 0) {
                ReportWriterDataSource.getAutoCompleteForHeaders(params, function(res) {
                    $scope.configData.autoComplete = res;
                    deferred.resolve($scope.configData.autoComplete);
                });
            } else {
                ReportWriterDataSource.getAutoComplete(params, function(res) {
                    $scope.configData.autoComplete = res;
                    deferred.resolve($scope.configData.autoComplete);
                });
            }

        }, 500);

        return deferred.promise;
    };

    $scope.onChangeObject = function () {

        ReportWriterDataSource.getChapter({object: $scope.configData.currentObject.Id}, function(res) {
            $scope.data.columns = res;

            if($scope.data.columns) {
                $scope.configData.currentColumnId = $scope.data.columns[0].Id;

                ReportWriterDataSource.getField({chapter: $scope.configData.currentColumnId}, function(res) {
                    $scope.data.fields = res || [];
                });
            } else {
                $scope.configData.currentColumnId = null;
                $scope.data.fields = [];
            }

        });
    };

    $scope.onSelectHeader = function () {
        $scope.configData.currentColumnId = 0;
        ReportWriterDataSource.getField({chapter: $scope.configData.currentColumnId}, function(res) {
            $scope.data.fields = res || [];
        });

    };

    /*End of Chapter Methods*/

    $scope.onSelectColumn = function (column) {
        if($scope.configData.currentColumnId != column.Id) {
            $scope.configData.currentColumnId = column.Id;
            ReportWriterDataSource.getField({chapter: $scope.configData.currentColumnId}, function(res) {
                $scope.data.fields = res || [];
            });
        }
    };

    $scope.onEditColumn = function (column) {
        column.isEditing = true;
        column.BackupCopy = angular.copy(column);
        //$scope.configData.sortableChapters.options.disabled = true;
    };

    $scope.onSaveColumn = function (column) {

        if(!column.Name) return;

        if(column.Id) {
            ReportWriterDataSource.updateChapter(column, function(res, resultDetails) {
                //field = angular.copy(res);
                if(resultDetails.isSuccess) {
                    column.isEditing = false;
                    //$scope.configData.sortableChapters.options.disabled = false;
                }
            });
        } else {
            ReportWriterDataSource.createChapter(column, function(res, resultDetails) {
                if(resultDetails.isSuccess) {
                    column.isEditing = false;
                    //$scope.configData.sortableChapters.options.disabled = false;
                    column = angular.copy(res, column);
                }
            });
        }

    };

    $scope.onCancelColumn = function (column) {
        column.isEditing = false;
        //$scope.configData.sortableChapters.options.disabled = false;
        column = angular.copy(column.BackupCopy, column);
        delete column.BackupCopy;
    };

    $scope.onRemoveColumn = function (column) {

        $bootbox.confirm('Are you sure you want to delete this chapter?', function (result) {
          console.log(result);
          if(result) {
            ReportWriterDataSource.deleteChapter(column, function (res) {
              column.isEditing = false;
              //$scope.configData.sortableChapters.options.disabled = false;

              var index = $scope.data.columns.indexOf(column);
              $scope.data.columns.splice(index, 1);
            });
          }

        });

    };

    $scope.onAddColumn = function () {

      $bootbox.prompt('Chapter Name?', function(result) {
        if (result !== null) {
          if(!$scope.data.columns) $scope.data.columns = [];

          var newChapter = {
            Name: result,
            Object: $scope.configData.currentObject.Id,
            OrderIndex: $scope.data.columns.length
          };

          ReportWriterDataSource.createChapter(newChapter, function(res) {
            $scope.data.columns.push(res);
            $scope.configData.newColumnName = "";
            $scope.configData.currentColumnId = res.Id;
            $scope.data.fields = [];
          });
        }
      });
    };

    /*End of Chapter Methods*/

    /*Fields Methods*/

    $scope.searchTextChange = function (field) {
        field.Field = field.searchText;
    };

    $scope.selectedItemChange = function (field, item) {
        if(item) {
            field.Field = item.Field;
        }
    };

    $scope.onEditField = function (field) {
        field.searchText = field.Field;
        field.BackupCopy = angular.copy(field);
        field.isEditing = true;
        //$scope.configData.sortableFields.options.disabled = true;
    };

    $scope.onSaveField = function (field) {

        if(!field.Name || !field.Field) return;

        if(field.Id) {
            ReportWriterDataSource.updateField(field, function(res, resultDetails) {
                if(resultDetails.isSuccess) {
                    field.isEditing = false;
                    //$scope.configData.sortableFields.options.disabled = false;
                }
            });
        } else {
            field.OrderIndex = $scope.data.fields.length;
            ReportWriterDataSource.createField(field, function(res, resultDetails) {
                if(resultDetails.isSuccess) {
                    field = angular.copy(res, field);
                    field.isEditing = false;
                    //$scope.configData.sortableFields.options.disabled = false;
                }
            });
        }

    };

    $scope.onCancelField = function (field) {
        if(field.Id) {
            field.isEditing = false;
            //$scope.configData.sortableFields.options.disabled = false;
            field = angular.copy(field.BackupCopy, field);
            delete field.BackupCopy;
        }
        else
        {
            var index = $scope.data.fields.indexOf(field);
            $scope.data.fields.splice(index, 1);
        }
    };

    $scope.onRemoveField = function (field) {

        $bootbox.confirm('Are you sure you want to delete this Field?', function (res) {

          if(res) {
            ReportWriterDataSource.deleteField(field, function(res) {
                field.isEditing = false;
                //$scope.configData.sortableFields.options.disabled = false;

                var index = $scope.data.fields.indexOf(field);
                $scope.data.fields.splice(index, 1);
            });

          }
        });

    };

    $scope.onAddField = function () {
        //TODO неплохо бы еще и курсор вставить

        var newField = {
            Name: "",
            Field: "",
            FieldType: "i",
            Chapter: $scope.configData.currentColumnId
        };

        $scope.data.fields.push(newField);
        newField.isEditing = true;
    };

    /*End of Fields Methods*/

    $scope.onLogout = function () {
        ReportWriterDataSource.logout({}, function(res, isSuccess) {
            if(isSuccess) {
                $state.go('login', {stateFrom: $state.current.name});
            }
        });
    };

    }])
;
