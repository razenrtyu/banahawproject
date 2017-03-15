'use strict';

var MyApp2 = angular.module("MyApp2",['ngRoute','720kb.datepicker','ui.bootstrap','oi.select']);

MyApp2.config(['$routeProvider',function($routeProvider){
	$routeProvider

	.when('/',{
		templateUrl : "partials/dashboard.html",
		controller : "DashboardController"
	})
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
	.when('/member/upgrademember',{
		templateUrl : "partials/upgrademember.html",
		controller : "UpgradeMemberController"
	})
	.when('/member/viewmembers',{
		templateUrl : "partials/viewmembers.html",
		controller : "ViewMemberController"
	})
	.when('/reservations/add-reservation/members',{
		templateUrl : "partials/addreservations.html",
		controller : "ReservationController"
	})
	.when('/reservations/add-reservation/non-members',{
		templateUrl : "partials/addreservations2.html",
		controller : "ReservationController2"
	})
	.when('/reservations/view-reservation',{
		templateUrl : "partials/viewreservations.html",
		controller : "ViewController"
	})
	.when('/attendants/new_attendant',{
		templateUrl : "partials/addattendant.html",
		controller : "NewAttendantController"
	})
	.when('/attendants/del_attendant',{
		templateUrl : "partials/delattendant.html",
		controller : "DelAttendantController"
	})
	.when('/attendants/view_attendant',{
		templateUrl : "partials/viewattendant.html",
		controller : "ViewAttendantController"
	})
	.when('/reports/transaction_report',{
		templateUrl : "partials/report.html",
		controller : "ReportController"
	});

}]);

MyApp2.controller("DashboardController",['$scope','Requests','$route',function($scope,Requests,$route) {
	$scope.dashboard = "Reservations for today"

	var today = new Date().toLocaleDateString().split('/').reverse();
	var date = today[0] + '-' + today[2] + '-' + today[1]

	Requests.getReservation(date,date).then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.reservations = data
		};
	});

	$scope.onclick = function(data){
		if(data.show == true){
			data.show = false
		}else{
			data.show = true
		};
	};

	$scope.cancelreservation = function(data,index){
		data.show = true
		Requests.delReservation(data.reservationid).then(function(response){
			if(response.status = 'OK'){
				$route.reload()
			};
		});

	};

	$scope.startreservation = function(data,index){
		delete data['datecreated']
		Requests.postTransaction(data).then(function(response){
			if(response.status = 'OK'){
				Requests.delReservation(data.reservationid).then(function(response){
					if(response.status = 'OK'){
						$route.reload()
					};
				});
			};
		});
	};

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

		Number.prototype.pad = function(size) {
		      var s = String(this);
		      while (s.length < (size || 2)) {s = s + "0";}
		      return s;
		    }

   		$scope.Etime = 0
   		$scope.total_amount = 0
   		var date = new Date()
   		var time = parseInt(String(date.getHours())+String(date.getMinutes().pad()))

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
   		json_data['submembername'] = $scope.sub_name
		Requests.postTransaction(json_data).then(function(response){
			if (response.status = 'OK'){

		   		var modalInstance = $uibModal.open({
		   			templateUrl: 'partials/modals/Popup.html',
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
	$scope.Submem = data.submembername;

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
		   			templateUrl: 'partials/modals/Popup.html',
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
   						 'dateend': end.toLocaleString(),
   						 'time_spent':min,
   						 'active':false}

		Requests.updateTransaction(data.transactionid,json_data2).then(function(response){
			if (response.status = 'OK'){
				var data = response.data.data
				$scope.msg = data
				$route.reload()
			};
		});
   	};

   	$scope.cancelTransaction = function(data){
   		data.show = true
   		Requests.delTransaction(data.transactionid)
   		$route.reload()

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
	};

}]);


