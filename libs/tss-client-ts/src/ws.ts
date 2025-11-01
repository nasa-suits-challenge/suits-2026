import WebSocket from 'ws';

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

  async subscribe(topic: string, onData: (json: any) => void) {
    if (!this.ws) throw new Error('Not connected');
    this.ws.on('message', (data) => {
      try {
        const json = JSON.parse(data.toString());
        if (json?.topic === topic) onData(json);
      } catch {}
    });
    this.ws.send(JSON.stringify({action: 'subscribe', topic}));
  }

  close() { this.ws?.close(); }
}
