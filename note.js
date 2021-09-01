let titles = [];
let notes = [];
let trashTitles = [];
let trashNotes = [];

// store notes in the arrays title and note
function storeNote() {
  let title = document.getElementById("title").value; //receives text from input field
  let note = document.getElementById("takeNote").value; //recieves text from textarea
  note = note.replace(/\n\r/g, "<br />"); //replace \n \r with "<br />" as notices are stored as an string
  if ((title || note) == "") {
    //leave function if title or note are empty
    return;
  }

  titles.push(title); //store title in array titles
  notes.push(note); //store note in array notes
  setArray("titles", titles); //store also under localStorage
  setArray("notes", notes); //store also under localStorage

  document.getElementById("title").value = ""; // delete input title
  document.getElementById("takeNote").value = ""; // delete input notes

  showNotes("my-notes", titles, notes); //shows update notes
}

//convert the array into a string JSON-Format and store it under localStorage
function setArray(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

//get Array
function getArray(key) {
  // Convert string into an array. If the array empty than set array = []
  return JSON.parse(localStorage.getItem(key)) || [];
}

//show notes
function showNotes(idName, array1, array2) {
  let myNotes = document.getElementById(idName); //access to div-container
  myNotes.innerHTML = ""; // delete previous div-containers

  if (idName == 'my-notes') {
    //build div-containers for each note within an div-Container
    for (i = 0; i < array2.length; i++) {
      myNotes.innerHTML += `
        <div class="new-note">
          <p class="p-size">${array1[i]}</p>
          <div class="alignDelete">
            <p class="p-width">${array2[i]}</p>
            <button id="deleteNote" onclick="deleteNote(${[i]})">Delete</button>
          </div>
        </div>
        `;
    }
  }
  else if (idName == 'my-trash-notes') {
    //build div-containers for each note within an div-Container
    for (i = 0; i < array2.length; i++) {
      myNotes.innerHTML += `
        <div class="new-note">
          <p class="p-size">${array1[i]}</p>
          <div class="alignDelete">
            <p class="p-width">${array2[i]}</p>
            <button id="restoreNote" onclick="restoreNote(${[i]})">Restore</button>
          </div>
        </div>
        `;
    }
  }
}

function showHandler(show) {
  if (show == 'note') {
    document.getElementById('my-notes').classList.remove('d-none');
    document.getElementById('inputNote').classList.remove('d-none');
    document.getElementById('my-trash-notes').classList.add('d-none');
  }
  else if (show == 'trash') {
    document.getElementById('my-notes').classList.add('d-none');
    document.getElementById('inputNote').classList.add('d-none');
    document.getElementById('my-trash-notes').classList.remove('d-none');
  }
}

function storeTrashnotes(divNo) {
  trashTitles.push(titles[divNo]); //store titles[] in array trashTitles[]
  trashNotes.push(notes[divNo]); //store note[] in array trashNotes[]
  setArray("trashTitles", trashTitles); //store also under localStorage
  setArray("trashNotes", trashNotes); //store also under localStorage
}

// delete notes
function deleteNote(divNo) {
  storeTrashnotes(divNo); //store note before delete it
  titles.splice(divNo, 1); //delete title text at point divNo
  notes.splice(divNo, 1); //delete note text at point divNo
  setArray("titles", titles); //store updated titles[]
  setArray("notes", notes); //store updated notes[]
  showNotes("my-notes", titles, notes); //shows update notes
}

// restore notes from trash
function restoreNote(divNo) {
  titles.push(trashTitles[divNo]); //restore title in array titles
  notes.push(trashNotes[divNo]); //restore note in array notes
  setArray("titles", titles); //restore also under localStorage
  setArray("notes", notes); //restore also under localStorage

  trashTitles.splice(divNo, 1); //delete title text at point divNo
  trashNotes.splice(divNo, 1); //delete note text at point divNo
  setArray("trashTitles", trashTitles); //store also under localStorage
  setArray("trashNotes", trashNotes); //store also under localStorage

  showNotes('my-trash-notes', trashTitles, trashNotes);
}

// initalize arrays
function init() {
  titles = getArray("titles");
  notes = getArray("notes");
  trashTitles = getArray("trashTitles");
  trashNotes = getArray("trashNotes");
  showNotes("my-notes", titles, notes);
}

function openIconRights() {
  document.getElementById('id-icon-rights').classList.remove('d-none');
  document.body.classList.add('hidden-content');
}

function closeIconRights() {
  document.getElementById('id-icon-rights').classList.add('d-none');
  document.body.classList.remove('hidden-content');
}