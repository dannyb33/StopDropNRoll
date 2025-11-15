import type { SensorData } from './useSensors';

export function getMagnitude({ x, y, z }: SensorData) {
    return Math.sqrt(x*x + y*y + z*z);
}

export function isStopped(gyro: SensorData, accel: SensorData) {
    if(getMagnitude(accel) > 1.2) console.log("accel limit");
    if(getMagnitude(accel) < 0.9) console.log("accel floor");
    if(getMagnitude(gyro) > 0.6) console.log("gyro limit");

    return getMagnitude(accel) < 1.2 && getMagnitude(accel) > 0.9 && getMagnitude(gyro) < 0.6;
}

export function isFalling(accel: SensorData) {
    return (getMagnitude(accel) < 0.7 || getMagnitude(accel) > 2);
}

export function isRolling(gyro: SensorData) {
    return getMagnitude(gyro) > 5;
}