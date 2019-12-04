var app = angular.module("app", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    // .when("/", {
    //     templateUrl : "angular/pages/checkAuth.html",
    //     controller: 'checkAuth'
    // })
    .when("/", {
        templateUrl : "angular/pages/checkAuth.html",
    })
    .when("/home", {
        templateUrl : "angular/pages/table.html",
        controller: 'home'
    })
    .when("/login", {
        templateUrl : "angular/pages/login.html",
        controller: 'login'
    })
    $locationProvider.html5Mode(true);
});
var config = {
    apiKey: "AIzaSyB_boSniNmbT2y90-MdC3FpLGp5vKu173U",
    authDomain: "imagedraw-1532e.firebaseapp.com",
    databaseURL: "https://imagedraw-1532e.firebaseio.com",
    projectId: "imagedraw-1532e",
    storageBucket: "imagedraw-1532e.appspot.com",
    messagingSenderId: "613611629955",
    appId: "1:613611629955:web:857e2fc7a677daa7f15ab6"
  };
  firebase.initializeApp(config);
  const db = firebase.firestore();
  app.constant('db', db);
//   app.constant('db', db);
//   app.constant('firebase', firebase);
app.run(function ($rootScope, $location) {
  $rootScope.auth = false
      $rootScope.$on('$routeChangeError', function() {
        $location.path('/');
    });
    // enumerate routes that don't need authentication
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          $rootScope.auth = true
          $rootScope.user = user
          $rootScope.uid = user.uid
          $rootScope.$apply(function() {
            $location.path('/home')
            })
        } else {
          console.log("Signed out");
          $rootScope.$apply(function() {
          $location.path('/login')
        })
        }
      });
      BrowserFS.install(window);
      BrowserFS.configure({
        fs: "LocalStorage"
      }, function(e) {
        if (e) {
          console.log(e)
          throw e;
        }
        app.constant('fs', BrowserFS);
        // Otherwise, BrowserFS is ready-to-use!
      });
  })
  
  app.directive('monthOptions', function() {
    var d = new Date();
  var n = d.getFullYear();
  var m = d.getMonth
    return {
        restrict: 'A',
        template:
            '<option value="Januray "' +n+'>Jan - '+n+'</option>' +
            '<option value="Feburay "' +n+'">Feb - '+n+'</option>' +
            '<option value="March "' +n+'">Mar - '+n+'</option>' +
            '<option value="April "' +n+'">Apr - '+n+'</option>' +
            '<option value="May "' +n+'">May - '+n+'</option>' +
            '<option value="June "' +n+'">Jun - '+n+'</option>' +
            '<option value="July "' +n+'">Jul - '+n+'</option>' +
            '<option value="Auguest "' +n+'">Aug - '+n+'</option>' +
            '<option value="September "' +n+'">Sep - '+n+'</option>' +
            '<option value="Octuber "' +n+'">Oct - '+n+'</option>' +
            '<option value="November "' +n+'">Nov - '+n+'</option>' +
            '<option value="December "' +n+'">Dec - '+n+'</option>'                
    }
});
app.directive("fileread", [function () {
  return {
      scope: {
          fileread: "="
      },
      link: function (scope, element, attributes) {
        var arr = {
          'name': null,
          'base64': null,
        }
          element.bind("change", function (changeEvent) {
              var reader = new FileReader();
              reader.onload = function (loadEvent) {
                  scope.$apply(function () {
                    arr.base64 = loadEvent.target.result;
                      scope.fileread = arr
                  });
              }
              arr.name = changeEvent.target.files[0].name
              reader.readAsDataURL(changeEvent.target.files[0]);
          });
      }
  }
}]);
  