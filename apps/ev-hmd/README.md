# EV HMD (Unity/HoloLens) stub

- Open your Unity project and add **libs/tss-client-csharp** as a local assembly definition or copy the C# files into your Assets.
- Example usage:

```csharp
using System.Threading.Tasks;
using UnityEngine;
using Tuxedo.Tss;

public class TssDemo : MonoBehaviour
{
    async void Start()
    {
        var client = new UdpClientTss("127.0.0.1", 14141);
        Imu imu = await client.GetImu(1);
        Debug.Log($"IMU EV1: {imu.PosX}, {imu.PosY}, {imu.Heading}");
    }
}
```
