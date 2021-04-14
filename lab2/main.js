document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClicked));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseover', mouseOver));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('mouseout', mouseOut));

function cellClicked (event) {
    alert(event.target.id);
}

function mouseOver (event) {
    document.getElementById(event.target.id).style.backgroundColor = "green";
}

function mouseOut (event) {
    document.getElementById(event.target.id).style.backgroundColor = "pink";
}