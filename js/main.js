
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
