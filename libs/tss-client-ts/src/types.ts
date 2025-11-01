export type Transport = 'udp' | 'ws';

export interface TssConfig {
  host: string;
  port: number;
  transport: Transport;
  wsUrl?: string;
}

export interface Imu {
  posx: number;
  posy: number;
  heading: number;
}
