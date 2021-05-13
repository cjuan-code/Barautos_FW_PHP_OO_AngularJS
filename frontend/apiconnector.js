barautos.factory("services", ['$http', '$q', function($http, $q){

    let serviceBase='/backend/index.php?page=';
    let object = {};

    object.get = function (module, oper) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http({
              method: 'GET',
              url: serviceBase + module + '&op=' + oper
          }).success(function(data, status, headers, config) {
             defered.resolve(data);
          }).error(function(data, status, headers, config) {
             defered.reject(data);
          });
        return promise;
    };

    obj.get = function (module, oper, dada) {
        var defered=$q.defer();
        var promise=defered.promise;
        $http({
              method: 'GET',
              url: serviceBase + module + '&op=' + oper + '&param=' + dada
          }).success(function(data, status, headers, config) {
             console.log(data);
             defered.resolve(data);
          }).error(function(data, status, headers, config) {
             defered.reject(data);
          });
        return promise;
    };

    obj.post = function (module, option, data) {
        var defered = $q.defer();
        var promise = defered.promise;
        $http({
              method: 'POST',
              url: serviceBase + module + '&op=' + option,
              data: data
          }).success(function(response, status, headers, config) {
             defered.resolve(response);
          }).error(function(error, status, headers, config) {
             defered.reject(error);
          });
        return promise;
    };

    return object;

}]);