MyApp2.controller("AddMemberController",['$scope','Requests','$uibModal',function ($scope,Requests,$uibModal) {

	Requests.getAttendants().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.attendants = data
		};
	});

	$scope.personalized = true
	$scope.member = true
	$scope.remarkslist = ['Flyers/Brochure', 'Signages/Tarpaulin', 'Facebook/Internet',
						  'Friends/Relatives','Others']
	$scope.txtarea = false
	$scope.remarks = ""
	$scope.txtremarks = ""
	$scope.OnChangeofremarks = function(rem){
		if(rem == 'Others'){
			$scope.txtarea = true
			$scope.remarks = ""
			console.log($scope.rem)
		}else if(rem == 'Flyers/Brochure'){
			$scope.txtarea = false
			$scope.remarks = rem
		}else if(rem == 'Signages/Tarpaulin'){
			$scope.txtarea = false
			$scope.remarks = rem
		}else if(rem == 'Facebook/Internet'){
			$scope.txtarea = false
			$scope.remarks = rem
		}else if(rem == 'Friends/Relatives'){
			$scope.txtarea = false
			$scope.remarks = rem
		};

	};

	$scope.OnChangeofMembertype = function(membertype){

		if (membertype == "Personalized"){
			$scope.personalized = false
			$scope.member = true
			$scope.selectedbranch = ""
			$scope.name = ""
			$scope.birthdate = ""
			$scope.address = ""
			$scope.mobileNum = ""
			$scope.landlineNum = ""
			$scope.email = ""
			$scope.submember1 = ""
			$scope.submember2 = ""
			$scope.submember3 = ""
			$scope.submember4 = ""
			$scope.submember5 = ""
			$scope.remarks = ""
			$scope.selectedremarks = ""
			$scope.txtremarks = ""
		};

		if (membertype == "Family"){
			$scope.member = false
			$scope.personalized = false
			$scope.selectedbranch = ""
			$scope.name = ""
			$scope.birthdate = ""
			$scope.address = ""
			$scope.mobileNum = ""
			$scope.landlineNum = ""
			$scope.email = ""
			$scope.remarks = ""
			$scope.selectedremarks = ""
			$scope.txtremarks = ""
		};

	};

	$scope.confirm = function(){
		if($scope.membertype == 'Personalized'){
			var json_data = {'address': $scope.address,
							 'mobile_number': $scope.mobileNum,
							 'landline_number': $scope.landlineNum,
							 'email_address': $scope.email,
							 'birthdate': $scope.birthdate,
							 'membertype': $scope.membertype,
							 'feedback': $scope.remarks+$scope.txtremarks,
							 'name': $scope.name,
	   						 'attendant_name':$scope.selected_attendant.attendant_name,
	   						 'attendantid':$scope.selected_attendant.attendantid,
							 'membershipcost': 300}

			json_data['title'] = 'add'
			Requests.postMember00(json_data).then(function(response){
				if (response.status = 'OK'){
			   		var modalInstance = $uibModal.open({
			   			templateUrl: 'partials/modals/Popup2.html',
			   			controller: 'PopupCont2',
			   			resolve: {
			   				data: function(){
			   					return json_data;
			   				}
			   			}
			   		});
				};
			});

		}else{

			var json_data = {'address': $scope.address,
							 'mobile_number': $scope.mobileNum,
							 'landline_number': $scope.landlineNum,
							 'email_address': $scope.email,
							 'birthdate': $scope.birthdate,
							 'membertype': $scope.membertype,
							 'feedback': $scope.remarks+$scope.txtremarks,
							 'name': $scope.name,
	   						 'attendant_name':$scope.selected_attendant.attendant_name,
	   						 'attendantid':$scope.selected_attendant.attendantid,
							 'membershipcost': 600}

			Requests.postMember00(json_data).then(function(response){
				if (response.status = 'OK'){
					var data = response.data.data
					var mem00id = data[0].member00id
					var submemberlist = [$scope.submember1, $scope.submember2,
									 $scope.submember3, $scope.submember4,
									 $scope.submember5]

					json_data['title'] = 'add'
					json_data['submembers'] = submemberlist
			   		var modalInstance = $uibModal.open({
			   			templateUrl: 'partials/modals/Popup2.html',
			   			controller: 'PopupCont2',
			   			resolve: {
			   				data: function(){
			   					return json_data;
			   				}
			   			}
			   		});

					for(var i =0; i < submemberlist.length; i++){
						var json_data2 = {'member00id': mem00id,
										  'relationship': 'Family',
										  'name': submemberlist[i]}

						Requests.postMember01(json_data2).then(function(response){
							if (response.status = 'OK'){
							};
						});

					};

				};
			});


		};
	};
}]);

