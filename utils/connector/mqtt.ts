import mqtt, { MqttClient } from 'mqtt';

interface MQTTConfig {
  host: string;
  username?: string;
  password?: string;
}

export default class MQTTService {
  private client: MqttClient | null;

  constructor(config: MQTTConfig) {
    this.client = mqtt.connect({
      host: config.host,
      username: config.username,
      password: config.password
    });
    this.client.on('message', (topic, payload) => {
      console.log(payload);
    })
  }

  public getClient(): MqttClient | null {
    return this.client;
  }

  public subscribe(topic: string, callback: (topic: string, message: Buffer) => void): void {
    if (this.client) {
      this.client.subscribe(topic, (err) => {
        if (err) {
          console.error(`Error subscribing to ${topic}:`, err);
        } else {
          console.log(`Subscribed to ${topic}`);
        }
      });

      this.client.on('message', callback);
    } else {
      console.error('MQTT client not initialized');
    }
  }

  public disconnect(): void {
    if (this.client) {
      this.client.end();
      console.log('MQTT client disconnected');
    } else {
      console.error('MQTT client not initialized');
    }
  }
}
