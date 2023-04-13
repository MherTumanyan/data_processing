import { Kafka, ProducerRecord } from 'kafkajs';
import { saveToPosts } from '../db';

const kafka = new Kafka({
  brokers: ['localhost:9092'],
});

const groupId = process.env.GROUP_ID || 'group-3';
const serviceTopic = process.env.SERVICE_TOPIC || 'data_processing';
const topicToSend = process.env.TOPIC_TO_SEND || 'data_mart';

const consumer = kafka.consumer({ groupId });
const producer = kafka.producer();

export const consume = async () => {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: serviceTopic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const dataMessage = JSON.parse(message.value.toString());        
        await saveToPosts(dataMessage);
        const changedData = {
          ...dataMessage,
          title: dataMessage.title.slice(0,6),
          changed: true,
          contentLength: dataMessage.body.length,
        };
        try {
          const message: ProducerRecord = {
            topic: topicToSend,
            messages: [{ value: JSON.stringify(changedData) }],
          };
          const result = await producer.send(message);
          console.log(`Produced message at ${result[0].topicName}`);
        } catch (err) {
          console.error(`Error producing message: ${err}`);
        } 
      } catch (error) {
        console.error(`Error parsing message: ${error}`);
        console.log('Raw message:', message.value.toString());
      }
    },
  });
};

consume().catch((error) => {
  console.error(`Error consuming messages: ${error}`);
});