MyApp2.controller("PopupCont2",function($scope,$uibModalInstance,$route,data){
	$scope.memtype = data.membertype
	$scope.name = data.name
	$scope.address = data.address
	$scope.bday = data.birthdate
	$scope.l_num = data.landline_number
	$scope.m_num = data.mobile_number
	$scope.e_add = data.email_address
	$scope.remarks = data.feedback
	$scope.cost = data.membershipcost
	$scope.title = data.title

	if($scope.memtype == 'Family'){
		$scope.sub1 = data.submembers[0]
		$scope.sub2 = data.submembers[1]
		$scope.sub3 = data.submembers[2]
		$scope.sub4 = data.submembers[3]
		$scope.sub5 = data.submembers[4]
	};

	$scope.close = function(){
		$uibModalInstance.dismiss('OK');
		$route.reload()
	};

});




MyApp2.controller("UpgradeMemberController",['$scope','Requests','$uibModal',function ($scope,Requests,$uibModal) {

	Requests.getAttendants().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.attendants = data
		};
	});
	
	Requests.getMembersPersonalized().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.PersonalizedMembers = data
		};
	});

	$scope.MemberValidation=function(param){
		$scope.modaldata = param
		$scope.upgrade_forms = true
		$scope.PmemType = param.membertype+' To Family'
		$scope.PmemName = param.name
		$scope.PmemBday = param.birthdate
		$scope.PmemAdress = param.address
		$scope.PmemM_num = param.mobile_number
		$scope.PmemL_num = param.landline_number
		$scope.PmemE_add = param.email_address
		$scope.PmemRemarks = param.feedback
		$scope.Pmem00id = param.member00id
	};


	$scope.upgrade_forms = false
	$scope.disabler = true

	$scope.confirm = function(param){
		var date = new Date().toLocaleDateString()
		var json_data = {'membershipcost': 600,
						 'membertype': 'Family',
						 'member00id': $scope.Pmem00id,
						 'upgraded_by': $scope.selected_attendant.attendantid,
						 'upgraded': date}
		console.log(json_data)

		Requests.putMember00(json_data).then(function(response){
			if (response.status = 'OK'){

				var submemberlist = [$scope.submember1, $scope.submember2,
								 $scope.submember3, $scope.submember4,
								 $scope.submember5]

				$scope.modaldata['title'] = 'upgrade'
				$scope.modaldata['submembers'] = submemberlist
				$scope.modaldata['membershipcost'] = 300
				$scope.modaldata['membertype'] = 'Family'

		   		var modalInstance = $uibModal.open({
		   			templateUrl: 'partials/modals/Popup2.html',
		   			controller: 'PopupCont2',
		   			resolve: {
		   				data: function(){
		   					return $scope.modaldata;
		   				}
		   			}
		   		});

				for(var i =0; i < submemberlist.length; i++){
					var json_data2 = {'member00id': $scope.Pmem00id,
									  'relationship': 'Family',
									  'name': submemberlist[i]}

					Requests.postMember01(json_data2).then(function(response){
						if (response.status = 'OK'){
						};
					});

				};


			};
		});

	}

}]);

MyApp2.controller('ViewMemberController', ['$scope','Requests',function($scope,Requests){

	Requests.getMembersPersonalized().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.PersonalizedMembers = data
		};
	});

	Requests.getMembersFamily().then(function(response){
		if (response.status = 'OK'){
			var data = response.data.data
			$scope.Family = data
		};
	});
	
	Requests.getMembers01all().then(function(response){
		if (response.status = 'OK'){
			$scope.submember = {}
			var data = response.data.data
			angular.forEach(data, function(value, key){
				if(!$scope.submember.hasOwnProperty(value.member00id)){
					$scope.submember[value.member00id] = []
					$scope.submember[value.member00id].push(value)
				}else{
					$scope.submember[value.member00id].push(value)
				};
			});
		};
	});

	$scope.onclick = function(data){
		if(data.show == true){
			data.show = false
		}else{
			data.show = true
		};
	};

}]);

