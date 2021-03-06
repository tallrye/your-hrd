'Use Strict';
angular.module('App').controller('homeController', function ($scope, $ionicScrollDelegate, $state,$cordovaOauth, $firebaseArray, $localStorage, $location,$http,$window,$ionicPopup, $firebaseObject, Auth, $cordovaCamera, $cordovaImagePicker, FURL, Utils) {
  	
	var ref = new Firebase(FURL + '/profile/' + $localStorage.userkey);
	var baseRef = new Firebase(FURL);
  	
  	if(window.localStorage.getItem("username") !== null && window.localStorage.getItem("password") !== null) {
        console.log('user is logged in');
    } else {
        $state.go('login');
    }
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value", function(snapshot) {
  		$scope.company = snapshot.val().company;
  		$scope.fullname = snapshot.val().fullname;
  		$scope.registered = snapshot.val().registered_in;
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
	$scope.showDiamond = true;
	$scope.showJewellery = true;
	$scope.showPhoto = false;
	
  	$scope.logOut = function () {
      	Auth.logout();
		window.localStorage.removeItem("username");
      	window.localStorage.removeItem("password");
      	$location.path("/login");
  	}

  	$scope.getPhoto = function() {
  		var options = {
	      	quality : 100, 
            destinationType : Camera.DestinationType.FILE_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 2000,
            targetHeight: 2000,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
	    }
	    $cordovaCamera.getPicture(options).then(function(imageURI) {
	      	$scope.lastPhoto =  imageURI;
	      	$scope.showPhotoPick = false;
	      	$scope.showPhoto = true;
	    }, function(err) {
	      	
	    });
  	}
  	$scope.pickImage = function(source) { 
	  	var options = {
		   	quality: 100,
		    destinationType: Camera.DestinationType.FILE_URI,
		    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		    allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 2000,
            targetHeight: 2000,
            popoverOptions: CameraPopoverOptions, 
	  	};
	  	$cordovaCamera.getPicture(options).then(function (imageURI) {
	      	$scope.lastPhotoPick = imageURI;
      		$scope.showPhotoPick = true;
      		$scope.showPhoto = false;
	    }, function(error) {
	      // error getting photos
    	});
  	}

  	$scope.reload = function(){
  		$state.go($state.current, {}, {reload: true});
  	}

  	$scope.createLog = function(certificate) {
      var log = {
		certNo: certificate,
        userkey: $localStorage.userkey,
      };

      var logRef = $firebaseArray(baseRef.child('log'));
      return logRef.$add(log).then(function(baseRef) {
			  var id = baseRef.key();
			  //console.log("added record with id " + id);
			  logRef.$indexFor(id); // returns location in the array
			});
    }

  	$scope.getDiamond = function(yql, certNo){
  		$scope.showDiamond = false;
  		$ionicScrollDelegate.scrollTop();
  		$.getJSON(yql, function (data) {
			var xmlDoc = $.parseXML(data.results[0]),
				$xml = $( xmlDoc ),
			  	ReportNumber = $xml.find( "ReportNumber" ).text(),
			  	ShapeCode = $xml.find( "ShapeCode" ).text(),
			  	DateOfIssue = $xml.find( "DateOfIssue" ).text(),
			  	Carat = $xml.find( "Carat" ).text(),
			  	ColourGrade = $xml.find( "ColourDescription" ).text(),
			  	ClarityDescription = $xml.find( "ClarityDescription" ).text(),
			  	ProportionsDescription = $xml.find( "ProportionsDescription" ).text(),
			  	PolishDescription = $xml.find( "PolishDescription" ).text(),
			  	SymmetryDescription = $xml.find( "SymmetryDescription" ).text(),
			  	FluorescenceDescription = $xml.find( "FluorescenceDescription" ).text(),
			  	Measurements = $xml.find( "Measurements" ).text(),
			  	GirdleDescription = $xml.find( "GirdleDescription" ).text(),
			  	CuletDescription = $xml.find( "CuletDescription" ).text(),
			  	TotalDepthDescription = $xml.find( "TotalDepthDescription" ).text(),
			  	TableWidthDescription = $xml.find( "TableWidthDescription" ).text(),
			  	CrownHeightDescription = $xml.find( "CrownHeightDescription" ).text(),
			  	PavilionDepthDescription = $xml.find( "PavilionDepthDescription" ).text(),
			  	LengthHalvesCrownDescription = $xml.find( "LengthHalvesCrownDescription" ).text(),
			  	LengthHalvesPavilionDescription = $xml.find( "LengthHalvesPavilionDescription" ).text(),
			  	SumabDescription = $xml.find( "SumabDescription" ).text(),
			  	Inscription = $xml.find( "Inscription" ).text(),
			  	Remark = $xml.find( "Remark" ).text();
		  	if(ReportNumber == ""){
		  		alert('Record not found!');
		  		$state.go($state.current, {}, {reload: true});
		  		return;
		  	}else{
			  	$('#reportNumber').html(ReportNumber);
			  	$('#dateOfIssue').html(DateOfIssue);
			  	$('#certNo').html(certNo);
			  	$('#shapeCode').html(ShapeCode);
			  	$('#carat').html(Carat + ' ct');
			  	$('#colourGrade').html(ColourGrade);
			  	$('#clarityCode').html(ClarityDescription);
			  	$('#proportionsDescription').html(ProportionsDescription);
			  	$('#polishDescription').html(PolishDescription);
			  	$('#symmetryDescription').html(SymmetryDescription);
			  	$('#fluorescenceDescription').html(FluorescenceDescription);
			  	$('#measurements').html(Measurements);
			  	$('#girdleDescription').html(GirdleDescription);
			  	$('#culetDescription').html(CuletDescription);
			  	$('#totalDepthDescription').html(TotalDepthDescription);
			  	$('#tableWidthDescription').html(TableWidthDescription);
			  	$('#crownHeightDescription').html(CrownHeightDescription);
			  	$('#pavilionDepthDescription').html(PavilionDepthDescription);
			  	$('#lengthHalvesCrownDescription').html(LengthHalvesCrownDescription);
			  	$('#lengthHalvesPavilionDescription').html(LengthHalvesPavilionDescription);
			  	$('#sumabDescription').html(SumabDescription);
			  	$('#inscription').html(Inscription);
			  	$('#remark').html(Remark);
			  	
		    	$scope.createLog(certNo);
		  	}
		});
		
  	}

  	$scope.getJewellery = function(yql, certNo){
  		$scope.showJewellery = false;
  		$ionicScrollDelegate.scrollTop();
  		$.getJSON(yql, function (data) {
			var xmlDoc = $.parseXML(data.results[0]),
				$xml = $( xmlDoc ),
			  	Description = $xml.find( "Description > Value" ).text(),
			  	AmountDiamonds = $xml.find( "AmountDiamonds > Value" ).text(),
			  	PdfUrl = $xml.find( "PdfUrl" ).text(),
			  	ReportNumber = $xml.find( "ReportNumber" ).text(),
			  	Remarks = $xml.find( "Remarks > Value" ).text();
			  	var jewelleryOutput = "";
			  	if(ReportNumber == ""){
			  		alert('Record not found!');
			  		$state.go($state.current, {}, {reload: true});
			  		return;
			  	}else{
				  	$xml.find( "Details" ).children().each(function(){
				  		var $this = $(this);
			  			var quantity = $this.find('Quantity').text();
			  			var shape = $this.find('Shape').text();
			  			var carat = $this.find('Carat').text();
			  			var colourGrade = $this.find('ColourGrade').text();
			  			var measurements = $this.find('Measurements').text();
			  			var clarityGrade = $this.find('ClarityGrade').text();
			  			var symmetry = $this.find('Symmetry').text();
			  			var setting = $this.find('Setting').text();
				  		jewelleryOutput = jewelleryOutput + '<div class="row "><div class="col"><br><h4 class="positiveColor">'+quantity+' Diamond(s)</h4></div></div> <div class="row "><div class="col leftPad lineBottom"><h5>Shape:</h5></div><div class="col lineBottom">'+shape+'</div></div><div class="row "><div class="col leftPad lineBottom"><h5>Carat (weight):</h5></div><div class="col lineBottom">'+carat+'</div></div><div class="row "><div class="col leftPad lineBottom"><h5>Measurements:</h5></div><div class="col lineBottom">'+measurements+'</div></div><div class="row "><div class="col leftPad lineBottom"><h5>Colour Grade:</h5></div><div class="col lineBottom">'+colourGrade+'</div></div><div class="row "><div class="col leftPad lineBottom"><h5>Clarity  Grade:</h5></div><div class="col lineBottom">'+clarityGrade+'</div></div><div class="row "><div class="col leftPad lineBottom"><h5>Symmetry:</h5></div><div class="col lineBottom">'+symmetry+'</div></div><div class="row "><div class="col leftPad lineBottom"><h5>Setting:</h5></div><div class="col lineBottom">'+setting+'</div></div>' ;
			  			$('#jewelleryOutput').html(jewelleryOutput);
				  	});
				  	
				  	
				  	$('#amountDiamonds').html(AmountDiamonds);
				  	$('#jremarks').html(Remarks);
				  	$('#jReportNumber').html(ReportNumber);
				  	if(PdfUrl != ""){
				  		$('#pdfurl').attr('data-url', PdfUrl);
				  		$('#pdfurl').fadeIn();
				  	}
				  	$('#description').html('<strong>Description: </strong>' + Description);

			  	}
			  	
		});
		$scope.createLog(certNo);
  	}

  	$scope.download = function(){
  		var url = $('#pdfurl').data('url');
  		window.open(url, '_system', 'location=yes'); return false;
  	}
  	
  	$scope.setCertificate = function(certNo){
  		site = 'https://ws1.hrdantwerp.com/index.php?id=46&number='+certNo+'&auth=CtBCNYwffc';
		var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';
		var firstLetter = "";
		firstLetter = certNo.charAt(0);
		if( firstLetter === "J"){
			$scope.getJewellery(yql, certNo);
		}else{
			$scope.getDiamond(yql, certNo);
		}
		
  	};

  
});
