export var HEADER_OBJECT = new Headers({
    'Authorization': window.sessionStorage.getItem('token'),
    'Content-Type': 'application/x-www-form-urlencoded'
});