MyApp2.controller('ReservationController',['$scope','Requests','$uibModal',function($scope,Requests,$uibModal){

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

	$scope.MembershipType = 'Members Reservation'

	// ng-show
	$scope.transac_inputs = false;

   	// ng-hide
   	$scope.HnSregularservies = true;
   	$scope.HnShealingpackages = true;
   	$scope.HideSubmember = true;
   	$scope.minutespicker = []
   	$scope.servicestype = [
   		"Regular Services",
   		"Healing Packages"
   	]

   	$scope.gettime = function(){
   		$scope.time = 12
   		var modalInstance = $uibModal.open({
   			templateUrl: 'partials/modals/time.html',
   			controller: 'TimeCont',
   			resolve: {
   				data: function(){
   					return $scope.time;
   				}
   			}
   		}).result.then(function(result){
   			$scope.reservtime = result;
   		});

   	};

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
   		
   	};

   	$scope.OnChangeofbranch = function(hs){
   		
   	};

   	$scope.OnChangeofAttendant = function(hs){
   		
   	};

   	$scope.OnEntersubmember = function(hs){
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

		Number.prototype.pad = function(size) {
			var s = String(this);
			while (s.length < (size || 2)) {s = s + "0";}
			return s;
		}

   		$scope.Etime = 0
   		$scope.total_amount = 0
   		var date = new Date($scope.reservdate+' '+$scope.reservtime)
   		var time = parseInt(String(date.getHours())+String(date.getMinutes().pad()))

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
   						 'total_amount':$scope.total_amount,
   						 'res_date':$scope.reservdate,
   						 'res_time':$scope.reservtime
   						}
   		json_data['submembername'] = $scope.sub_name
		Requests.postReservation(json_data).then(function(response){
			if (response.status = 'OK'){

		   		var modalInstance = $uibModal.open({
		   			templateUrl: 'partials/modals/Popup.html',
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


MyApp2.controller("TimeCont",function($scope,$uibModalInstance,$route,data){
  $scope.mytime = new Date();

  Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
    }

  var convert = function getCurrentTime(currentDate) {
                var currentTime;
                var hour = currentDate.getHours();
                var meridiem = hour >= 12 ? " PM" : " AM";
                var new_hour = ((hour + 11) % 12 + 1)
                var new_min = currentDate.getMinutes()
                currentTime = new_hour.pad() + ":" + new_min.pad() + meridiem;
                return currentTime;
            }
  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;

  $scope.ok = function() {
	$uibModalInstance.close(convert($scope.mytime));	
	};

  $scope.cancel = function() {
	$uibModalInstance.dismiss('cancel');
	};

});



MyApp2.controller('ReservationController2',['$scope','Requests','$uibModal',function($scope,Requests,$uibModal){
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

   	$scope.gettime = function(){
   		$scope.time = 12
   		var modalInstance = $uibModal.open({
   			templateUrl: 'partials/modals/time.html',
   			controller: 'TimeCont',
   			resolve: {
   				data: function(){
   					return $scope.time;
   				}
   			}
   		}).result.then(function(result){
   			$scope.reservtime = result;
   		});

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

   		var json_data = {'transaction_type':'Non-Member',
   						 'client_name':$scope.name,
   						 'client_type':'Non - Member',
   						 'branch':$scope.selectedbranch.branch_name,
   						 'service_type':$scope.selectedservicetype,
   						 'service':$scope.getService(),
   						 'add_ons':$scope.getAddOns(),
   						 'attendant_name':$scope.selected_attendant.attendant_name,
   						 'attendantid':$scope.selected_attendant.attendantid,
   						 'estimated_time':$scope.Etime,
   						 'total_amount':$scope.total_amount,
						 'res_date':$scope.reservdate,
   						 'res_time':$scope.reservtime
   						}

		Requests.postReservation(json_data).then(function(response){
			if (response.status = 'OK'){
				json_data['transaction_type'] = 'Walk-In'
		   		var modalInstance = $uibModal.open({
		   			templateUrl: 'partials/modals/Popup.html',
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

MyApp2.controller('ViewController',['$scope','Requests','$route',function($scope,Requests,$route){
	$scope.restitle = 'View Reservations'
	$scope.drange = false
	$scope.showtable = true

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

	$scope.search_reservation = function(datestart, dateend){

		Requests.getReservation(datestart,dateend).then(function(response){
			if(response.status = 'OK'){
				var data = response.data.data
				$scope.allreservations = data

				if($scope.allreservations.length){
					$scope.restitle = 'View Reservations'
					$scope.showtable = false
				}else{
					$scope.restitle = 'No Reservations Found'
					$scope.showtable = true
				};

			};
		});

	};

	$scope.onclick = function(data){
		if(data.show == true){
			data.show = false
		}else{
			data.show = true
		};
	};

	$scope.cancelreservation = function(data,index){
		data.show = true
		Requests.delReservation(data.reservationid).then(function(response){
			if(response.status = 'OK'){
				$route.reload()
			};
		});

	};

	$scope.startreservation = function(data,index){
		delete data['datecreated']
		Requests.postTransaction(data).then(function(response){
			if(response.status = 'OK'){
				Requests.delReservation(data.reservationid).then(function(response){
					if(response.status = 'OK'){
						$route.reload()
					};
				});
			};
		});
	};

}]);

MyApp2.controller('NewAttendantController',['$scope','Requests','$route',function($scope,Requests,$route){

	$scope.allowancelist =[
		100,
		150,
		200,
		250
	]

	$scope.confirm = function(){
		var json_data = {'attendant_name': $scope.attname,
						 'allowance': $scope.attallowance}

		Requests.postAttendant(json_data).then(function(response){
			if(response.status = 'OK'){
				alert('Successfully added new attendant')
				$route.reload()
			};
		});		
	};

}]);

MyApp2.controller('DelAttendantController',['$scope','Requests','$route',function($scope,Requests,$route){

	Requests.getAttendants().then(function(response){
		if(response.status = 'OK'){
			var data = response.data.data
			$scope.attendants = data
		};
	});

	$scope.onclick = function(data){
		if(data.show == true){
			data.show = false
		}else{
			data.show = true
		};
	};

	$scope.delatt = function(data){
		data.show = true
		Requests.delAttendant(data.attendantid).then(function(response){
			if(response.status = 'OK'){
				$route.reload()
			};
		});

	};

	$scope.editAtt = function(data,attname,allowance){

		if(!attname){
			attname = null
		}
		if(!allowance){
			allowance = null
		}

		var json_data = {'attendant_name': attname,
						 'allowance': allowance,
						 'attendantid': data.attendantid}

		Requests.putAttendant(json_data).then(function(response){
			if(response.status = 'OK'){
				alert('Success')
				$route.reload()
			};
		});
	};

}]);

MyApp2.controller('ViewAttendantController',['$scope','Requests',function($scope,Requests){
	Requests.getAttendants().then(function(response){
		if(response.status = 'OK'){
			var data = response.data.data
			$scope.attendants = data
		};
	});

	$scope.checkattendant = function(param){
		$scope.attendant = param
	}

	$scope.build_data = function(){
	}


	$scope.StartSearch = function(sdate,edate){
		var id = $scope.attendant.attendantid
		Requests.getTransactionbyDate(sdate,edate,id).then(function(response){
			if(response.status = 'OK'){
				var data = response.data.data
				$scope.transactions = data

				Requests.getMembersByDate(sdate,edate,id).then(function(response){
					if(response.status = 'OK'){
						var data = response.data.data
						$scope.members = data

						Requests.getMembersByUpgraded(sdate,edate,id).then(function(response){
							if(response.status = 'OK'){
								var data = response.data.data
								$scope.upgraded = data
								$scope.build_data()			
							};
						});

					};
				});

			};
		});
	}

}]);

MyApp2.controller('ReportController',['$scope','Requests',function($scope,Requests){

	$scope.samplereport = {
		'03/11/2016':[
			{'name':'rc','allowance':250,'commision_on_service':200,'incentive':200,'total':650},
			{'name':'ep','allowance':450,'commision_on_service':400,'incentive':400,'total':1250},
			{'name':'dudi','allowance':500,'commision_on_service':500,'incentive':500,'total':1500}
		],
		'03/12/2016':[
			{'name':'rc','allowance':250,'commision_on_service':200,'incentive':200,'total':650},
			{'name':'ep','allowance':450,'commision_on_service':400,'incentive':400,'total':1250},
			{'name':'dudi','allowance':500,'commision_on_service':500,'incentive':500,'total':1500}
		]
	}

	$scope.onclick = function(data){
		if(data.show == true){
			data.show = false
		}else{
			data.show = true
		};
	};

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
			getMembersByUpgraded:function(ds,de,id){
				return $http({
				method:'GET',
				url:'http://localhost:5000/member00'+'?from='+ds+'&'+'to='+de+'&'+'upgraded_by='+id,
				});
			},
			getMembersByDate:function(ds,de,id){
				return $http({
				method:'GET',
				url:'http://localhost:5000/member00'+'?from='+ds+'&'+'to='+de+'&'+'attendantid='+id,
				});
			},
			getMembers:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/member00',
				});
			},
			getMembersPersonalized:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/member00'+'?membertype=Personalized',
				});
			},
			getMembersFamily:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/member00'+'?membertype=Family',
				});
			},
			getMembers01:function(param){
				return $http({
				method:'GET',
				url:'http://localhost:5000/member01'+'?member00id='+param,
				});
			},
			getMembers01all:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/member01',
				});
			},
			getOngoingTransaction:function(){
				return $http({
				method:'GET',
				url:'http://localhost:5000/transactions'+'?active=1'
				});
			},
			getTransactionbyDate:function(ds,de,id){
				return $http({
				method:'GET',
				url:'http://localhost:5000/transactions'+'?from='+ds+'&'+'to='+de+'&'+'attendantid='+id,
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
			},
			postMember00:function(param){
				return $http({
				method:'POST',
				url:'http://localhost:5000/member00',
				headers: {'Content-type': 'application/json'},
				data: param,
				});
			},
			putMember00:function(param){
				return $http({
				method:'PUT',
				url:'http://localhost:5000/member00',
				headers: {'Content-type': 'application/json'},
				data: param,
				});
			},
			postMember01:function(param){
				return $http({
				method:'POST',
				url:'http://localhost:5000/member01',
				headers: {'Content-type': 'application/json'},
				data: param,
				});
			},
			postReservation:function(param){
				return $http({
				method:'POST',
				url:'http://localhost:5000/reservations',
				headers: {'Content-type': 'application/json'},
				data: param,
				});
			},
			getReservation:function(ds,de){
				return $http({
				method:'GET',
				url:'http://localhost:5000/reservations'+'?from='+ds+'&'+'to='+de,
				});
			},
			delReservation:function(id){
				return $http({
				method:'DELETE',
				url:'http://localhost:5000/reservations'+'?reservationid='+id,
				});
			},
			postAttendant:function(param){
				return $http({
				method:'POST',
				url:'http://localhost:5000/attendants',
				headers: {'Content-type': 'application/json'},
				data: param,
				});
			},
			delAttendant:function(id){
				return $http({
				method:'DELETE',
				url:'http://localhost:5000/attendants'+'?attendantid='+id,
				});
			},
			putAttendant:function(param){
				return $http({
				method:'PUT',
				url:'http://localhost:5000/attendants',
				headers: {'Content-type': 'application/json'},
				data: param,
				});
			}
		}
});