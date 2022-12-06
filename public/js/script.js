var checkboxes = document.querySelectorAll('.checkbox');
var count = 0;
//select all checkboxes and return count of the checked goals
document.getElementById('select-all').onclick = function() {
    count = 0;
    for(var checkbox of checkboxes) {
        checkbox.checked = this.checked;
        if(checkbox.checked == true){
            count++;
            document.getElementById('selected').innerHTML = count;
        } else {
            count = 0;
            document.getElementById('selected').innerHTML = count;
        }
    }
}
//for each individual checkbox
for(var i =0; i<checkboxes.length; i++){
    checkboxes[i].addEventListener('click', function(){
        //make sure that the checkbox is checked or not
        if(this.checked == true){
            count++;
        }
        else {
            count++;
        }
        document.getElementById('selected').innerHTML = count ;
    })
}
