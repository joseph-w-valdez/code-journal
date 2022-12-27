var $submit = document.querySelector('button');
function handleSubmit(event) {
  event.preventDefault();
}
$submit.addEventListener('submit', handleSubmit);

var $photoUrl = document.querySelector('#photo');
var $previewImage = document.querySelector('img');
function handlePreview(event) {
  event.preventDefault();
  $previewImage.setAttribute('src', $photoUrl.value);
}
$photoUrl.addEventListener('input', handlePreview);
