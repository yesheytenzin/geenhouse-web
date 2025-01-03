import mqtt from "mqtt";

const client = mqtt.connect({
  host: "10.42.0.1",
  username: "nextjs",
  password: "nextjs"
});


// Export the MQTT client if needed
export default client;
