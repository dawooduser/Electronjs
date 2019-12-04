app.controller("login",  function($scope, $rootScope, $location) {

    debugger
   $scope.signInAndsignUp = (bool) => {
    const { email, password, cpassword } = $scope
       if (bool === 'signIn') {
       if (email === null || email === undefined) return alert('email missing')
       if (password === null || password === undefined) return alert('password missing')
    $scope.authObj.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
        debugger
        console.log("Signed in as:", firebaseUser.uid);
        $scope.email = null
        $scope.password = null
        $rootScope.uid = firebaseUser.uid
        $location.path('/');
      }).catch(function(error) {
        console.log("Authentication failed:", error.message);
        alert(error.message)
        $scope.email = null
        $scope.password = null
      });
      return;
    }
    if (email === null || email === undefined) return alert('email missing')
    if (password === null || password === undefined) return alert('password missing')
    if (cpassword === null || cpassword === undefined) return alert('confirm-password missing')
    if (password !== cpassword) return alert('Password did match')
    $scope.authObj.$createUserWithEmailAndPassword(email, password)
    .then(function(firebaseUser) {
        debugger
      console.log("User " + firebaseUser.uid + " created successfully!");
      $rootScope.uid = firebaseUser.uid
      $rootScope.new = true
      $scope.email = null
      $scope.password = null
      $scope.cpassword = null
      $location.path('/');
    }).catch(function(error) {
      console.log("Error: ", error);
      alert(error.message)
    });
   }
  });