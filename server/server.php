<?php

use Workerman\Worker;

require 'vendor/autoload.php';

// Create a Websocket server
$ws_worker = new Worker('websocket://192.168.128.1:2346');

// Emitted when new connection come
$ws_worker->onConnect = function ($connection) {
    /**
     * @var $connection Workerman\Connection\TcpConnection
     */
    echo "New connection ";
    print_r("username: " . $connection->worker->user . "\n");
};

// Emitted when data received
$ws_worker->onMessage = function ($connection, $data) use ($ws_worker) {
    // Send hello $data
    //$connection->send($data);
    foreach ($ws_worker->connections as $connection) {
        $connection->send($data);
    }
};

// Emitted when connection closed
$ws_worker->onClose = function ($connection) {
    /**
     * @var $connection Workerman\Connection\TcpConnection
     */
    echo "Connection closed ";
    print_r("username: " . $connection->worker->user . "\n");
};

// Run worker
Worker::runAll();