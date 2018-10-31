var connectionString = 'HostName=alexrasiotdemo.azure-devices.net;DeviceId=Device1;SharedAccessKey=9oOHhqkuIlj7jwV6WYUNm0CVb2TvqMj1QHy6YXnLMos=';

// Using the Node.js Device SDK for IoT Hub:
//   https://github.com/Azure/azure-iot-sdk-node
// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
var Mqtt = require('azure-iot-device-mqtt').MqttWs;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;


var client = DeviceClient.fromConnectionString(connectionString, Mqtt);
console.log('Client connected');
client.on('message', function (msg) {
    console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
    client.complete(msg, printResultFor('completed'));
});

// Print results.
function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var x = 37.372236;
var y = 55.452376


// Create a message and send it to the IoT hub every second
setInterval(function () {
    // Add the telemetry to the message body.
    var data = {
        "DeviceId": "test1",
        "location": {
            "type": "Point",
            "coordinates":
                [x, y]
        }
    }
	
	x = x + 0.001;
	y = y + 0.001;
	
    var dataJSON = JSON.stringify(data);
    var message = new Message(dataJSON);

    console.log('Sending message: ' + message.getData());

    client.sendEvent(message, printResultFor('send'));
}, 10000);