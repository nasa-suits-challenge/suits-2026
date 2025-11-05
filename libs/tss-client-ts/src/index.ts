import { TssConfig, Imu, PressurizedRoverTelemetry } from './types.js';
import { UdpClient, CMD } from './udp.js';
import { WsClient } from './ws.js';

type PrFieldKey = Exclude<keyof PressurizedRoverTelemetry, 'lidar'>;

const PR_TELEMETRY_FIELDS: Array<{
  key: PrFieldKey;
  offset: number;
  type: 'bool' | 'float';
  optional?: boolean;
}> = [
  { key: 'ac_heating', offset: 0, type: 'bool' },
  { key: 'ac_cooling', offset: 1, type: 'bool' },
  { key: 'co2_scrubber', offset: 2, type: 'bool' },
  { key: 'lights_on', offset: 3, type: 'bool' },
  { key: 'internal_lights_on', offset: 4, type: 'bool' },
  { key: 'brakes', offset: 5, type: 'bool' },
  { key: 'in_sunlight', offset: 6, type: 'bool' },
  { key: 'throttle', offset: 7, type: 'float' },
  { key: 'steering', offset: 8, type: 'float' },
  { key: 'current_pos_x', offset: 9, type: 'float' },
  { key: 'current_pos_y', offset: 10, type: 'float' },
  { key: 'current_pos_alt', offset: 11, type: 'float' },
  { key: 'heading', offset: 12, type: 'float' },
  { key: 'pitch', offset: 13, type: 'float' },
  { key: 'roll', offset: 14, type: 'float' },
  { key: 'distance_traveled', offset: 15, type: 'float' },
  { key: 'speed', offset: 16, type: 'float' },
  { key: 'surface_incline', offset: 17, type: 'float' },
  { key: 'oxygen_tank', offset: 18, type: 'float' },
  { key: 'oxygen_pressure', offset: 19, type: 'float' },
  { key: 'oxygen_levels', offset: 20, type: 'float' },
  { key: 'fan_pri', offset: 21, type: 'bool' },
  { key: 'ac_fan_pri', offset: 22, type: 'float' },
  { key: 'ac_fan_sec', offset: 23, type: 'float' },
  { key: 'cabin_pressure', offset: 24, type: 'float' },
  { key: 'cabin_temperature', offset: 25, type: 'float' },
  { key: 'battery_level', offset: 26, type: 'float' },
  { key: 'power_consumption_rate', offset: 27, type: 'float' },
  { key: 'solar_panel_efficiency', offset: 28, type: 'float' },
  { key: 'external_temp', offset: 29, type: 'float' },
  { key: 'pr_coolant_level', offset: 30, type: 'float' },
  { key: 'pr_coolant_pressure', offset: 31, type: 'float' },
  { key: 'pr_coolant_tank', offset: 32, type: 'float' },
  { key: 'radiator', offset: 33, type: 'float' },
  { key: 'motor_power_consumption', offset: 34, type: 'float' },
  { key: 'terrain_condition', offset: 35, type: 'float' },
  { key: 'solar_panel_dust_accum', offset: 36, type: 'float' },
  { key: 'mission_elapsed_time', offset: 37, type: 'float' },
  { key: 'mission_planned_time', offset: 38, type: 'float' },
  { key: 'point_of_no_return', offset: 39, type: 'float' },
  { key: 'distance_from_base', offset: 40, type: 'float' },
  { key: 'switch_dest', offset: 41, type: 'bool' },
  { key: 'dest_x', offset: 42, type: 'float' },
  { key: 'dest_y', offset: 43, type: 'float' },
  { key: 'dest_z', offset: 44, type: 'float' },
  { key: 'dust_wiper', offset: 45, type: 'bool' },
  { key: 'sim_running', offset: 46, type: 'bool' },
  { key: 'sim_paused', offset: 47, type: 'bool' },
  { key: 'sim_completed', offset: 48, type: 'bool', optional: true },
];

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

  async getPressurizedRoverTelemetry(): Promise<PressurizedRoverTelemetry> {
    if (!this.udp) {
      throw new Error('PR telemetry over WebSocket not implemented — use UDP transport');
    }

    const telemetry: Partial<PressurizedRoverTelemetry> = {};

    for (const field of PR_TELEMETRY_FIELDS) {
      const command = CMD.PR_TELEMETRY_BASE + field.offset;
      const parser = field.type === 'bool' ? UdpClient.parseBoolean : UdpClient.parseSingleFloat;
      try {
        const buf = await this.udp.request(command);
        (telemetry as Record<string, unknown>)[field.key] = parser(buf);
      } catch (err) {
        if (!field.optional) {
          throw err;
        }
      }
    }

    const lidarBuf = await this.udp.request(CMD.PR_LIDAR);
    telemetry.lidar = UdpClient.parseFloatArray(lidarBuf);

    return telemetry as PressurizedRoverTelemetry;
  }
}
