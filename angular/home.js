app.controller("home", function($scope, $rootScope, ApplicationServices) {
      
      render()
        //  $scope.month = `${month} - ${year}`
        // $scope.obj = {
        //   'bill': null,
        //   'month':  $scope.month,
        //   'rent': null,
        //   'deducted': null,
        //   'uid': $rootScope.user.uid,
        //   'Date': `${day}/${month}/${year}`,
        // }
        // $scope.bill = {
        //   'electric' : {
        //     'kelectic': null,
        //     'kelecticAmount': null,
        //     'billImage': {}
        //   },
        //   'water' : {
        //     'WaterBoard': null,
        //     'WaterBoardAmount': null,
        //     'billImage': {}
        //   },
        //   'gas' : {
        //     'SSGC': null,
        //     'SSGCAmount': null,
        //     'billImage': {}
        //   },
        //   'Expense': {
        //     'Expense': null,
        //     'Amount' : null,
        //     'Reason' : null,
        //     'billImage': {}
        //   }
        // }
        // $rootScope.new
        function render() {
          debugger
          $scope.printData = [{
            month:'John',
            rent:'John',
            Deducted:'John',
          }]
          $scope.billPrint = []
          $scope.image = null
          if ($rootScope.new === true) {
          $('#modalExample').modal({
            toggle: true,
            backdrop: "static", 
            keyboard: false
          })
          } else {
            db.collection("bill").where('uid' , '==', $rootScope.uid)
            .onSnapshot(function(doc) {
              let bill = [], add = {}, i = 0
              if (doc.empty) {
                 $scope.printData = []; 
                 something($scope.printData)
                 return;
              }
              angular.forEach(doc.docs, (element, key) => {
                i++
                const id = element.id
                let data = element.data();
                data.id = id
                bill.push(data)
              });
              something(bill)
          });
          }
        }
        function something(something) {
          debugger
          $scope.$apply(function () {
            $scope.printData = something
          });
        }
        $scope.chooseAction = (action, id) => {
          var data = $scope.printData
          if (action === 'delete') {
            if (id === undefined) return alert('id not found for Delete record purpose')
          db.collection("bill").doc(id).delete().then(function() {
              console.log("Document successfully deleted!");
              angular.forEach($scope.printData, (element, key) => {
                if (element.id === id) {
                  data.splice(key, 1)
                  something(data)
                }
              });
          }).catch(function(error) {
              console.log("Error removing document: ", error);
          })
          return;
          }
        }
        $scope.showbill = function(id) {
          // var _key = null
          $scope.billPrint = []
          angular.forEach($scope.printData, (ele, key) => {
            if (ele.id === id) {
             var data = $scope.printData[key]
            //  var bill = data.bill
             $scope.billPrint = data.bill
            //  console.log(bill)
            }
          })
          $('#billModal').modal({
            toggle: true,
            backdrop: "static", 
            keyboard: false
          })
        }
        $scope.showimage = imagename => {
          // var _key = null
          return db.collection("images").doc(imagename).get().then(function(doc) {
            console.log("Document successfully deleted!");
            var $preview = $('#preview').empty();
            $scope.imageData = doc.data()
            $scope.imageData = $scope.imageData.image
            // $('#billModal').modal({
            //   toggle: true,
            //   backdrop: "static", 
            //   keyboard: false
            // })
            $scope.checkmodal('#billModal')
            $('#imageModal').modal('show')
            var img = document.createElement('img');
              img.src = $scope.imageData;
              img.class = '.img-responsive'
              $preview.append(img)
        }).catch(function(error) {
            console.log("Error removing document: ", error);
        })
        }
        $scope.closeImagebtn = () => {
          debugger
          $scope.checkmodal('#imageModal')
          $('#billModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        }
     $scope.addAndEdit = id => {
       let {month, Rent, Deducted, kelectic, SSGC, WaterBoard,Expense,
        kelecticAmount, SSGCAmount, WaterBoardAmount,ExpenseAmount, kelecticbill,
        ssgcbill, waterBoardbill, expenseBill, bill, obj} = $scope
       if (id === undefined) {
        const date = new Date()
        var day = date.getDay()
        var _month = date.getMonth()
        var year = date.getFullYear()
         debugger
         $scope.obj ={
          'bill': [],
          'month': null,
          'rent': null,
          'deducted': null,
          'uid':null,
          'Date': `${day}/${_month}/${year}`,
        }
        $scope.bill = []
        //  $scope.bill = ApplicationServices.bill()
         let arr = [], randomId
         if (Rent === undefined || Rent === null) return alert('Enter Rent Amount');
         if (Deducted === undefined || Deducted === null) Deducted = 0
         if (month === undefined || month === null) alert('Select Rent Month');
         $scope.obj.rent = Rent;
         $scope.obj.deducted = Deducted;
         $scope.obj.month = month;
         $scope.obj.uid = $rootScope.uid
         if (kelectic === true) {
        //  bill.electric.kelectic = true;
         if (kelecticAmount === undefined || kelecticAmount === null) return alert('forgot to enter k-electric bill amount');
        //  bill.electric.kelecticAmount = kelecticAmount
         if (kelecticbill === undefined || kelecticbill === null) return alert('forgot to submit k-electric bill Image');
         randomId = Math.random().toString(5).substring(2, 15)
        //  bill.electric.billImage = {
        //    'imageName' : randomId,
        //  }
        $scope.bill.push({ 'name':  'kelectic', 'Amount': kelecticAmount, 'imageName': randomId })
         arr.push({ 'imageName' : randomId, 'base64': kelecticbill.base64})
         }
         if (SSGC === true) {
        //  bill.gas.SSGC = true;
         if (SSGCAmount === undefined || SSGCAmount === null) return alert('forgot to enter SSGC bill amount');
        if (ssgcbill === undefined || ssgcbill === null) return alert('forgot to submit SSGC bill Image');
        //  bill.gas.SSGCAmount = SSGCAmount
         randomId = Math.random().toString(5).substring(2, 15)
        //  bill.gas.billImage = {
        //   'imageName' : randomId,
        // }
        $scope.bill.push({ 'name':  'SSGC', 'Amount': SSGCAmount, 'imageName': randomId })
        arr.push({ 'imageName' : randomId, 'base64': ssgcbill.base64})
         }
         if (WaterBoard === true) {
          if (WaterBoardAmount === undefined || WaterBoardAmount === null) return alert('forgot to enter Water Board bill amount');
          if (waterBoardbill === undefined || waterBoardbill === null) return alert('forgot to submit Water Board bill Image');
        //  bill.water.WaterBoard = true; 
        //  bill.water.WaterBoardAmount = WaterBoardAmount
        randomId = Math.random().toString(5).substring(2, 15)
        //  bill.water.billImage = {
        //   'imageName' : randomId,
        // }
        $scope.bill.push({ 'name':  'WaterBoard', 'Amount': WaterBoardAmount, 'imageName': randomId })
        arr.push({ 'imageName' : randomId, 'base64': waterBoardbill.base64})
         }
         if (Expense === true) {
        //  bill.Expense.Expense = Expense; 
         if (ExpenseAmount === undefined || ExpenseAmount === null) return alert('forgot to enter Expensive amount');
         if (expenseBill === undefined || expenseBill === null) return alert('forgot to submit Expense bill Image');
         if (ExpenseReason === undefined || ExpenseReason === null) return alert('forgot to enter Expense Reason');
        //  bill.Expense.Amount = ExpenseAmount; 
        //  bill.Expense.Reason = ExpenseReason
        randomId = Math.random().toString(5).substring(2, 15)
        //  bill.Expense.billImage = {
        //   'imageName' : randomId,
        // }
        $scope.bill.push({ 'name':  'Expense', 'Reason': ExpenseReason, 'Amount': ExpenseAmount, 'imageName': randomId })
        arr.push({ 'imageName' : randomId, 'base64': expenseBill.base64})
         }
         $scope.obj.bill = $scope.bill
         ApplicationServices.insertImage(arr);
         debugger
         db.collection("bill").add($scope.obj).catch(function(error) {
            console.log("Error adding document: ", error);
            alert("Error adding document: ", error)
            debugger
        });
        $scope.checkmodal('#modalExample')
       }
     }
   $scope.checkmodal = (id) => {
    const check = $(id).is(':visible');
    check === true ? $(id).modal('hide') : null
   }
  $scope.modal = id => {
      $('#modalExample').modal({
        toggle: true,
        backdrop: "static", 
        keyboard: false
      })
    
  }
//   $(window).on('click', function(event){
//     debugger
//     // if(event.target == modal()){
//       let _name = event.target.id
//       if (_name !== '') {
//       // _name = `#${_name}`
//       //   $(_name).css({display: "block"});
//       }
//     // }
// });

//   db.collection("cities").add({
//     name: "Tokyo",
//     country: "Japan"
// })
// .then(function(docRef) {
//   debugger
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   debugger
//     console.error("Error adding document: ", error);
// });
});