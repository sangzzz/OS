
let file_size = 0;

let num_file = 0;

let total_size = 101;

let cur_size = 0;
let file_name = ""

// var color      = ['red', 'green', 'yellow', 'orange', 'blue', 'grey', 'pink', 'indigo', 'cyan', 'light-green', 'amber', 'brown', 'purple', 'blue', 'lime', 'orange', 'grey'];
let file_list = [];
let alloc_list = [];

function addFile() {
    file_size = parseInt(document.getElementById('file-size').value);
    file_name = document.getElementById('file-name').value;
    if(file_size == "" || file_name == "") return false;
    console.log(file_size);
    console.log(file_name);
    console.log(cur_size);
    if(file_size > total_size - cur_size || file_size > 10) {
        alert("Not enough storage");
    } else if(file_list.includes(file_name) == true){
        alert("File already present");
    } else {
        file_list.push(file_name);
        let indBlock = '' + num_file;
        console.log(indBlock);
        let tableRef = document.getElementById('indextable');
        let newRow = tableRef.insertRow(num_file);

        let newCol = newRow.insertCell(0);
        let Fn = document.createTextNode(file_name);
        newCol.appendChild(Fn);
        newCol.className = "fileName";

        let newCol1 = newRow.insertCell(1);
        let Fi = document.createTextNode(indBlock);
        newCol1.appendChild(Fi);
        newCol1.className = "indBlock";
        
        for(let fl = 0; fl < file_size; fl++) {
            while(true) {
                let trd = Math.floor(Math.random() * (100 - 10)) + 10;
                if(alloc_list.includes(trd) == false) {
                    let filnode = newRow.insertCell(2 + fl);
                    let nodeind = document.createTextNode('' + trd);
                    filnode.appendChild(nodeind);
                    alloc_list.push(trd);
                    break;
                }
            }
        }
        // temp.innerHTML += '</tr>';
        num_file++;
        cur_size += file_size;
    }



}