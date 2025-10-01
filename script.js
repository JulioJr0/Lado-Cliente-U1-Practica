const form = document.querySelector("form");
        let inputForm = document.querySelector("form input[type=text]");
        const table = document.querySelector("table tbody");
        const tableRows = document.querySelector("table");
        let labelErroresForm = document.getElementById("erroresFormulario");
        let icono = document.querySelector("form i");
        const tbody = document.querySelector("tbody");
        let promedio = document.querySelector("footer h1");
        let label = document.getElementById("erroresTabla");
        let input;

        document.addEventListener("DOMContentLoaded", function(){
            Promedio();
        });
        //Agregar alumno evento
        const buttonAdd = document.querySelector("form input[type=button]")
        .addEventListener("click", function(){
            if (!inputForm.value) {
                    inputForm.classList.add("equivocado");
                    labelErroresForm.innerHTML = '<i class="fas fa-exclamation-circle visible"></i> "Escribe un nombre"';
                    inputForm.focus();
            }else{
                inputForm.classList.remove("equivocado");
                labelErroresForm.innerHTML = "";
                if (ValidarNombre()) {
                    AgregarAlumno();
                    Promedio();
                }
                
            }
        });
        function Promedio(){
            const tr = document.querySelectorAll("tbody tr");
            //Promedio
                let suma = 0;
                for (const td of tr) {
                    // console.log(td.cells[1]);
                    if (td.cells[1].textContent.trim() == "") {
                        label.innerHTML = `<i class="fas fa-exclamation-circle"></i> "Todos los campos deben contener una calificación válida".`;
                        promedio.innerHTML = `<i class="fas fa-exclamation-circle"></i> "Todos los campos deben contener una calificación válida".`;
                        return false;
                    }else if(td.cells[1].textContent < 0 || td.cells[1].textContent > 100){
                        // console.log(td.cells[1].textContent);
                        label.innerHTML = `<i class="fas fa-exclamation-circle"></i> "Inserte una calificación de 0 a 100".`;
                        promedio.innerHTML = `<i class="fas fa-exclamation-circle"></i> "Inserte una calificación de 0 a 100".`;
                        return false;
                    }
                    suma = suma + Number(td.cells[1].textContent);
                    if (td.cells[1].textContent >=70) {
                        td.closest("TR").classList.remove("reprobado");
                        td.closest("TR").classList.add("aprobado");
                        td.cells[2].textContent = "Aprobado";
                    }else{
                        td.closest("TR").classList.remove("aprobado");
                        td.closest("TR").classList.add("reprobado");
                        td.cells[2].textContent = "Reprobado";
                    }                        
                }
                promedio.textContent = `Promedio: ${(suma / (tableRows.rows.length - 1)).toFixed(2)}`;
                label.textContent = "";
                return true;
                //1000 - 100%
                //760  -  ?
        }
        function Estatus(){

        }
        function ValidarNombre(){
            if (table.querySelector("input") && table.querySelector("input").type == "text") {
                // console.log(table.querySelector("input").type);
                for (let r = 1; r < tableRows.rows.length; r++) {
                    if (tableRows.rows[r].cells[0].textContent.trim() == input.value.trim()){
                        label.innerHTML = '<i class="fas fa-exclamation-circle visible"></i> "Este nombre ya está registrado, porfavor escriba un nuevo nombre."';
                        input.focus();
                        return false;
                    }else if(tableRows.rows[r].cells[0].textContent == ""){
                        label.innerHTML = '<i class="fas fa-exclamation-circle visible"></i> "El campo no puede estar vacío."';
                    }
                }
                return true;
            }
            for (let r = 1; r < tableRows.rows.length; r++) {
                    if (tableRows.rows[r].cells[0].textContent.trim() == inputForm.value.trim()) {
                        inputForm.classList.add("equivocado");
                        labelErroresForm.innerHTML = '<i class="fas fa-exclamation-circle visible"></i> "Este nombre ya está registrado, porfavor escriba un nuevo nombre."';
                        inputForm.focus();
                        return false;
                    }
                    // else if(tableRows.rows[r].cells[0].textContent == ""){
                    //     labelErroresForm.innerHTML = '<i class="fas fa-exclamation-circle visible"></i> "El campo no puede estar vacío."';
                    // }
                }
                return true;
        }
        function AgregarAlumno(){
            //Agregar alumno a la tabla
                let tr = document.createElement("tr");
                for (let i = 0; i < 4; i++) {
                    let td = document.createElement("td");
                    if (i==0) {
                        td.textContent = inputForm.value;
                    }else if(i==3){
                        let icono = document.createElement("i");
                        icono.classList.add("fas", "fa-trash");
                        td.appendChild(icono);
                    }else{
                        td.textContent = "";
                    }
                    tr.appendChild(td);
                }
                table.appendChild(tr);
                inputForm.value = "";
        }
        //Eliminar Alumno evento
        tbody.addEventListener("click", function(e){
            let trash = e.target;
            if (trash.classList.contains("fas")) {
                trash.closest("TR").remove();
            }
        });
        //Editar
        tbody.addEventListener("dblclick", function(e){
            let td = e.target
            inputs = tbody.querySelectorAll("input");
            // input = table.querySelector("input");
            if (inputs.length > 0) {
                return
            }
            if (td.querySelector("input")) {
                return;
            }
            if (td.tagName == "TD" && td.tagName != "I") {
                if (td.cellIndex == 0) {
                    input = document.createElement("input");
                    input.type = "text";
                    input.maxLength = 50;
                    input.value = td.textContent;
                    input.classList.add("provisional");

                    td.textContent = "";
                    td.appendChild(input);
                    td.classList.add("sinInput")
                    input.focus();


                    // console.log(td);
                }else if(td.cellIndex == 1){
                    input = document.createElement("input");
                    input.type = "number";
                    input.max = 100;
                    input.min = 0;
                    input.step = 1;
                    input.value = td.textContent;
                    input.classList.add("provisional");

                    td.textContent = "";
                    td.appendChild(input);
                    td.classList.add("sinInput");
                    input.focus();

                    // console.log(td);
                }
            }
        });
        //Desaparecer input
        document.addEventListener("click", function(e){
            input = tbody.querySelector("input");
            if (!e.target.classList.contains("provisional") && input && input.type == "text") {
                // console.log(table.querySelector("input"));
                if (ValidarNombre()) {
                    let td = input.parentNode;
                    td.textContent = input.value;
                    td.classList.remove("sinInput");
                    input.remove(); 
                    
                    Promedio();
                    return;
                }
            }
            
            if(input && !e.target.classList.contains("provisional") && input.type == "number"){
                if (input.value > 100 || input.value < 0) {
                         //
                         if(input.value == ""){
                            label.innerHTML = `<i class="fas fa-exclamation-circle"></i> "Todos los campos deben contener una calificación válida".`;
                        promedio.innerHTML = `<i class="fas fa-exclamation-circle"></i> "Todos los campos deben contener una calificación válida".`;
                         }else{
                            label.innerHTML = `<i class="fas fa-exclamation-circle"></i> "Inserte una calificación de 0 a 100".`;
                        promedio.innerHTML = `<i class="fas fa-exclamation-circle"></i> "Inserte una calificación de 0 a 100".`;
                         }
                        
                         return;
                     }else{
                        let td = input.parentNode;
                        td.textContent = input.value;
                        td.classList.remove("sinInput");
                        input.remove(); 
                         Promedio();
                     }
            }
            inputForm = document.querySelector("form input[type=text]");
            if (inputForm.value && e.target.tagName != "INPUT") {
                    inputForm.classList.remove("equivocado");
                    labelErroresForm.innerHTML = "";
                    return;
            }else if(!inputForm.value){
                    inputForm.classList.remove("equivocado");
                    labelErroresForm.innerHTML = "";
                    return;
            }
            if (e.target.tagName != "INPUT") {
                return
            }
        });