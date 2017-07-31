var downloadURL = "";

$(document).ready(function(){

	document.getElementById('file').addEventListener('change', uploadResume, false);





 	$( "#form" ).validate( {
				errorClass: "ui-state-error",
				rules: {
					name: "required",
					email: {
						required: true,
						email: true
					},
					mobile: {
						required: true
					
					},
					institution: {
						required: true
						
					} ,
					discipline : {
						required : true
					},
					location : {
						required : true
					},

					resumeURL : {
						required : true

					},

					resumeURL_meta : {
						required : true
					},

					answer1 :{
						required  : true
					},
                  
					answer2 : {
						required : true
					}
				},
				messages: {
					name : "Please enter your name",
					email: {
						required: "Please enter your email",
						email: "Please enter a valid email"
					},
					mobile: {
						required: "Please enter your Mobile Number"
						
					},
					institution: {
						required: "Please enter a Institution"
						
					},

					location : {
						required : "Please enter your location"
					},

					year : {
						required : "Please enter your Year of Studying"
					},

					answer1 : {
						required : "This answer is required"
					},

					resumeURL : {
						required : "Please Upload your Resume(PDF format)"
					},
					resumeURL_meta : {
						required : "Please Upload your Resume(PDF format)"
					},
                     answer1 : {
						required : "This answer is required"
					},


					answer2 : {
						required : "This answer is required"
					}


				},

				submitHandler : function(){

					if($('#resumeURL').val()=="" || $('#resumeURL').val()==null ){
					alert("Upload ypur Resume");
                }
                  else{
                  	form.submit();
                  }
		}
				
  });
});


function uploadResume(evt) {
	// File or Blob named mountains.jpg

 var storageRef = firebase.storage().ref();
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];

      console.log(file.type);

    if(file.type != 'application/pdf'){

    	$('#progress').html('Only PDFs are allowed');
    	return;
    }

// Create the file metadata
  var metadata = {
        'contentType': file.type
      };




// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('resumes/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    $('#progress').html('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
         $('#progress').html('Upload Paused ');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
       $('#progress').html("unauthorized");
      break;

    case 'storage/canceled':
      $('#progress').html("unauthorized");
      break;

    case 'storage/unknown':
      $('#progress').html("Unknown error");
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
    downloadURL = uploadTask.snapshot.downloadURL;
     $('#resumeURL_meta').val(downloadURL);
  $('#resumeURL').val(downloadURL);
   return downloadURL;
});

   

  }  