app.controller('designerCtrl', function($scope, $rootScope, elementService) {
     
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
	
	$scope.groups;
	
	$scope.templates = [
		{
			"group" : "grid",
			"name" : "Row",
			"template":"row"
		},
		{	
			"group" : "grid",
			"name" : "Column",
			"columns" : 6,
			"template":"column"
		},
		{
			"group" : "form",
			"name" : "Form",
			"template":"form",
		},
		{
			"group" : "form",
			"name" : "Input",
			"template":"input",
			"label":"Test Input"
		},
		{
			"group" : "form",
			"name" : "Button",
			"template":"button",
			"label":"Button",
			"color":"default"
		},
		{
			"group" : "form",
			"template":"button_group",
			"label":"Button",
			"size":""
		},
		{
			"name" : "Panel",
			"template":"panel",
			"title" : "Title panel",
			"text" : "Hallo test"
		},
		{
			"name" : "Tabset",
			"template":"tabset",
		},
		{
			"name" : "Tab",
			"template":"tab",
		},

	];

	
	$scope.element = new Object();
   
	$scope.icons = new Array(
		".glyphicon-adjust",
		".glyphicon-align-center", 
		".glyphicon-align-justify", 
		".glyphicon-align-left", 
		".glyphicon-align-right",
		".glyphicon-arrow-down",
		".glyphicon-arrow-left",
		".glyphicon-arrow-right",
		".glyphicon-arrow-up",
		"1.glyphicon-adjust",
		"1.glyphicon-align-center", 
		"1.glyphicon-align-justify", 
		"1.glyphicon-align-left", 
		"1.glyphicon-align-right",
		"1.glyphicon-arrow-down",
		"1.glyphicon-arrow-left",
		"1.glyphicon-arrow-right",
		"1.glyphicon-arrow-up",
		"2.glyphicon-adjust",
		"2.glyphicon-align-center", 
		"2.glyphicon-align-justify", 
		"2.glyphicon-align-left", 
		"2.glyphicon-align-right",
		"2.glyphicon-arrow-down",
		"2.glyphicon-arrow-left",
		"2.glyphicon-arrow-right",
		"2.glyphicon-arrow-up"
		
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
	

	$scope.save = function(){	
		console.log("Save", $scope.element);
		//elementService.replaceElement($scope.element);
		elementService.dragScope.reload();
		$("#myModal").modal('hide');
	}
	
	$scope.edit = function(element){	
		$scope.element = element;
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
});