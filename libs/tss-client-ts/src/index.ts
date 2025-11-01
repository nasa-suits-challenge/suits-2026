import { TssConfig, Imu } from './types.js';
import { UdpClient, CMD } from './udp.js';
import { WsClient } from './ws.js';

export class TssClient {
  private udp?: UdpClient;
  private ws?: WsClient;
  constructor(private cfg: TssConfig) {
    if (cfg.transport === 'udp') {
      this.udp = new UdpClient(cfg.host, cfg.port);
    } else if (cfg.transport === 'ws' && cfg.wsUrl) {
      this.ws = new WsClient(cfg.wsUrl);
    }
  }

  async getImu(ev: 1 | 2): Promise<Imu> {
    if (this.udp) {
      const base = ev === 1 ? CMD.IMU_EV1_POSX : CMD.IMU_EV2_POSX;
      const posx = await this.udp.request(base).then(UdpClient.parseSingleFloat);
      const posy = await this.udp.request(base + 1).then(UdpClient.parseSingleFloat);
      const heading = await this.udp.request(base + 2).then(UdpClient.parseSingleFloat);
      return { posx, posy, heading };
    }
    throw new Error('WS IMU not implemented — bind topic to your provider');
  }
}
