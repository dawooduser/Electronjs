app.service('ApplicationServices', function($location) {
this.obj = () => {
        const date = new Date()
         var day = date.getDay()
         var month = date.getMonth()
         var year = date.getFullYear()
  var obj = {
    'bill': [],
    'month':  $scope.month,
    'rent': null,
    'deducted': null,
    'uid':null,
    'Date': `${day}/${month}/${year}`,
  }
  debugger
return obj;
}
this.bill = () => {
  var bill = {
    'electric' : {
      'kelectic': null,
      'kelecticAmount': null,
      'billImage': {}
    },
    'water' : {
      'WaterBoard': null,
      'WaterBoardAmount': null,
      'billImage': {}
    },
    'gas' : {
      'SSGC': null,
      'SSGCAmount': null,
      'billImage': {}
    },
    'Expense': {
      'Expense': null,
      'Amount' : null,
      'Reason' : null,
      'billImage': {}
    }
  }
return bill;
}
this.insertImage = (arr) => {
  angular.forEach(arr, (value, key) => {
    db.collection("images").doc(value.imageName).set({image: value.base64 })
  })
}
this.filMthod = arr => {

}
this.addArr = () => {
  
}
  });