
var $form = document.querySelector('form');
function handleSubmit(event) {
  var entry = {};
  event.preventDefault();
  if (data.editing === null) {
    entry.title = $title.value;
    entry.photoUrl = $photoUrl.value;
    entry.notes = $notes.value;
    entry.entryId = data.nextEntryId;
    data.nextEntryId = data.nextEntryId + 1;
    data.entries.unshift(entry);
    $previewImage.setAttribute('src', './images/placeholder-image-square.jpg');
    $form.reset();
    var $singleEntry = renderEntry(entry);
    $ul.prepend($singleEntry);
    viewSwap('entries');
    toggleNoEntries();
  } else {
    data.editing.title = $title.value;
    data.editing.photoUrl = $photoUrl.value;
    data.editing.notes = $notes.value;
    var editedEntry = renderEntry(data.editing);
    var originalEntryEntryId = '[data-entry-id=' + '"' + data.editing.entryId + '"]';
    var originalEntry = document.querySelector(originalEntryEntryId);
    originalEntry.replaceWith(editedEntry);
    viewSwap('entries');
    data.editing = null;
    $deleteButtonText.classList.add('hidden');
    $form.reset();
    $editEntry.textContent = 'New Entry';
    $previewImage.setAttribute('src', './images/placeholder-image-square.jpg');
  }
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
  var newTitleRow = document.createElement('div');
  var newColumn90 = document.createElement('div');
  var newColumn10 = document.createElement('div');
  var newH2 = document.createElement('H2');
  var newTitle = entry.title;
  var newP = document.createElement('p');
  var newNotes = entry.notes;
  var newI = document.createElement('i');

  newRow.setAttribute('class', 'row');
  newLi.appendChild(newRow);
  newLi.setAttribute('data-entry-id', entry.entryId);
  newColumnFirstHalf.setAttribute('class', 'column-half');
  newImg.setAttribute('src', newImgUrl);
  newColumnFirstHalf.appendChild(newImg);
  newColumnSecondHalf.setAttribute('class', 'column-half');
  newH2.textContent = newTitle;
  newI.setAttribute('class', 'fa-pencil fa-solid');
  newP.textContent = newNotes;
  newColumn90.setAttribute('class', 'column-90');
  newColumn10.setAttribute('class', 'column-10');
  newTitleRow.appendChild(newColumn90);
  newTitleRow.appendChild(newColumn10);
  newColumn90.appendChild(newH2);
  newColumn10.appendChild(newI);
  newColumnSecondHalf.appendChild(newTitleRow);
  newTitleRow.setAttribute('class', 'row');
  newColumnSecondHalf.appendChild(newP);
  newRow.appendChild(newColumnFirstHalf);
  newRow.appendChild(newColumnSecondHalf);

  return newLi;
}
var $ul = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', handleEntryRenders);

function handleEntryRenders(event) {
  data.editing = null;
  for (let entry = 0; entry < data.entries.length; entry++) {
    var $singleEntry = renderEntry(data.entries[entry]);
    $ul.appendChild($singleEntry);
  }
  if (data.view) {
    var currentView = data.view;
    viewSwap(currentView);
  }
  toggleNoEntries();
}

var $views = document.querySelectorAll('[data-view]');
var $entries = document.querySelector('[data-view="entries"]');
var $entryForm = document.querySelector('[data-view="entry-form"]');

var $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if (!data.entries.length) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

function viewSwap(currentView) {
  data.view = currentView;
  for (let viewNode = 0; viewNode < $views.length; viewNode++) {
    if (currentView === $views[viewNode].getAttribute('data-view')) {
      $views[viewNode].classList.remove('hidden');
    } else {
      $views[viewNode].classList.add('hidden');
    }
  }
  $form.reset();
  $editEntry.textContent = 'New Entry';
  $previewImage.setAttribute('src', './images/placeholder-image-square.jpg');
  data.view = currentView;
}

var entriesView = document.querySelector('.entriesView');
entriesView.addEventListener('click', handleViewSwap);

var $newEntry = document.querySelector('.newEntriesButton');
$newEntry.addEventListener('click', handleViewSwap);

function handleViewSwap(event) {
  if (event.target.matches('.entriesView')) {
    viewSwap($entries.getAttribute('data-view'));
  } else if (event.target.matches('.newEntriesButton')) {
    viewSwap($entryForm.getAttribute('data-view'));
  }
}

$ul.addEventListener('click', handleEdit);
function handleEdit(event) {
  if (event.target.matches('.fa-pencil')) {
    viewSwap('entry-form');
    for (let entry = 0; entry < data.entries.length; entry++) {
      if (data.entries[entry].entryId === event.target.closest('li').getAttribute('data-entry-id') * 1) {
        data.editing = data.entries[entry];
      }
    }
    $title.value = data.editing.title;
    $photoUrl.value = data.editing.photoUrl;
    $notes.value = data.editing.notes;
    $previewImage.setAttribute('src', $photoUrl.value);
    $editEntry.textContent = 'Edit Entry';
    $deleteButtonText.classList.remove('hidden');
  }
}
var $deleteButtonText = document.querySelector('.delete-button-text');
var $editEntry = document.querySelector('.new-entry');
