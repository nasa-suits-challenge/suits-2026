import dgram from 'dgram';

const BE_U32 = (buf: Buffer, off: number) => buf.readUInt32BE(off);
const BE_F32 = (buf: Buffer, off: number) => buf.readFloatBE(off);

export class UdpClient {
  private socket = dgram.createSocket('udp4');
  constructor(private host: string, private port: number) {}

  request(command: number, payload?: Buffer): Promise<Buffer> {
    const ts = Math.floor(Date.now() / 1000) >>> 0; // uint32
    const header = Buffer.alloc(8);
    header.writeUInt32BE(ts, 0);
    header.writeUInt32BE(command >>> 0, 4);
    const msg = payload ? Buffer.concat([header, payload]) : header;

    return new Promise((resolve, reject) => {
      const onMessage = (rbuf: Buffer) => {
        this.socket.off('message', onMessage);
        resolve(rbuf);
      };
      this.socket.on('message', onMessage);
      this.socket.send(msg, this.port, this.host, (err) => {
        if (err) {
          this.socket.off('message', onMessage);
          reject(err);
        }
      });
      setTimeout(() => {
        this.socket.off('message', onMessage);
        reject(new Error('UDP timeout'));
      }, 1000);
    });
  }

  static parseSingleFloat(buf: Buffer) {
    // [ts(4)][cmd(4)][data(4)]
    return BE_F32(buf, 8);
  }

  static parseLidar13(buf: Buffer): number[] {
    // [ts(4)][cmd(4)][13 * float(4)]
    const out: number[] = [];
    for (let i = 0; i < 13; i++) {
      out.push(BE_F32(buf, 8 + i * 4));
    }
    return out;
  }
}

// Command constants (subset)
export const CMD = {
  DCU_EV1_START: 2,
  DCU_EV2_START: 8,
  ERROR_START: 14,
  IMU_EV1_POSX: 17,
  IMU_EV1_POSY: 18,
  IMU_EV1_HEADING: 19,
  IMU_EV2_POSX: 20,
  IMU_EV2_POSY: 21,
  IMU_EV2_HEADING: 22,
  ROVER_START: 23,
  LIDAR_13: 172,
};
