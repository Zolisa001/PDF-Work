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

		removeValidationError(form);

		var student = {};
		student.name = $(form).find('#name').val();
		student.start = $(form).find('#start').val();
		student.end = $(form).find('#end').val();
		student.grade = $(form).find('#grade').val();
		student.existence = true;

		var studentID = studentRoster.push(student) - 1;

		clearFields(form);

		addStudentToTable(studentID);

	} else {
		showValidationError(form);
	}	
}

function editStudent() {
	
}

function studentDataIsValid(form) {
	if (
		$(form).find('#name').val()  == '' ||
		$(form).find('#start').val() == '' ||
		$(form).find('#end').val()   == '' ||
		$(form).find('#grade').val() == ''
	) {
		return false;
	} else {
		return true;
	}
}

function showValidationError(form) {
	if ( $(form).children('.error').size() == 0 ) {
		$(form).prepend('<div class="error">Please fill in all fields</div>');
	}
}

function removeValidationError(form) {
	$(form).children('.error').remove();
}

function clearFields(form) {
	$(form).find('#name').val('');
	$(form).find('#start').val('');
	$(form).find('#end').val('');
	$(form).find('#grade').val('9');
}

function addStudentToTable(studentID) {
	
}