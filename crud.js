
// Operation switch
var operation_switch = 'SELECT'

// Get static HTML elements
var p_select = document.getElementById("p_select");
var input_name = document.getElementById("input_name");
var input_age = document.getElementById("input_age");
var input_phone = document.getElementById("input_phone");
var button_new = document.getElementById("button_new");
var button_create = document.getElementById("button_create");
var button_remove = document.getElementById("button_remove");
var button_update = document.getElementById("button_update");
var p_status = document.getElementById("status");
var select_name = '';

loadSelect();

init_DOM();

function loadSelect() {

    // Compose URL
    var names_endpoint = "/api/crud/names"

    var html_select = '<select id="select_name" size="4">';
    axios.get( names_endpoint )

	.then(function (response) {
	    // handle success
	    data = response.data;
	    data['names'].forEach((name) => {
		html_select += '<option value="'+name+'">'+name+'</option>\n';
	    });
	})

	.catch(function (error) { // handle error
	    p_status.innerHTML = "ERROR: "+error;
	})

	.finally(function () { // always executed
	    
	    html_select += '</select>\n';
	    p_select.innerHTML = html_select;
	    select_name = document.getElementById("select_name");
	    select_name.addEventListener( "change", loadRecord );
	    
	});
    
    
}

function init_DOM() {

    // Add DOM listeners
    input_name.addEventListener( "change", checkFormCreate );
    input_age.addEventListener( "change", checkFormCreate );
    input_phone.addEventListener( "change", checkFormCreate );
    button_new.addEventListener( "click", clearForm );
    button_create.addEventListener( "click", submitCreate );
    button_remove.addEventListener( "click", submitRemove );
    button_update.addEventListener( "click", submitUpdate );
    
}

function loadRecord() {

    operation_switch = 'SELECTED';
    enableButtons();
    
    // Compose URL
    var fetch_endpoint = "/api/crud/fetch"

    form_data = { 'name':select_name.value };

    axios.post( fetch_endpoint, form_data )  

	.then(function (response) {
	    // handle sucess	    
	    data = response.data;
	    input_name.value = data['name'];
	    input_age.value = data['age'];
	    input_phone.value = data['phone'];
	    p_status.innerHTML = data['message']
	})
    
	.catch(function (error) { // handle error
	    p_status.innerHTML = "ERROR: "+error;
	})
    
	.finally(function () {
	    // always executed
	});
}

function clearForm() {
    operation_switch = 'SELECT';
    enableButtons();
    input_name.value = '';
    input_age.value = '';
    input_phone.value = '';
    select_name.value = '';
    p_status.innerHTML = "Waiting action.";
}

function submitUpdate() {

    // Compose URL
    var update_endpoint = "/api/crud/update"
    
    var form_data = {};
    form_data['name']=select_name.value;
    form_data['new_name']=input_name.value;
    form_data['new_age']=input_age.value;
    form_data['new_phone']=input_phone.value;

    axios.post( update_endpoint, form_data )  

	.then(function (response) {
	    // handle sucess	    
	    data = response.data;
	    p_status.innerHTML = data['message']
	})
    
	.catch(function (error) {
	    // handle error
	    p_status.innerHTML = "ERROR: "+error;
	})
    
	.finally(function () {
	    // always executed
	});

    clearForm();
    operation_switch = 'SELECT';
    enableButtons();
    loadSelect();
    loadSelect();
    loadSelect();
    loadSelect();
    
}

function submitRemove() {

    operation_switch = 'SELECT';
    enableButtons();
    
    // Compose URL
    var remove_endpoint = "/api/crud/remove"

    form_data = { 'name':select_name.value };

    axios.post( remove_endpoint, form_data )  

	.then(function (response) {
	    // handle sucess	    
	    data = response.data;
	    p_status.innerHTML = data['message']
	})
    
	.catch(function (error) { // handle error
	    p_status.innerHTML = "ERROR: "+error;
	})
    
	.finally(function () {
	    // always executed
	});

    loadSelect();
    loadSelect();
    loadSelect();
    loadSelect();
    clearForm();
}

function submitCreate() {

    // Compose URL
    var create_endpoint = "/api/crud/create"
    
    p_status.innerHTML = "Submitting form...<img width=13 src=/images/activity_indicator.gif>";

    var form_data = {};
    form_data['name']=input_name.value;
    form_data['age']=input_age.value;
    form_data['phone']=input_phone.value;

    axios.post( create_endpoint, form_data )  

	.then(function (response) {
	    // handle sucess	    
	    data = response.data;
	    p_status.innerHTML = data['message']
	})
    
	.catch(function (error) {
	    // handle error
	    p_status.innerHTML = "ERROR: "+error;
	})
    
	.finally(function () {
	    // always executed
	});

    clearForm();
    operation_switch = 'SELECT';
    enableButtons();
    loadSelect();
    loadSelect();
    
}

function checkFormCreate() {

    if (operation_switch == 'SELECT') {
	operation_switch = 'CREATE';
    }
    else if (operation_switch == 'SELECTED') {
	operation_switch = 'UPDATE';

    }
    enableButtons();
  
}

function enableButtons() {

    if (operation_switch == 'SELECT') {
	
	button_new.disabled = true;
	button_create.disabled = true;
	button_remove.disabled = true;
	button_update.disabled = true;

    }

    else if (operation_switch == 'SELECTED') {
	
	button_new.disabled = false;
	button_create.disabled = true;
	button_remove.disabled = false;
	button_update.disabled = true;

    }

    else if (operation_switch == 'CREATE') {
	
	button_new.disabled = false;
	button_remove.disabled = true;
	button_update.disabled = true;

	if ( input_name.value.length > 0 && input_age.value.length > 0 && input_phone.value.length > 0 ) {
	    p_status.innerHTML = "Ready to create new record."
	    button_create.disabled = false;
	    button_create.focus();
	}
	else
	    button_create.disabled = true;

    }

    else if (operation_switch == 'UPDATE') {
	
	button_new.disabled = false;
	button_create.disabled = true;
	button_remove.disabled = true;

	if ( input_name.value.length > 0 && input_age.value.length > 0 && input_phone.value.length > 0 ) {
	    p_status.innerHTML = "Ready to update."
	    button_update.disabled = false;
	    button_update.focus();
	}
	else
	    button_update.disabled = true;

    }

    
}
