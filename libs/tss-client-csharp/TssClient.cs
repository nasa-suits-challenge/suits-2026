using System.Net.Sockets;
using System.Buffers.Binary;

namespace Tuxedo.Tss;

public record Imu(float PosX, float PosY, float Heading);

public class UdpClientTss
{
    private readonly UdpClient _udp;
    private readonly string _host;
    private readonly int _port;

    public UdpClientTss(string host, int port)
    {
        _udp = new UdpClient();
        _host = host;
        _port = port;
    }

    private async Task<byte[]> Request(uint cmd, byte[]? payload = null)
    {
        var ts = (uint)DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        var header = new byte[8];
        BinaryPrimitives.WriteUInt32BigEndian(header.AsSpan(0, 4), ts);
        BinaryPrimitives.WriteUInt32BigEndian(header.AsSpan(4, 4), cmd);
        var msg = payload is null ? header : header.Concat(payload).ToArray();
        await _udp.SendAsync(msg, msg.Length, _host, _port);
        var res = await _udp.ReceiveAsync();
        return res.Buffer;
    }

    private static float ReadF32BE(byte[] buf, int offset) =>
        BitConverter.Int32BitsToSingle(BinaryPrimitives.ReadInt32BigEndian(buf.AsSpan(offset, 4)));

    public async Task<Imu> GetImu(int ev)
    {
        uint baseCmd = ev == 1 ? 17u : 20u;
        var buf1 = await Request(baseCmd);
        var buf2 = await Request(baseCmd + 1);
        var buf3 = await Request(baseCmd + 2);
        var posx = ReadF32BE(buf1, 8);
        var posy = ReadF32BE(buf2, 8);
        var heading = ReadF32BE(buf3, 8);
        return new Imu(posx, posy, heading);
    }
}
