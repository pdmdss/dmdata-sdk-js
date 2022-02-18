import { DMDATA } from './src';

const client = new DMDATA({
  credentials: {
    apikey: 'AKe.'
  }
});


client.socket.start({
  classifications: ['telegram.earthquake', 'telegram.scheduled', 'telegram.volcano', 'telegram.weather'],
  appName: 'test'
})
      .then(ws => {
        ws.on('ping', console.log);
        ws.on('data', console.log);
      });
