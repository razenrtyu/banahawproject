'use strict';

var MyApp2 = angular.module("MyApp2",['ngRoute','ui.bootstrap','oi.select']);

MyApp2.config(['$routeProvider',function($routeProvider){
	$routeProvider

	.when('/transaction/members',{
		templateUrl : "partials/transaction.html",
		controller : "TransactionController"
	})
	.when('/transaction/non-members',{
		templateUrl : "partials/transaction2.html",
		controller : "TransactionController2"
	})
	.when('/transaction/on-going',{
		templateUrl : "partials/transaction3.html",
		controller : "TransactionController3"

	})
	.when('/member/addmember',{
		templateUrl : "partials/addmember.html",
		controller : "AddMemberController"

	})
	.when('/member/deletemember',{
		templateUrl : "partials/deletemember.html",
		controller : "DeleteMemberController"
	});

}]);


MyApp2.controller("TransactionController",['$scope','Requests','$uibModal',function ($scope,Requests,$uibModal) {
	
	Requests.getMembers().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.Members = data
		};
	});

	Requests.getRegularServices().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.RegularServices = data
		};
	});

	Requests.getHealingPackages().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.HealingPackages = data
		};
	});

	Requests.getAddOns().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.add_ons = data
		};
	});

	Requests.getBranches().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.branches = data
		};
	});

	Requests.getAttendants().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.attendants = data
		};
	});

	$scope.MembershipType = 'Member'

	// ng-show
	$scope.transac_inputs = false;

   	// ng-hide
   	$scope.HnSregularservies = true;
   	$scope.HnShealingpackages = true;
   	$scope.HideSubmember = true;

   	$scope.servicestype = [
   		"Regular Services",
   		"Healing Packages"
   	]

   	$scope.OnChangeofServices = function(st){
   		if (st == "Regular Services"){
   			$scope.HnSregularservies = false
   			$scope.HnShealingpackages = true
   		}
		else if (st == "Healing Packages"){
   			$scope.HnShealingpackages = false
   			$scope.HnSregularservies = true
   		}
   		else{
   			$scope.HnShealingpackages = true
   			$scope.HnSregularservies = true
   		};
   	};

   	$scope.OnChangeofRegularServices = function(rs){
   		$scope.selectedpackages = null
   	};

   	$scope.OnChangeofHealingPackages = function(hs){
   		$scope.selectedservices = null
   	};

   	$scope.OnChangeofAddOns = function(hs){
   		console.log(hs)
   	};

   	$scope.OnChangeofbranch = function(hs){
   		console.log(hs)
   	};

   	$scope.OnChangeofAttendant = function(hs){
   		console.log(hs)
   	};

   	$scope.OnEntersubmember = function(hs){
   		console.log(hs)
		$scope.submembersConfirmed = true;
   	};

   	$scope.MemberValidation = function(hs){
   		$scope.selectedMember = hs
   		$scope.sub_name = ""
   		$scope.selectedbranch = ""
   		$scope.selectedservicetype =""
   		$scope.selectedservices = ""
   		$scope.selectedpackages = ""
   		$scope.bundle = []
   		$scope.selected_attendant = ""
   		$scope.selected_payment = ""
		$scope.HnShealingpackages = true
		$scope.HnSregularservies = true

   		$scope.MembershipType = hs.membertype
   		if ($scope.MembershipType=='Personalized'){
			$scope.transac_inputs = true;
			$scope.HideSubmember = true;
   		};

   		if ($scope.MembershipType=='Family'){

			Requests.getMembers01(hs.member00id).then(function(response){
				if (response.status = 'OK'){
					var data = response.data.data
					$scope.Members01 = data
					$scope.transac_inputs = true;
					$scope.HideSubmember = false;
				};
			});
   		};
   	};

   	$scope.confirm = function(){
   		$scope.Etime = 0
   		$scope.total_amount = 0
   		var date = new Date()
   		var time = parseInt(String(date.getHours())+String(date.getMinutes()))

   		$scope.getService = function(){
   			if($scope.selectedservices){
   				$scope.Etime += $scope.selectedservices.duration;

   				if(time >= 1100 && time < 1400){
   					$scope.total_amount += $scope.selectedservices.off_peak_price;
   				}
   				else if(time >= 1400 && time <= 2200){
   					$scope.total_amount += $scope.selectedservices.peak_price;
   				};
   				return $scope.selectedservices.service_name;
   			};
   			if ($scope.selectedpackages){
   				$scope.total_amount += $scope.selectedpackages.member_price;
   				$scope.Etime += $scope.selectedpackages.duration;
   				return $scope.selectedpackages.package_name;
   			};
   		};

   		$scope.getAddOns = function(){
   			var addons = ""
   			angular.forEach($scope.bundle,function(value,key){
   				addons += value.add_ons_name+', '
   				$scope.Etime += value.duration
   				$scope.total_amount += value.member_price
   			});
   			return addons.slice(0,-2)
   		};

   		var json_data = {'transaction_type':'Member',
   						 'client_name':$scope.selectedMember.name,
   						 'client_type':$scope.MembershipType,
   						 'branch':$scope.selectedbranch.branch_name,
   						 'service_type':$scope.selectedservicetype,
   						 'service':$scope.getService(),
   						 'add_ons':$scope.getAddOns(),
   						 'attendant_name':$scope.selected_attendant.attendant_name,
   						 'attendantid':$scope.selected_attendant.attendantid,
   						 'estimated_time':$scope.Etime,
   						 'total_amount':$scope.total_amount
   						}

		Requests.postTransaction(json_data).then(function(response){
			if (response.status = 'OK'){

		   		var modalInstance = $uibModal.open({
		   			templateUrl: 'partials/Popup.html',
		   			controller: 'PopupCont',
		   			resolve: {
		   				data: function(){
		   					return json_data;
		   				}
		   			}
		   		});
			};
		});
   	};


}]);

