<template>
    
</template>
<script>
const express = require('express');
const app = express();

const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});
const ioServer = require('socket.io')(server);

ioServer.on('connection', function(socket) {

    socket.on('SEND_MESSAGE', function(data) {
          console.log(data)
       ioServer.emit('MESSAGE', data)
    });
});

const SerialPort = require('serialport')
import { getEquipmentFromBase } from '../../store/dbAPI/equipment/getEquipment'

getEquipmentFromBase().then(result => {


let scanners = []   
    result.forEach(element => {
      
      if (element.type == 'Сканер') {
        scanners.push(element)
      }
    });
    let scanner = scanners.find(equipment => equipment.active == true).settings.port


    console.log("ну он", scanner)
    const port = new SerialPort(scanner, {
      baudRate: 115200
    })

    port.on('data', function(data) {
      let string = ""

      console.log(data.length)
     
      for (let index = 0; index < data.length - 1; index++) {
        string = string + String.fromCharCode(data[index])
        if (index == (data.length - 2)) {
          var ioClient = require('socket.io-client')('http://localhost:3001');
          console.log("ну строка опять", string)
          ioClient.emit('SEND_MESSAGE', string);
        }
      }
      
    });
})
   

import ioClientVue from 'socket.io-client';
import { mdiConsoleLine } from '@mdi/js';
export default {
    name: 'scanner-com-port',
    data() {
        return {
            socket : ioClientVue('http://localhost:3001')
        }
    },
    created() {
       let app = this
        this.socket.on('MESSAGE', (data) => {
            console.log(data)
             console.log("Строка", data)
            if (data.length == 8) {
               app.$emit('scan-ean8', data)
            } else if (data.length == 13) {
               app.$emit('scan-ean13', data)
            } else if (data.length > 13) {
              app.$emit('scan-data-matrix', data)
            }
           
       });
  
    },
    mounted() {
       // this.socket.emit('SEND_MESSAGE', 'сообщ');
    },
    methods: {
    }
    

}
</script>