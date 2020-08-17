
let file_size = 0;

let num_file = 0;

let total_size = 101;

let cur_size = 0;

let cur_alloc = [];

var color      = ['red', 'green', 'yellow', 'orange', 'blue', 'grey', 'pink', 'indigo', 'cyan', 'light-green', 'amber', 'brown', 'purple', 'blue', 'lime', 'orange', 'grey'];


function addFile() {
    file_size = parseInt(document.getElementById('file-size').value);
    if(file_size == "") return false;
    console.log(file_size);
    console.log(cur_size);
    console.log(cur_alloc);
    if(file_size > total_size - cur_size) {
        alert("Not enough storage");
    } else {
        if(cur_alloc.length == 0) {
            let temp = document.getElementById('disk');
            temp.innerHTML += '<div class="blk0"></div>';
            let width = file_size / 100 * document.getElementById('disk').offsetWidth;
            let bckclr = color[cur_alloc.length];
            $('.blk0').css({'background-color': bckclr, 'width': width +'px', 'height': '64px'}) ;
            cur_alloc.push([0, width]);
            cur_size += file_size;
            cur_spot = width;
            num_file++;
        } else {
            var bckclr1 = color[cur_alloc.length];
            console.log(bckclr1);
            let width = file_size / 100 * document.getElementById('disk').offsetWidth;
            let temp = document.getElementById('disk');
            let margn = cur_size / 100 * document.getElementById('disk').offsetWidth;
            temp.innerHTML += '<div id="blk' + num_file + '" style="background-color: '+bckclr1+'; width: '+width+'px; height: 64px; margin-left: '+ margn +'px;"></div>';
            // $('#blk'+num_file).css({'width': width +'px', 'height': '64px', 'margin-left': margn});
            // $('#blk'+num_file).css({'background-color': bckclr,});
            console.log(document.getElementById('disk'));

            // document.getElementById('#blk'+num_file).style.backgroundColor = "black";
            console.log(document.getElementById('disk'));
            cur_size += file_size;
            cur_spot = width;
            num_file++;
            cur_alloc.push([[cur_alloc[num_file - 1]][1], width]);
        }
        
    }



}