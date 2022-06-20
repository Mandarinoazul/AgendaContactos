
var selectedRow = null

function onFormFind(){
    const request = fetch("http://www.raydelto.org/itla/agenda", options); 
    then(response => response.text())
    .then(data => {
        const json = JSON.parse(data);
        if (validate()) {
            var formData = readFormData();
            if (selectedRow == null)
                insertNewRecord(formData);
            else
                updateRecord(formData);
            resetForm();
        };
    });
};

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["Nombre"] = document.getElementById("Nombre").value;
    formData["Apellido"] = document.getElementById("Apellido").value;
    formData["Telefono"] = document.getElementById("Telefono").value;
    formData["Email"] = document.getElementById("Email").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("Usuarios").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.Nombre;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.Apellido;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.Telefono;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.Email;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("Nombre").value = "";
    document.getElementById("Apellido").value = "";
    document.getElementById("Telefono").value = "";
    document.getElementById("Email").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("Nombre").value = selectedRow.cells[0].innerHTML;
    document.getElementById("Apellido").value = selectedRow.cells[1].innerHTML;
    document.getElementById("Telefono").value = selectedRow.cells[2].innerHTML;
    document.getElementById("Email").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.Nombre;
    selectedRow.cells[1].innerHTML = formData.Apellido;
    selectedRow.cells[2].innerHTML = formData.Telefono;
    selectedRow.cells[3].innerHTML = formData.Email;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("Usuarios").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("Nombre").value == "") {
        isValid = false;
        document.getElementById("NombreValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("NombreValidationError").classList.contains("hide"))
            document.getElementById("NombreValidationError").classList.add("hide");
    }
    return isValid;
}