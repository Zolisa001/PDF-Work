$(document).ready(function() {
	$('#add').click(openAddDialog);
});

function openAddDialog() {
	$('#dialog').dialog({
		title: "Add Student",
		width: 400
	});
}