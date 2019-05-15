
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const toDo = document.getElementById('item');

//les classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//les variables
let LIST, id;
//let LIST = [];
//let id = 1;

//get item from localstorage
let data = localStorage.getItem("ToDo");

//check if data isn't empty
if (data) {
	LIST = JSON.parse(data);
	id = LIST.lengthr; //set the id to the last one in the list
	loadList(LIST); // load the list to the user interface
}else{
	//if data is empty
	LIST = [];
	id = 0;
}

//load items to the user's interface
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	});
}

//Afficher date d'aujourd'hui
const options = {weekday : "long", month: "short", day: "numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US",options);

//2em methode de date
/*var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
dateElement.write(today);*/

//Fonction addToDo
function addToDo(toDo, id, done, trash){
	if(trash){return;}
	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";

	const position = "beforeend";
	const item = `
				<li class="item">
					<i class="fa ${DONE} co" job="complete" id="0"></i>
					<p class="text ${LINE}">${toDo}</p>
					<i class="fa fa-trash-o de" job="delete" id="0"></i>
				</li>
				 `;
	list.insertAdjacentHTML(position, item);
}
//addToDo("test", 1, true, false );

//Ajouter ToDo avec entrée
document.addEventListener("keyup", function(event){
	if(event.keyCode == 13){

		//is input n'est pas vide
		if(toDo){
			addToDo(toDo.value, id, false, false);

			LIST.push({
				name : toDo.value,
				id : id,
				done : false,
				trash : false
			});

			//add item to localstorage (this code must be added where the LIST array updated)
			localStorage.setItem("ToDo", JSON.stringify(LIST));
			//location.reload();

			id++;
		}
		toDo.value = "";
		
	}
});

//complete to do
function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.getElementsByClassName("text")[0].classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;

	//add item to localstorage (this code must be added where the LIST array updated)
	localStorage.setItem("element", JSON.stringify(LIST));
}
 
//supprimer to do
function removeToDo(element){
	var element = document.getElementsByClassName("item")[0];
	element.parentNode.removeChild(element);

	//LIST[element].trash= LIST[element].trash ? false : true;

	//remove item from localStorage
	//localStorage.removeItem("element");
}

//cocher et supprimer dynamiquement
list.addEventListener("click", function(event){
	const element = event.target;
	const elementJob = element.attributes.job.value;

	if(elementJob == "complete"){
		completeToDo(element);

		//add item to localstorage (this code must be added where the LIST array updated)
		localStorage.setItem("element", JSON.stringify(LIST));

	}else if(elementJob == "delete"){
		removeToDo(elementJob);

		//remove item from localStorage
		localStorage.removeItem("element");
	}else{
		void(0);
	}

	
});

//actualiser
// clear = document.getElementsByClassName(".clear");
const clear = document.querySelector(".clear");
clear.addEventListener("click", function(){
	localStorage.clear();
	location.reload();
});