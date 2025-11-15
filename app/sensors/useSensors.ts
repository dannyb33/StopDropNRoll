import { Accelerometer, Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";

export type SensorData = { x: number; y: number; z: number };
import type { EventSubscription } from "expo-modules-core"

export function useSensors(gyroInterval = 100, accelInterval = 100) {
    const [gyro, setGyro] = useState<SensorData>({ x:0, y:0, z:0 });
    const [accel, setAccel] = useState<SensorData>({ x:0, y:0, z:0 });
    const [gSubscription, setGSubscription] = useState<EventSubscription | null>(null);
    const [aSubscription, setASubscription] = useState<EventSubscription | null >(null);

    const _gsubscribe = () => { setGSubscription(Gyroscope.addListener((data) => { setGyro(data); })); };

    const _asubscribe = () => { setASubscription(Accelerometer.addListener((data) => { setAccel(data); })); };

    const _gunsubscribe = () => { gSubscription && gSubscription.remove(); setGSubscription(null); };

    const _aunsubscribe = () => { aSubscription && aSubscription.remove(); setASubscription(null); };

    useEffect(() => {
        Gyroscope.setUpdateInterval(gyroInterval);
        Accelerometer.setUpdateInterval(accelInterval);

        _gsubscribe();
        _asubscribe();

        return () => {
            _gunsubscribe();
            _aunsubscribe();
        };
    }, []);

    return { gyro, accel }
}