MyApp2.controller("PopupCont",function($scope,$uibModalInstance,$route,data){
	$scope.leftpad = function(number) {    
	    return ((number < 10 && number >= 0) ? '0' : '') + number;  
	}

	$scope.mintohour = function(minutes) {  
		 var sign ='';  
		 if(minutes < 0)
		 {  
		 	 sign = '-';  
		 }  
		 var hours = $scope.leftpad(Math.floor(Math.abs(minutes) / 60));  
		 var minutes = $scope.leftpad(Math.abs(minutes) % 60);  
		  
		 return sign + hours +'hrs '+minutes + 'min';  
		  
	} 


	$scope.TransactionType = data.transaction_type;
	$scope.name = data.client_name;
	$scope.Membertype = data.client_type;
	$scope.branch = data.branch;
	$scope.ServiceType = data.service_type;
	$scope.Service = data.service;
	$scope.Add_ons = data.add_ons;
	$scope.AttendantName = data.attendant_name;
	$scope.EstimatedTime = $scope.mintohour(data.estimated_time);
	$scope.Amount = data.total_amount;
	$scope.PaymentType = data.payment_type;

	$scope.close = function(){
		$uibModalInstance.dismiss('OK');
		$route.reload()
	};

});


MyApp2.controller("TransactionController2",['$scope','Requests','$uibModal',function ($scope,Requests,$uibModal) {

	Requests.getMembers().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.Members = data
		};
	});

	Requests.getRegularServices().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.RegularServices = data
		};
	});

	Requests.getHealingPackages().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.HealingPackages = data
		};
	});

	Requests.getAddOns().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.add_ons = data
		};
	});

	Requests.getBranches().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.branches = data
		};
	});

	Requests.getAttendants().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.attendants = data
		};
	});

	$scope.transac_inputs = true
   	$scope.HnSregularservies = true;
   	$scope.HnShealingpackages = true;

   	$scope.servicestype = [
   		"Regular Services",
   		"Healing Packages"
   	]

   	$scope.OnChangeofServices = function(st){
   		if (st == "Regular Services"){
   			$scope.HnSregularservies = false
   			$scope.HnShealingpackages = true
   		}
		else if (st == "Healing Packages"){
   			$scope.HnShealingpackages = false
   			$scope.HnSregularservies = true
   		}
   		else{
   			$scope.HnShealingpackages = true
   			$scope.HnSregularservies = true
   		};
   	};

   	$scope.OnChangeofRegularServices = function(rs){
   		$scope.selectedpackages = null
   	};

   	$scope.OnChangeofHealingPackages = function(hs){
   		$scope.selectedservices = null
   	};

   	$scope.OnChangeofAddOns = function(hs){
   		console.log(hs)
   	};

   	$scope.OnChangeofbranch = function(hs){
   		console.log(hs)
   	};

   	$scope.OnChangeofAttendant = function(hs){
   		console.log(hs)
   	};

   	$scope.confirm = function(){
   		$scope.Etime = 0
   		$scope.total_amount = 0
   		var date = new Date()
   		var time = parseInt(String(date.getHours())+String(date.getMinutes()))

   		$scope.getService = function(){
   			if($scope.selectedservices){
   				$scope.Etime += $scope.selectedservices.duration;
				$scope.total_amount += $scope.selectedservices.non_member_price;
   				return $scope.selectedservices.service_name;
   			};
   			if ($scope.selectedpackages){
   				$scope.total_amount += $scope.selectedpackages.non_member_price;
   				$scope.Etime += $scope.selectedpackages.duration;
   				return $scope.selectedpackages.package_name;
   			};
   		};

   		$scope.getAddOns = function(){
   			var addons = ""
   			angular.forEach($scope.bundle,function(value,key){
   				addons += value.add_ons_name+', '
   				$scope.Etime += value.duration
   				$scope.total_amount += value.non_member_price
   			});
   			return addons.slice(0,-2)
   		};

   		var json_data = {'transaction_type':'Walk-In',
   						 'client_name':$scope.name,
   						 'client_type':'Non - Member',
   						 'branch':$scope.selectedbranch.branch_name,
   						 'service_type':$scope.selectedservicetype,
   						 'service':$scope.getService(),
   						 'add_ons':$scope.getAddOns(),
   						 'attendant_name':$scope.selected_attendant.attendant_name,
   						 'attendantid':$scope.selected_attendant.attendantid,
   						 'estimated_time':$scope.Etime,
   						 'total_amount':$scope.total_amount
   						}

		Requests.postTransaction(json_data).then(function(response){
			if (response.status = 'OK'){

		   		var modalInstance = $uibModal.open({
		   			templateUrl: 'partials/Popup.html',
		   			controller: 'PopupCont',
		   			resolve: {
		   				data: function(){
		   					return json_data;
		   				}
		   			}
		   		});
			};
		});
   	};


}]);


