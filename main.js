$(document).ready(function() {
	$('#add').click(openAddDialog);

	$('#dialog #submit').click(saveStudent);
});

function openAddDialog() {
	$('#dialog').dialog({
		title: "Add Student",
		width: 400
	});
}

function saveStudent() {
	var form = $('#student-form');
	var form_action = $(form).attr('action');

	if (form_action == 'add') {
		addNewStudent();
	} else if (form_action == 'edit') {
		editStudent();
	}

	$('#dialog').dialog('close');
	$(form).preventDefault();
}

function addNewStudent() {
	var student = {};
}

function saveStudent() {
	
}