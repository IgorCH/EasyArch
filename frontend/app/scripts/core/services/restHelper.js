angular
  .module('theme.core.rest_helper', [])
  .service('restHelper', ['$cookies', '$bootbox', '$state', function ($cookies, $bootbox, $state) {

    var rest = {

      isLocal: function () {
        return location.href.indexOf("localhost") > -1;
      },

      processError: function (response) {

        var result = {
          isSuccess: response.status === 200
        };

        if (response.status == 500) {

          $bootbox.alert(response.data.message);

        } else if (response.status == 400) {

          $bootbox.alert(response.data.message);

        } else if (response.status == 401 && $state.current.name != "login") {

          $state.go("login", {redirectTo: $state.current.name });

        } else if (response.status != 200 &&  $state.current.name != "login") {

          $bootbox.alert(response.data.message);

        } else {

          //Если все ok - продливаем сессию
          //if(rwds.getCookie("sessid")) {
          //TODO -> rwds.setCookie("sessid", rwds.getCookie("sessid"), 1);
          //}

        }

        return result;

      },

      stringify: function (params) {
        var str = '';
        for (var paramName in params) {
          str += (str.length ? "&" : "") + paramName + "=" + params[paramName];
        }
        return str;
      },

      //UnixTime
      encodeDateTime: function (dateTime) {
        return "" + new Date(dateTime).getTime() / 1000;
      },

      //UnixTime
      decodeDateTime: function (dateTime) {
        return moment(new Date(+dateTime * 1000)).format('MM/DD/YYYY HH:mm');
      },

      //date -> YYYYMMDD
      encodeDate: function (date) {
        if (date)
          return +moment(date).format('YYYYMMDD');
        else return 0;
      },

      //YYYYMMDD -> MM/DD/YYYY
      decodeDate: function (date) {
        if (date == 0) {
          return "";
        } else {
          date = "" + date;
          return date.substr(4, 2) + "/" + date.substr(6, 2) + "/" + date.substr(0, 4);
        }
      }


    };

    return rest;

  }])
;