
var welcomeView = document.getElementById('welcome');
var contentView = document.getElementById('content');
var iframe = document.getElementById('remoteView');
var error = document.getElementById('error');

function showWelcome() {
    welcomeView.style.display = 'flex';
    contentView.style.display = 'none';
}

function showError(message) {
    error.innerText = message;

    welcomeView.style.display = 'flex';
    contentView.style.display = 'none';
}

function showApp() {
    welcomeView.style.display = 'none';
    contentView.style.display = 'flex';
}

iframe.addEventListener('load', function (e) {
    console.log('iframe has loaded', e);

    if (iframe.contentWindow.origin !== 'null') {

        // Add logout hook
        iframe.contentWindow.Guacamoly.Core.onLogout = function () {
            console.log('On logout');
            showWelcome();
        };

        showApp();
    } else {
        showError('Cannot connect');
    }
});

iframe.addEventListener('error', function (e) {
    console.log('iframe error', e);
});

document.getElementById('connectButton').addEventListener('click', function (e) {
    error.innerText = '';

    // try to normalize the url and enforce https
    iframe.src = 'https://' + document.getElementById('serverUrl').value.replace(/^.*:\/\//, '');
});

showWelcome();
