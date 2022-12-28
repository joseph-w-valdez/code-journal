
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
  var newP = document.createElement('p');

  newRow.setAttribute('class', 'row');
  newLi.appendChild(newRow);
  newColumnFirstHalf.setAttribute('class', 'column-half');
  newImg.setAttribute('src', newImgUrl);
  newColumnFirstHalf.appendChild(newImg);
  newColumnSecondHalf.setAttribute('class', 'column-half');
  newColumnSecondHalf.appendChild(newH2);
  newColumnSecondHalf.appendChild(newP);
  newRow.appendChild(newColumnFirstHalf);
  newRow.appendChild(newColumnSecondHalf);

  return newLi;
}

document.addEventListener('DOMContentLoaded', renderEntry);
