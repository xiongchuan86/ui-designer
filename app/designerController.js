app.controller('designerCtrl', function($scope, $rootScope, elementService, projectService, designerService) {
    
	$scope.templates = designerService.templates;
	
	$scope.selected = true;
	 
	//get all elements from the service
	$scope.getElements = function (){
		return elementService.elements;
	}
	
	$scope.groups;
	$scope.getGroups = function (){
		if(!$scope.groups){
			$scope.groups = new Array();
			angular.forEach($scope.templates, function(value, key){
				if($scope.groups.indexOf(value.group) < 0 && value.group){
					$scope.groups.push(value.group);
				}
				console.log("Groups", value.group);
			});
			console.log("Groups", $scope.groups);
		}
		return $scope.groups;
	}
		
	$scope.element = new Object();
   
	$scope.icons = new Array(
		"glyphicon-adjust",
		"glyphicon-align-center", 
		"glyphicon-align-justify", 
		"glyphicon-align-left", 
		"glyphicon-align-right",
		"glyphicon-arrow-down",
		"glyphicon-arrow-left",
		"glyphicon-arrow-right",
		"glyphicon-arrow-up"
	);
	
	$scope.refresh = function (){
		console.log("Refresh");
	}
	
	$scope.deselect = function (){
		console.log("deselect all");
		$rootScope.$broadcast('deselect');
	}
	
	$scope.open = function(){		
		
	}
	
	$scope.setIcon = function(icon){	
		console.log("Set Icon", icon);
		$scope.element.icon = icon;
	}
	
	$scope.controller = function (){
		var controllerText = $("#controllerText").val();
		$scope.$eval(controllerText);
	}
	
	$scope.save = function(){	
		console.log("Save", $scope.element);		
		for (var key in $scope.element) {
		  if ($scope.element.hasOwnProperty(key)) {
			elementService.dragElement[key] = $scope.element[key];
		  }
		}
		$("#myModal").modal('hide');
		projectService.save();
	}
	
	$scope.edit = function(element){	
		$scope.element = angular.copy(element);
		$("#myModal").modal('show');
	}
	
	$scope.remove = function(){	
		elementService.removeElement($scope.element);
		$("#myModal").modal('hide');
	}
	
	// Open model for edit after drop element
	$scope.$on("element-add", function(event, dragElement, dropElement){
		$scope.edit(dragElement);
	});
	
	// Open model for edit after drop element
	$scope.$on("element-edit", function(event, dragElement, dropElement){
		$scope.edit(dragElement);
	});
	
	// Save on element update event
	$scope.$on("element-update", function(event, dragElement, dropElement){
		projectService.save();
	});
})