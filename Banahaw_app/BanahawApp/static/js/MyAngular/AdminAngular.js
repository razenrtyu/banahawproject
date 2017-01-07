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
   	$scope.submembersConfirmed = true;

   	// ng-hide
   	$scope.HnSregularservies = true;
   	$scope.HnShealingpackages = true;
	$scope.HideSubMembers = true;

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
   		console.log(rs)
   	};

   	$scope.OnChangeofHealingPackages = function(hs){
   		console.log(hs)
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
   		console.log(hs)
   		$scope.selectedMember = hs
   		$scope.sub_name = ""
   		$scope.selectedbranch = ""
   		$scope.selectedservicetype =""
   		$scope.selectedservices = ""
   		$scope.selectedpackages = ""
   		$scope.bundle = []
   		$scope.selected_attendant = ""
		$scope.HnShealingpackages = true
		$scope.HnSregularservies = true

   		$scope.MembershipType = hs.membertype
   		if ($scope.MembershipType=='Personalized'){
			$scope.transac_inputs = true;
			$scope.HideSubMembers = true;
			$scope.submembersConfirmed = true;
   		};

   		if ($scope.MembershipType=='Family'){

			Requests.getMembers01(hs.member00id).then(function(response){
				if (response.status = 'OK'){
					var data = response.data.data
					$scope.Members01 = data
					$scope.transac_inputs = true;
					$scope.HideSubMembers = false;
   					$scope.submembersConfirmed = false;
				};
			});
   		};
   	};

   	$scope.open = function(){
   		var modalInstance = $uibModal.open({
   			templateUrl: 'partials/Popup.html',
   			controller: 'PopupCont',
   			resolve: {
   				MemberType: function(){
   					return $scope.MembershipType;
   				},
   				MemberName: function(){
   					return $scope.name;
   				}
   			}
   		});
   	};


}]);

MyApp2.controller("PopupCont",function($scope,$uibModalInstance,MemberType,MemberName){
	$scope.MemberType = MemberType;
	$scope.MemberName = MemberName;

	$scope.close = function(){
		$uibModalInstance.dismiss('OK');
	};

});


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


MyApp2.controller("TransactionController2",['$scope','Requests',function ($scope,Requests) {

	$scope.transac_inputs = true
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
			}
		}
});