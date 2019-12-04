app.controller('checkAuth', function($location) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          debugger
        $location.path('/home');
        } else {
          debugger
          console.log("Signed out");
        $location.path('/login');
        }
      });
})