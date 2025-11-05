import WebSocket, { RawData } from 'ws';

export class WsClient {
  private ws?: WebSocket;
  constructor(private url: string) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);
      this.ws.once('open', () => resolve());
      this.ws.once('error', reject);
    });
  }

  async subscribe(topic: string, onData: (json: unknown) => void) {
    if (!this.ws) throw new Error('Not connected');
    this.ws.on('message', (data: RawData) => {
      try {
        const parsed = JSON.parse(data.toString()) as unknown;
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          'topic' in parsed &&
          typeof (parsed as { topic: unknown }).topic === 'string' &&
          (parsed as { topic: string }).topic === topic
        ) {
          onData(parsed);
        }
      } catch {
        // Ignore malformed frames
      }
    });
    this.ws.send(JSON.stringify({action: 'subscribe', topic}));
  }

  close() { this.ws?.close(); }
}