MyApp2.controller("TransactionController3",['$scope','$route','Requests',function ($scope,$route,Requests) {

	Requests.getOngoingTransaction().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.onGoing = data
		};
	});

   	$scope.paymentType = [
   		"Cash",
   		"Gift Check"
   	]
   	$scope.OnChangeofPaymentType = function(data,paymenttype){
   		var end = new Date()
		var diff = Math.abs(end - new Date(data.datestart));
		var min = Math.floor((diff/1000)/60);

   		var json_data2 = {'payment_type':paymenttype,
   						 'dateend': end,
   						 'time_spent':min,
   						 'active':false}
		Requests.updateTransaction(data.transactionid,json_data2).then(function(response){
			if (response.status = 'OK'){
				var data = response.data.data
				$scope.msg = data
			};
		});
   	};

   	$scope.cancelTransaction = function(data){
   		data.show = true
   		Requests.delTransaction(data.transactionid)

   	}

	$scope.leftpad = function(number) {    
	    return ((number < 10 && number >= 0) ? '0' : '') + number;  
	}

	$scope.mintohour = function(minutes) {  
		 var sign ='';  
		 if(minutes < 0)
		 {  
		 	 sign = '-';  
		 }  
		 var hours = $scope.leftpad(Math.floor(Math.abs(minutes) / 60));  
		 var minutes = $scope.leftpad(Math.abs(minutes) % 60);
		 if(hours==1){
		 	var strhours = 'hr '
		 }else{
		 	var strhours = 'hrs '
		 };
		  
		 return sign + hours + strhours +minutes + 'min';  
		  
	} 

	$scope.onclick = function(data){
		if(data.show == true){
			data.show = false
		}else{
			data.show = true
		};
	}

}]);


MyApp2.controller("AddMemberController",['$scope','Requests',function ($scope,Requests) {
	$scope.personalized = true
	$scope.member = true
	$scope.genbuttons = true

	$scope.OnChangeofMembertype = function(membertype){

		if (membertype == "Personalized"){
			$scope.personalized = false
			$scope.member = true
		};

		if (membertype == "Family"){
			$scope.member = false
			$scope.personalized = false
		};

		$scope.genbuttons = false
	};
	

}]);




MyApp2.controller("DeleteMemberController",['$scope','Requests',function ($scope,Requests) {


}]);


MyApp2.factory('Requests',function($http){
		return {
			getHealingPackages:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/HealingPackages',
				});
			},
			getRegularServices:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/RegularServices',
				});
			},
			getAddOns:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/AddOns',
				});
			},
			getBranches:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/branch',
				});
			},
			getAttendants:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/attendants',
				});
			},
			getMembers:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/member00',
				});
			},
			getMembers01:function(param){
				return $http({
				method:'GET',
				url:'http://localhost:5000/member01'+'?member00id='+param,
				});
			},
			getOngoingTransaction:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/transactions'+'?active=1'
				});
			},
			postTransaction:function(param){
				return $http({
				method:'POST',
				url:'http://localhost:5000/transactions',
				headers: {'Content-type': 'application/json'},
				data: param,
				});
			},
			updateTransaction:function(id,param){
				return $http({
				method:'PUT',
				url:'http://localhost:5000/transactions'+'?transactionid='+id,
				headers: {'Content-type': 'application/json'},
				data: param,
				});
			},
			delTransaction:function(id){
				return $http({
				method:'DELETE',
				url:'http://localhost:5000/transactions'+'?transactionid='+id,
				});
			}
		}
});