var studentRoster = [];

$(document).ready(function() {
	$('#add').click(openAddDialog);
	
	$('#student-form').submit(saveStudent);
});

function openAddDialog() {
	$('#dialog').dialog({
		title: "Add Student",
		width: 400
	});
}

function saveStudent() {
	var form = $(this);
	var form_action = $(form).attr('action');

	if (form_action == 'add') {
		addNewStudent(form, studentRoster);
	} else if (form_action == 'edit') {
		editStudent(form, studentRoster);
	}

	$('#dialog').dialog('close');

	return false;
}

function addNewStudent(form) {

	if ( studentDataIsValid(form) ) {
		var student = {};
		student.name = $(form).find('#name').val();
		student.start = $(form).find('#start').val();
		student.end = $(form).find('#end').val();
		student.grade = $(form).find('#grade').val();
		student.existence = true;

		studentRoster.push(student);

	} else {
		showValidationError(form);
	}	
}

function editStudent() {
	
}

function studentDataIsValid(form) {
	if (
		$(form).find('#name')  == '' ||
		$(form).find('#start') == '' ||
		$(form).find('#end')   == '' ||
		$(form).find('#grade') == ''
	) {
		return true;
	} else {
		return false;
	}
}

function showValidationError(form) {

}