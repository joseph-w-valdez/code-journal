
var $form = document.querySelector('form');
function handleSubmit(event) {
  var entry = {};
  event.preventDefault();
  entry.title = $title.value;
  entry.photoUrl = $photoUrl.value;
  entry.notes = $notes.value;
  entry.entryId = data.nextEntryId;
  data.nextEntryId = data.nextEntryId + 1;
  data.entries.unshift(entry);
  $previewImage.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', handleSubmit);

var $title = document.querySelector('#title');
var $photoUrl = document.querySelector('#photo');
var $notes = document.querySelector('#notes');

var $previewImage = document.querySelector('img');
function handlePreview(event) {
  $previewImage.setAttribute('src', $photoUrl.value);
}
$photoUrl.addEventListener('input', handlePreview);

function renderEntry(entry) {
  var newLi = document.createElement('li');
  var newRow = document.createElement('div');
  var newImg = document.createElement('img');
  var newImgUrl = entry.photoUrl;
  var newColumnFirstHalf = document.createElement('div');
  var newColumnSecondHalf = document.createElement('div');
  var newH2 = document.createElement('H2');
  var newTitle = entry.title;
  var newP = document.createElement('p');
  var newNotes = entry.notes;

  newRow.setAttribute('class', 'row');
  newLi.appendChild(newRow);
  newColumnFirstHalf.setAttribute('class', 'column-half');
  newImg.setAttribute('src', newImgUrl);
  newColumnFirstHalf.appendChild(newImg);
  newColumnSecondHalf.setAttribute('class', 'column-half');
  newH2.textContent = newTitle;
  newP.textContent = newNotes;
  newColumnSecondHalf.appendChild(newH2);
  newColumnSecondHalf.appendChild(newP);
  newRow.appendChild(newColumnFirstHalf);
  newRow.appendChild(newColumnSecondHalf);

  return newLi;
}

document.addEventListener('DOMContentLoaded', handleEntryRenders);

function handleEntryRenders(event) {
  var $ul = document.querySelector('ul');
  for (let entry = 0; entry < data.entries.length; entry++) {
    var $singleEntry = renderEntry(data.entries[entry]);
    $ul.appendChild($singleEntry);
  }
}

var $views = document.querySelectorAll('[data-view]');
var $entries = document.querySelector('[data-view="entries"]');
var $entryForm = document.querySelector('[data-view="entry-form"]');

/* function toggleNoEntries() {
  if ($entries.matches('.hidden')) {
    $entries.classList.remove('hidden');
  } else {
    $entries.classList.add('hidden');
  }
} */

function viewSwap(currentView) {
  for (let viewNode = 0; viewNode < $views.length; viewNode++) {
    if (currentView === $views[viewNode]) {
      $views[viewNode].classList.remove('hidden');
      data.view = $views[viewNode].getAttribute('data-view');
    } else {
      $views[viewNode].classList.add('hidden');
    }
  }
}

var entriesView = document.querySelector('.entriesView');
entriesView.addEventListener('click', handleViewSwap);

function handleViewSwap(event) {
  event.preventDefault();
  if (event.target.matches('.entriesView')) {
    viewSwap($entries);
  } else {
    viewSwap($entryForm);
  }

}
