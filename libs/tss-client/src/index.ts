// Minimal TSS WebSocket client (TypeScript)
export type TssMessage = Record<string, unknown>;

export class TssClient {
  private ws?: WebSocket;
  constructor(private url: string) {}

  connect(onMessage: (msg: TssMessage) => void) {
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = (e) => {
      try { onMessage(JSON.parse(e.data as string)); } catch {}
    };
    this.ws.onopen = () => console.log("[TSS] connected");
    this.ws.onclose = () => console.log("[TSS] closed");
    this.ws.onerror = (e) => console.error("[TSS] error", e);
  }

  close() { this.ws?.close(); }
}
