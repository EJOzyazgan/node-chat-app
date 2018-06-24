let socket = io();

socket.on('connect', function() {
    console.log("Connected to server");
});

socket.on('disconnect', function() {
    console.log("Disconnected from server");
});

socket.on('newMessage', function (message) {
    let formattedTime = moment(message.createdAt).format("h:mm a");
    let template = jQuery('#messageTemplate').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format("h:mm a");
    let template = jQuery('#locationMessageTemplate').html();
    let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function(e) {
   e.preventDefault();

   let messageTextbox = jQuery('[name=message]');

   socket.emit('createMessage', {
       from: 'User',
       text: messageTextbox.val()
   }, function () {
       messageTextbox.val('')
   });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(navigator.geolocation){
        return alert("Geolocation not supported on your browser.");
    }

    locationButton.attr('disabled', 'disabled').text("Sending Location...");

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text("Send Location");
        alert("Unable to fetch location");
    });
});