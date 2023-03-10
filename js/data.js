/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', stringifyEntryValues);

function stringifyEntryValues(object) {
  var entryValuesString = JSON.stringify(data);
  localStorage.setItem('entries-data', entryValuesString);
}

var previousEntriesData = localStorage.getItem('entries-data');
if (previousEntriesData) {
  data = JSON.parse(previousEntriesData);
}
