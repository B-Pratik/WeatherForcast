var reports = angular.module("Weather",[]);
reports.controller("GetReports",['$scope','$http',function ($scope,$http){
	$scope.GrabIt = function(){
		$scope.report=[];
		$scope.list.forEach(function(a){
			$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+a+'&cnt=14&units=metric&APPID=d5a9ec7c4ee72611e8939ae4f34936eb').success(function(data){
				$scope.report.push(data);
			});
		});
	};
	$scope.GetCurrent = function(){
		function onPositionUpdate(position){
			var lati = position.coords.latitude;
			var longi = position.coords.longitude;
			$scope.report=[];
			$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?lat='+lati+'&lon='+longi+'&cnt=14&units=metric&APPID=d5a9ec7c4ee72611e8939ae4f34936eb').success(function(data){
				$scope.report.push(data);
			});
			document.getElementById("searchB").value="";
		}
		if(navigator.geolocation)
			navigator.geolocation.getCurrentPosition(onPositionUpdate);
		else
			alert("navigator.geolocation is not available");
	};
	$scope.Clear = function(){
		if($scope.report){
			$scope.report.length = 0;
		}
		if($scope.list){
			$scope.list.length = 0;
			document.getElementById("searchB").value="";
		}
	};
}]);