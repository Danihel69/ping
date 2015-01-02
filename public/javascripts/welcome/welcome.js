// angular stuff
// login and registration controllers
// this is used via ng-app="welcome" on #container in index.jade
var app = angular.module("welcome", []);

app.controller("sign_in", function($scope, $http){
    $scope.login = function(){
    	if($scope.emailpseudo_login == undefined || $scope.wp_login == undefined){
    		printError("please fill all fields.");
    	}else if($scope.wp_login.length < 6){
    		printError("password is invalid.");
    	}else{
    		var request = $http({
    			method: "post",
    			url: "/people/login",
			    data: {
			        vale: $scope.emailpseudo_login,
			        valp: $scope.wp_login
			    }
		    });
		    /* Check whether the HTTP Request is successful or not. */
			request.success(function(){
			    printError("success!!");
			});

			request.error(function(){
				printError("error.");
			});
		}
	}
});

app.controller("sign_up", function($scope, $http){
	$scope.register = function(){
		if($scope.email_reg == undefined || 
			$scope.name_reg == undefined || 
			$scope.wp_reg == undefined || 
			$scope.wpr_reg == undefined){
			printError("please fill all fields.")
		}else if(!checkIfEmailInString /*method in misc.js*/($scope.email_reg)){
			printError('the email address you entered is not valid.');
		}else if($scope.name_reg.length < 4){
			printError('the name you entered was not long enough.');
		}else if($scope.wp_reg.length < 6){
			printError('the password you entered was not long enough.');
		}else if($scope.wp_reg != $scope.wpr_reg){
			printError('the passwords you entered do not match.');
		}else{
			var request = $http({
    			method: "post",
    			url: "/people/new",
			    data: {
			        vale: $scope.email_reg,
			        valn: $scope.name_reg,
			        valps: $scope.pseudo_reg,
			        valp: $scope.wp_reg
			    }
		    });
		    /* Check whether the HTTP Request is successful or not. */
			request.success(function(){
			    printError("success!!");
			});

			request.error(function(){
				printError("error.");
			});
		}
	}
});

// all click listeners for the welcome page
// for the "links" to change the forms between login and register
// for the registration and login button
function set_welcome_click_listeners(){
	$("#gotoreg_login").bind("click", function () {
		$(":input").val("");
		$("#regbutton_reg").val("Create my account");
		$(".registerpanel").addClass("active");
		$(".loginpanel").removeClass("active");
		$(".loginpanel").hide();
		$(".registerpanel").show();
	});

	$("#gotologin_reg").bind("click", function () {
		$(":input").val("");
		$("#loginbutton_login").val("Log in");
		$(".loginpanel").addClass("active");
		$(".registerpanel").removeClass("active");
		$(".registerpanel").hide();
		$(".loginpanel").show();
	});
}

// listen for enter on the inputs
function set_welcome_keypress_listeners(){
	$(".login").bind("keypress", function (e) {
	    var key = e.which || e.keyCode;
	    if (key == 13) { // 13 is enter
	      login();
	    }
	});

	$(".reg").bind("keypress", function (e) {
	    var key = e.which || e.keyCode;
	    if (key == 13) { // 13 is enter
	      register();
	    }
	});
}
