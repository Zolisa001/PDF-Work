var studentRoster = [];

$(document).ready(function() {
	$('#add').click(openAddDialog);
	$('#roster .view').live('click',openViewDialog);
	$('#roster .edit').live('click',openEditDialog);
	$('#roster .delete').live('click',deleteStudent);
	
	$('#student-form').submit(saveStudent);
});

function openAddDialog() {
	$('#dialog').dialog({
		title: "Add Student",
		width: 400
	}).find('#student-form').attr('action', 'add');
}

function openEditDialog() {
	var d = $('#dialog').dialog({
		title: "Edit Student",
		width: 400
	});

	var rowID = $(this).parents('tr').attr('id');
	var student = studentRoster[rowID];

	d.find('#student-form').attr('action', 'edit');
	d.find('#name').val(student.name);
	d.find('#start').val(student.start);
	d.find('#end').val(student.end);
	d.find('#grade').val(student.grade);
	d.find('#studentID').val(rowID);
}

function saveStudent() {
	var form = $(this);
	var form_action = $(form).attr('action');

	if (form_action == 'add') {
		addNewStudent(form, studentRoster);
	} else if (form_action == 'edit') {
		updateStudent(form, studentRoster);
	}

	clearFields(form);
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

		addStudentToTable(studentID);

	} else {
		showValidationError(form);
	}	
}

function updateStudent(form) {
	if ( studentDataIsValid(form) ) {

		removeValidationError(form);

		var student = {};
		student.name = $(form).find('#name').val();
		student.start = $(form).find('#start').val();
		student.end = $(form).find('#end').val();
		student.grade = $(form).find('#grade').val();
		student.existence = true;

		var studentID = $(form).find('#studentID').val();

		studentRoster[studentID] = student;

		updateStudentRow(studentID);

	} else {
		showValidationError(form);
	}	
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
	$(form).find('#studentID').val('');
}

function addStudentToTable(studentID) {
	var student = studentRoster[studentID];

	$('#row-template').expand({
		'@id':   studentID,
		'name':  student.name,
		'term': {
			'start': student.start,
			'end':   student.end
		},
		'grade': student.grade
	}).appendTo('#roster tbody');
}

function updateStudentRow(studentID) {
	var row = $('#' + studentID);
	student = studentRoster[studentID]

	$(row).find('.name').text(student.name);
	$(row).find('.start').text(student.start);
	$(row).find('.end').text(student.end);
	$(row).find('.grade').text(student.grade);
}

function deleteStudent() {
	rowID = $(this).parents('tr').attr('id');

	// Mark as deleted. For a "real" delete method, possibly replace with null?
	studentRoster[rowID].existence = false;

	$('#' + rowID).remove();

	return false;
}

function openViewDialog() {
	console.log('started function');
	var d = $('#view-dialog').dialog({
		title: "View Student",
		width: 400
	});

	var rowID = $(this).parents('tr').attr('id');
	var student = studentRoster[rowID];

	d.find('.name').text(student.name);
	d.find('.start').text(student.start);
	d.find('.end').text(student.end);
	d.find('.grade').text(student.grade);

	return false;
}