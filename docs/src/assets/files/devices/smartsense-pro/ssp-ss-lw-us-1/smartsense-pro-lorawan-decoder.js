function DoDecode(fPort, bytes) {
    var decoded = { data: {} };
    switch (fPort) {
        case 0x01: { // HeartBeat Packet

            decoded.data.state = {};
            decoded.data.enabledAlerts = {};
            decoded.payloadType = "Heartbeat";
            decoded.payloadTypeId = bytes[0];
            decoded.data.batteryVoltage = (bytes[1] / 100) * 2;
            decoded.data.batteryPercentage = bytes[2];
            decoded.data.temperature = UInt16(bytes[3] << 8 | bytes[4]) / 100;
            decoded.data.humidity = (bytes[5] << 8 | bytes[6]) / 100;
            decoded.data.lastSnr = Int8(bytes[7]);
            decoded.data.lastRssi = Int16(bytes[8] << 8 | bytes[9]);
            decoded.data.stateAsUint8 = bytes[10];
            decoded.data.enabledAlerts.pinLeakDetectionEnabled = ((bytes[10] & 0b00000001) > 0);
            decoded.data.enabledAlerts.externalLeakDetectionEnabled = ((bytes[10] & 0b00000010) > 0);
            decoded.data.enabledAlerts.tamperDetectionEnabled = ((bytes[10] & 0b00000100) > 0);
            decoded.data.state.pinLeakDetected = ((bytes[10] & 0b00001000) > 0);
            decoded.data.state.externalLeakDetected = ((bytes[10] & 0b00010000) > 0);
            decoded.data.state.powerDetected = ((bytes[10] & 0b00100000) > 0);
            decoded.data.state.jackDetected = ((bytes[10] & 0b01000000) > 0);
            decoded.data.state.magnetDetected = ((bytes[10] & 0b10000000) > 0);
        }
            break;
        case 0x02: { // Alert Packet

            decoded.payloadType = "Alert";
            decoded.payloadTypeId = bytes[0];

            switch (bytes[0]) {
                case 1: {
                    decoded.data.settings = {};
                    decoded.alertType = "External Leak Detection (Via Headphone Jack)";
                    decoded.data.settings.triggerValue = UInt16(bytes[1] << 8 | bytes[2]);
                    decoded.data.currentValue = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.temperature = Int16(bytes[5] << 8 | bytes[6]) / 100;
                    decoded.data.humidity = UInt16(bytes[7] << 8 | bytes[8]) / 100;
                    decoded.data.settings.delayCount = bytes[9];
                    decoded.data.currentState = bytes[10];
                } break;
                case 2: {
                    decoded.data.settings = {};
                    decoded.alertType = "Local Leak Detection (Via Bottom Contact Pins)";
                    decoded.data.settings.triggerValue = UInt16(bytes[1] << 8 | bytes[2]);
                    decoded.data.currentValue = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.temperature = Int16(bytes[5] << 8 | bytes[6]) / 100;
                    decoded.data.humidity = UInt16(bytes[7] << 8 | bytes[8]) / 100;
                    decoded.data.settings.delayCount = bytes[9];
                    decoded.data.currentState = bytes[10];
                } break;
                case 3: {
                    decoded.alertType = "Tamper Detection (Magnet Presence)";
                    decoded.data.currentValue = bytes[1];
                } break;
                case 4: {
                    decoded.alertType = "Push Button Pressed";
                    decoded.data.duration = UInt16(bytes[1] << 8 | bytes[2]);
                    decoded.data.turningOff = bytes[3];
                } break;
                case 5: {
                    decoded.data.settings = {};
                    decoded.alertType = "Temperature Alert (High)";
                    decoded.data.temperature = Int16(bytes[1] << 8 | bytes[2]) / 100;
                    decoded.data.settings.triggerValue = Int16(bytes[3] << 8 | bytes[4]) / 100;
                    decoded.data.settings.guardbandValue = Int16(bytes[5] << 8 | bytes[6]) / 100;
                    decoded.data.humidity = UInt16(bytes[7] << 8 | bytes[8]) / 100;
                    decoded.data.settings.delayCount = bytes[9];
                    decoded.data.currentState = bytes[10];
                } break;
                case 6: {
                    decoded.data.settings = {};
                    decoded.alertType = "Temperature Alert (Low)";
                    decoded.data.temperature = Int16(bytes[1] << 8 | bytes[2]) / 100;
                    decoded.data.settings.triggerValue = Int16(bytes[3] << 8 | bytes[4]) / 100;
                    decoded.data.settings.guardbandValue = Int16(bytes[5] << 8 | bytes[6]) / 100;
                    decoded.data.humidity = UInt16(bytes[7] << 8 | bytes[8]) / 100;
                    decoded.data.settings.delayCount = bytes[9];
                    decoded.data.currentState = bytes[10];
                } break;
                case 7: {
                    decoded.data.settings = {};
                    decoded.alertType = "Humidity Alert (High)";
                    decoded.data.humidity = UInt16(bytes[1] << 8 | bytes[2]) / 100;
                    decoded.data.settings.triggerValue = Int16(bytes[3] << 8 | bytes[4]) / 100;
                    decoded.data.settings.guardbandValue = Int16(bytes[5] << 8 | bytes[6]) / 100;
                    decoded.data.temperature = Int16(bytes[7] << 8 | bytes[8]) / 100;
                    decoded.data.settings.delayCount = bytes[9];
                    decoded.data.currentState = bytes[10];
                } break;
                case 8: {
                    decoded.data.settings = {};
                    decoded.alertType = "Humidity Alert (Low)";
                    decoded.data.humidity = UInt16(bytes[1] << 8 | bytes[2]) / 100;
                    decoded.data.settings.triggerValue = Int16(bytes[3] << 8 | bytes[4]) / 100;
                    decoded.data.settings.guardbandValue = Int16(bytes[5] << 8 | bytes[6]) / 100;
                    decoded.data.temperature = Int16(bytes[7] << 8 | bytes[8]) / 100;
                    decoded.data.settings.delayCount = bytes[9];
                    decoded.data.currentState = bytes[10];
                } break;
                case 9: {
                    decoded.data.settings = {};
                    decoded.alertType = "Pulse Counting (Total Events)";

                    decoded.data.totalPulses = (bytes[1] << 24) + (bytes[2] << 16) + (bytes[3] << 8) + bytes[4];
                    decoded.data.totalEvents = UInt16(bytes[5] << 8 | bytes[6]);
                    decoded.data.settings.deviceTypeId = bytes[7];
                    decoded.data.longEventTriggered = bytes[8];
                    decoded.data.settings.alertInterval = UInt16(bytes[9] << 8 | bytes[10]) * 100;

                    switch (decoded.data.settings.deviceTypeId) {
                        // Generic Device Type, no usage calculations
                        case 0x00: {

                        } break;
                        // Toilet Flow Sensor
                        case 0x01: {
                            // F=18*Q-3 = 1077 pulses, Q(L/s) = f/1077, Q(L/min) = f*60/1077 = f/18*Q-3, Q(L/hour) = f*60*60/1077 = f*60/18*Q-3  
                            decoded.data.totalLiters = decoded.data.totalPulses / 1077;
                        } break;
                    }

                } break;
                case 10: {
                    decoded.data.settings = {};
                    decoded.alertType = "Pulse Counting (Long Event Alert)";
                    decoded.data.currentState = bytes[1];
                    decoded.data.settings.durationTrigger = UInt16(bytes[2] << 8 | bytes[3]) * 100;
                } break;
                case 11: {
                    decoded.data.settings = {};
                    decoded.alertType = "Pulse Counting Event (Last Event Usage)";
                    decoded.data.totalPulses = (bytes[1] << 24) + (bytes[2] << 16) + (bytes[3] << 8) + bytes[4];
                    decoded.data.settings.deviceTypeId = bytes[5];
                    decoded.data.temperature = Int16(bytes[6] << 8 | bytes[7]) / 100;
                    decoded.data.humidity = UInt16(bytes[8] << 8 | bytes[9]) / 100;
                    switch (decoded.data.settings.deviceTypeId) {
                        // Generic Device Type, no usage calculations
                        case 0x00:
                        case 0x01: {
                            decoded.data.totalLiters = decoded.data.totalPulses / 1077;
                        } break;
                    }

                } break;
                case 12: {
                    decoded.alertType = "Headphone Jack Alert";
                    decoded.data.currentValue = bytes[1];
                } break;
            }
        } break;
        case 0x03: { // System Packets

            decoded.payloadType = "System";
            decoded.payloadTypeId = bytes[0];
            switch (bytes[0]) {
                // "Network Test Packet"
                case 0x01: {
                    decoded.systemType = "Network Test Packet";
                    decoded.data.snr = Int8(bytes[1]);
                    decoded.data.rssi = Int16(bytes[2] << 8 | bytes[3]);
                } break;
                // "Joined Uplink Packet"
                case 0x02: {
                    decoded.data.settings = {};
                    decoded.data.settings.enabledAlerts = {};
                    decoded.systemType = "Joined Uplink Packet";
                    decoded.data.firmwareVersion = UInt16(bytes[1] << 8 | bytes[2]);
                    decoded.data.settings.heartbeatInterval = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.settings.sensorCheckInterval = UInt16(bytes[5] << 8 | bytes[6]);
                    decoded.data.settings.enabledAlerts.pinLeakDetection = ((bytes[7] & 0b00000001) > 0);
                    decoded.data.settings.enabledAlerts.externalLeakDetection = ((bytes[7] & 0b00000010) > 0);
                    decoded.data.settings.enabledAlerts.tamperDetection = ((bytes[7] & 0b00000100) > 0);
                    decoded.data.settings.enabledAlerts.pushButton = ((bytes[7] & 0b00001000) > 0);
                    decoded.data.settings.enabledAlerts.temperatureHigh = ((bytes[7] & 0b00010000) > 0);
                    decoded.data.settings.enabledAlerts.temperatureLow = ((bytes[7] & 0b00100000) > 0);
                    decoded.data.settings.enabledAlerts.humidityHigh = ((bytes[7] & 0b01000000) > 0);
                    decoded.data.settings.enabledAlerts.humidityLow = ((bytes[7] & 0b10000000) > 0);
                    decoded.data.settings.enabledAlerts.pulseCountingAlert = ((bytes[8] & 0b00000001) > 0);
                    decoded.data.settings.enabledAlerts.pulseCountingEventLongAlert = ((bytes[8] & 0b00000010) > 0);

                } break;
            }

        }
            break;
        case 0x04: { // Parameter Values

            decoded.payloadType = "Parameter Values";
            decoded.payloadTypeId = bytes[0];

            switch (bytes[0]) {
                // devEui Parameter
                case 0: {
                    let devEuiTemp = "";
                    devEuiTemp += bytes[1].toString(16).padStart(2, '0').toUpperCase();
                    devEuiTemp += bytes[2].toString(16).padStart(2, '0').toUpperCase();
                    devEuiTemp += bytes[3].toString(16).padStart(2, '0').toUpperCase();
                    devEuiTemp += bytes[4].toString(16).padStart(2, '0').toUpperCase();
                    devEuiTemp += bytes[5].toString(16).padStart(2, '0').toUpperCase();
                    devEuiTemp += bytes[6].toString(16).padStart(2, '0').toUpperCase();
                    devEuiTemp += bytes[7].toString(16).padStart(2, '0').toUpperCase();
                    devEuiTemp += bytes[8].toString(16).padStart(2, '0').toUpperCase();

                    decoded.parameterType = "devEui";
                    decoded.data.devEui = devEuiTemp;
                } break;
                // appEui Parameter
                case 1: {
                    let appEuiTemp = "";
                    appEuiTemp += bytes[1].toString(16).padStart(2, '0').toUpperCase();
                    appEuiTemp += bytes[2].toString(16).padStart(2, '0').toUpperCase();
                    appEuiTemp += bytes[3].toString(16).padStart(2, '0').toUpperCase();
                    appEuiTemp += bytes[4].toString(16).padStart(2, '0').toUpperCase();
                    appEuiTemp += bytes[5].toString(16).padStart(2, '0').toUpperCase();
                    appEuiTemp += bytes[6].toString(16).padStart(2, '0').toUpperCase();
                    appEuiTemp += bytes[7].toString(16).padStart(2, '0').toUpperCase();
                    appEuiTemp += bytes[8].toString(16).padStart(2, '0').toUpperCase();

                    decoded.parameterType = "appEui";
                    decoded.data.appEui = appEuiTemp;
                } break;
                // appKey Parameter
                case 2: {
                    decoded.parameterType = "appKey";   // This is not enabled for security reasons
                } break;
                // Retry Parameter
                case 3: {
                    decoded.parameterType = "retry";
                    decoded.data.retry = bytes[1];
                } break;
                // Confirm Mode Parameter
                case 4: {
                    decoded.parameterType = "Confirm Mode";
                    decoded.data.confirmMode = bytes[1];
                } break;
                // Join Mode Parameter
                case 5: {
                    decoded.parameterType = "Join Mode";
                    decoded.data.joinMode = bytes[1];
                } break;
                // ADR Parameter
                case 6: {
                    decoded.parameterType = "ADR";
                    decoded.data.adr = bytes[1];
                } break;
                // Device Class Parameter
                case 7: {
                    decoded.parameterType = "Device Class";
                    decoded.data.deviceClass = bytes[1];
                } break;
                // Duty Cycle Parameter
                case 8: {
                    decoded.parameterType = "Duty Cycle";
                    decoded.data.dutyCycle = bytes[1];
                } break;
                // Datarate Parameter
                case 9: {
                    decoded.parameterType = "Datarate";
                    decoded.data.datarate = bytes[1];
                } break;
                // Join Delay RX1 Parameter
                case 10: {
                    decoded.parameterType = "Join Delay RX1";
                    decoded.data.joinDelayRx1 = UInt16(bytes[1] << 8 | bytes[2]);
                } break;
                // Join Delay RX2 Parameter
                case 11: {
                    decoded.parameterType = "Join Delay RX2";
                    decoded.data.joinDelayRx2 = UInt16(bytes[1] << 8 | bytes[2]);
                } break;
                // Public Network Mode Parameter
                case 12: {
                    decoded.parameterType = "Public Network Mode";
                    decoded.publicNetworkMode = bytes[1];
                } break;
                // RX1 Delay Parameter
                case 13: {
                    decoded.parameterType = "RX1 Delay";
                    decoded.data.rx1Delay = UInt16(bytes[1] << 8 | bytes[2]);
                } break;
                // RX2 Delay Parameter
                case 14: {
                    decoded.parameterType = "RX2 Delay";
                    decoded.data.rx2Delay = UInt16(bytes[1] << 8 | bytes[2]);
                } break;
                // RX2 Datarate Parameter
                case 15: {
                    decoded.parameterType = "RX2 Datarate";
                    decoded.data.rx2Datarate = bytes[1];
                } break;
                // TX Power Parameter
                case 16: {
                    decoded.parameterType = "TX Power";
                    decoded.data.txPower = bytes[1];
                } break;
                // Region Parameter
                case 17: {
                    decoded.parameterType = "Region";
                    decoded.data.region = bytes[1];
                } break;
                // Channel Mask Parameter
                case 18: {
                    let channelMaskTemp = "";
                    channelMaskTemp += bytes[1].toString(16).padStart(2, '0').toUpperCase();
                    channelMaskTemp += bytes[2].toString(16).padStart(2, '0').toUpperCase();

                    decoded.parameterType = "Channel Mask";
                    decoded.data.channelMask = channelMaskTemp;
                } break;
                // Network Mode Parameter
                case 19: {
                    decoded.parameterType = "Network Mode";
                    decoded.data.networkMode = bytes[1];
                } break;
                // Mode Parameter
                case 20: {
                    decoded.parameterType = "Mode";
                    decoded.data.mode = bytes[1];
                } break;
                // Heartbeat Interval Parameter
                case 21: {
                    decoded.parameterType = "Heartbeat Interval";
                    decoded.data.heartbeatInterval = UInt16(bytes[1] << 8 | bytes[2]);
                } break;
                // Join Group Parameter
                case 22: {
                    decoded.parameterType = "Join Group";
                    decoded.data.delayBetweenIterations = UInt16(bytes[1] << 8 | bytes[2]);
                    decoded.data.delayBetweenSequence = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.failCountToTriggerLongDelay = bytes[5];
                    decoded.data.longDelayBetweenSequence = UInt16(bytes[6] << 8 | bytes[7]);
                    

                } break;
                // Network Test Group Parameter
                case 23: {
                    decoded.parameterType = "Network Test Group";
                    decoded.data.interval = UInt16(bytes[1] << 8 | bytes[2]);
                    decoded.data.adr = bytes[3];
                    decoded.data.datarate = bytes[4];
                    decoded.data.txPower = bytes[5];
                } break;
                // Battery Group Parameter
                case 24: {
                    decoded.parameterType = "Battery Group";
                    decoded.data.batteryMin = (bytes[1] * 2) / 100;
                    decoded.data.batteryMax = (bytes[2] * 2) / 100;
                    decoded.data.batteryType = bytes[3];
                } break;
                // No ACK Recovery Group Parameter
                case 25: {
                    decoded.parameterType = "No ACK Recovery Group";
                    decoded.data.noAckRecoveryMode = bytes[1];
                    decoded.data.adrDisabled = bytes[2];
                    decoded.data.delay = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.retryCount = bytes[5];
                    decoded.data.Retrydelay = UInt16(bytes[6] << 8 | bytes[7]);
                } break;
                // Heartbeat Group Parameter
                case 26: {
                    decoded.parameterType = "Heartbeat Group";
                    decoded.data.heartbeatId = bytes[1];
                    decoded.data.ack = bytes[2];
                    decoded.data.ackRetryCount = bytes[3];
                } break;
                // External Leak ACK Parameter
                case 27: {
                    decoded.parameterType = "External Leak ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Pin Leak ACK Parameter
                case 28: {
                    decoded.parameterType = "Pin Leak ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Tamper Detection ACK Parameter
                case 29: {
                    decoded.parameterType = "Tamper Detection ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Button Press ACK Parameter
                case 30: {
                    decoded.parameterType = "Button Press ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Temperature High ACK Parameter
                case 31: {
                    decoded.parameterType = "Temperature High ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Temperature Low ACK Parameter
                case 32: {
                    decoded.parameterType = "Temperature Low ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Humidity High ACK Parameter
                case 33: {
                    decoded.parameterType = "Humidity High ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Humidity Low ACK Parameter
                case 34: {
                    decoded.parameterType = "Humidity Low ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Pulse Count ACK Parameter
                case 35: {
                    decoded.parameterType = "Pulse Count ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Pulse Count Long Event ACK Parameter
                case 36: {
                    decoded.parameterType = "Pulse Count Long Event ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Parameter Uplink ACK Parameter
                case 37: {
                    decoded.parameterType = "Parameter Uplink ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                // Pin Leak Detection Parameter
                case 38: {
                    decoded.parameterType = "Pin Leak Detection";
                    decoded.data.enabled = bytes[1];
                    decoded.data.triggerValue = UInt16(bytes[2] << 8 | bytes[3]);
                    decoded.data.triggerDelay = bytes[4];
                } break;
                // Pin Leak Detection Buzzer Parameter
                case 39: {
                    decoded.parameterType = "Pin Leak Detection Buzzer";
                    decoded.data.enabled = bytes[1];
                    decoded.data.silenceEnabled = bytes[2];
                    decoded.data.silenceCounter = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.beepCount = bytes[5];
                    decoded.data.beepDuration = UInt16(bytes[6] << 8 | bytes[7]);

                } break;
                // Pin Leak Detection All Parameter
                case 40: {
                    decoded.parameterType = "Pin Leak Detection All";
                    decoded.data.pinLeakDetectionEnabled = ((bytes[1] & 0b00000001) > 0);
                    decoded.data.buzzerEnabled = ((bytes[1] & 0b00000010) > 0);
                    decoded.data.silenceEnabled = ((bytes[1] & 0b00000100) > 0);
                    decoded.data.triggerValue = UInt16(bytes[2] << 8 | bytes[3]);
                    decoded.data.triggerDelay = bytes[4];
                    decoded.data.silenceCounter = UInt16(bytes[5] << 8 | bytes[6]);
                    decoded.data.beepCount = bytes[7];
                    decoded.data.beepDuration = UInt16(bytes[8] << 8 | bytes[9]);

                } break;
                // External Leak Detection Parameter
                case 41: {
                    decoded.parameterType = "External Leak Detection";
                    decoded.data.enabled = bytes[1];
                    decoded.data.triggerValue = UInt16(bytes[2] << 8 | bytes[3]);
                    decoded.data.triggerDelay = bytes[4];
                } break;
                // External Leak Detection Buzzer Parameter
                case 42: {
                    decoded.parameterType = "External Leak Detection Buzzer";
                    decoded.data.enabled = bytes[1];
                    decoded.data.silenceEnabled = bytes[2];
                    decoded.data.silenceCounter = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.beepCount = bytes[5];
                    decoded.data.beepDuration = UInt16(bytes[6] << 8 | bytes[7]);
                } break;
                // External Leak Detection All Parameter
                case 43: {
                    decoded.parameterType = "External Leak Detection All";
                    decoded.data.pinLeakDetectionEnabled = ((bytes[1] & 0b00000001) > 0);
                    decoded.data.buzzerEnabled = ((bytes[1] & 0b00000010) > 0);
                    decoded.data.silenceEnabled = ((bytes[1] & 0b00000100) > 0);
                    decoded.data.triggerValue = UInt16(bytes[2] << 8 | bytes[3]);
                    decoded.data.triggerDelay = bytes[4];
                    decoded.data.silenceCounter = UInt16(bytes[5] << 8 | bytes[6]);
                    decoded.data.beepCount = bytes[7];
                    decoded.data.beepDuration = UInt16(bytes[8] << 8 | bytes[9]);
                } break;
                // Tamper Detection Parameter
                case 44: {
                    decoded.parameterType = "Tamper Detection";
                    decoded.data.enabled = bytes[1];
                } break;
                // Tamper Detection Buzzer Parameter
                case 45: {
                    decoded.parameterType = "Tamper Detection Buzzer";
                    decoded.data.enabled = bytes[1];
                    decoded.data.silenceEnabled = bytes[2];
                    decoded.data.silenceCounter = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.beepCount = bytes[5];
                    decoded.data.beepDuration = UInt16(bytes[6] << 8 | bytes[7]);
                } break;
                // Tamper Detection All Parameter
                case 46: {
                    decoded.parameterType = "Tamper Detection All";
                    decoded.data.enabled = bytes[1];
                    decoded.data.buzzerEnabled = bytes[2];
                    decoded.data.silenceEnabled = bytes[3];
                    decoded.data.silenceCounter = UInt16(bytes[4] << 8 | bytes[5]);
                    decoded.data.beepCount = bytes[6];
                    decoded.data.beepDuration = UInt16(bytes[7] << 8 | bytes[8]);
                } break;
                // Button Pressed Parameter
                case 47: {
                    decoded.parameterType = "Button Pressed";
                    decoded.data.enabled = bytes[1];
                } break;
                // Temperature High Parameter
                case 48: {
                    decoded.parameterType = "Temperature High";
                    decoded.data.enabled = bytes[1];
                    decoded.data.triggerValue = (Int16(bytes[2] << 8 | bytes[3])) / 100;
                    decoded.data.guardbandValue = (Int16(bytes[4] << 8 | bytes[5])) / 100;
                    decoded.data.delayCount = bytes[6];
                } break;
                // Temperature High Buzzer Parameter
                case 49: {
                    decoded.parameterType = "Temperature High Buzzer";
                    decoded.data.enabled = bytes[1];
                    decoded.data.silenceEnabled = bytes[2];
                    decoded.data.silenceCounter = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.beepCount = bytes[5];
                    decoded.data.beepDuration = UInt16(bytes[6] << 8 | bytes[7]);
                } break;
                // Temperature High All Parameter
                case 50: {
                    decoded.parameterType = "Temperature High All";
                    decoded.data.enabled = ((bytes[1] & 0b00000001) > 0);
                    decoded.data.buzzerEnabled = ((bytes[1] & 0b00000010) > 0);
                    decoded.data.silenceEnabled = ((bytes[1] & 0b00000100) > 0);
                    decoded.data.triggerValue = (Int16(bytes[2] << 8 | bytes[3])) / 100;
                    decoded.data.guardbandValue = (Int16(bytes[4] << 8 | bytes[5])) / 100;
                    decoded.data.delayCount = bytes[6];
                    decoded.data.silenceCounter = bytes[7];
                    decoded.data.beepCount = bytes[8];
                    decoded.data.beepDuration = UInt16(bytes[9] << 8 | bytes[10]);

                } break;
                // Temperature Low Parameter
                case 51: {
                    decoded.parameterType = "Temperature Low";
                    decoded.data.enabled = bytes[1];
                    decoded.data.triggerValue = (Int16(bytes[2] << 8 | bytes[3])) / 100;
                    decoded.data.guardbandValue = (Int16(bytes[4] << 8 | bytes[5])) / 100;
                    decoded.data.delayCount = bytes[6];
                } break;
                // Temperature Low Buzzer Parameter
                case 52: {
                    decoded.parameterType = "Temperature Low Buzzer";
                    decoded.data.enabled = bytes[1];
                    decoded.data.silenceEnabled = bytes[2];
                    decoded.data.silenceCounter = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.beepCount = bytes[5];
                    decoded.data.beepDuration = UInt16(bytes[6] << 8 | bytes[7]);
                } break;
                // Temperature Low All Parameter
                case 53: {
                    decoded.parameterType = "Temperature Low All";
                    decoded.data.enabled = ((bytes[1] & 0b00000001) > 0);
                    decoded.data.buzzerEnabled = ((bytes[1] & 0b00000010) > 0);
                    decoded.data.silenceEnabled = ((bytes[1] & 0b00000100) > 0);
                    decoded.data.triggerValue = (Int16(bytes[2] << 8 | bytes[3])) / 100;
                    decoded.data.guardbandValue = (Int16(bytes[4] << 8 | bytes[5])) / 100;
                    decoded.data.delayCount = bytes[6];
                    decoded.data.silenceCounter = bytes[7];
                    decoded.data.beepCount = bytes[8];
                    decoded.data.beepDuration = UInt16(bytes[9] << 8 | bytes[10]);
                } break;
                // Humidity High Parameter
                case 54: {
                    decoded.parameterType = "Humidity High";
                    decoded.data.enabled = bytes[1];
                    decoded.data.triggerValue = (Int16(bytes[2] << 8 | bytes[3])) / 100;
                    decoded.data.guardbandValue = (Int16(bytes[4] << 8 | bytes[5])) / 100;
                    decoded.data.delayCount = bytes[6];
                } break;
                // Humidity High Buzzer Parameter
                case 55: {
                    decoded.parameterType = "Humidity High Buzzer";
                    decoded.data.enabled = bytes[1];
                    decoded.data.silenceEnabled = bytes[2];
                    decoded.data.silenceCounter = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.beepCount = bytes[5];
                    decoded.data.beepDuration = UInt16(bytes[6] << 8 | bytes[7]);
                } break;
                // Humidity High All Parameter
                case 56: {
                    decoded.parameterType = "Humidity High All";
                    decoded.data.enabled = ((bytes[1] & 0b00000001) > 0);
                    decoded.data.buzzerEnabled = ((bytes[1] & 0b00000010) > 0);
                    decoded.data.silenceEnabled = ((bytes[1] & 0b00000100) > 0);
                    decoded.data.triggerValue = (Int16(bytes[2] << 8 | bytes[3])) / 100;
                    decoded.data.guardbandValue = (Int16(bytes[4] << 8 | bytes[5])) / 100;
                    decoded.data.delayCount = bytes[6];
                    decoded.data.silenceCounter = bytes[7];
                    decoded.data.beepCount = bytes[8];
                    decoded.data.beepDuration = UInt16(bytes[9] << 8 | bytes[10]);
                } break;
                // Humidity Low Parameter
                case 57: {
                    decoded.parameterType = "Humidity Low";
                    decoded.data.enabled = bytes[1];
                    decoded.data.triggerValue = (Int16(bytes[2] << 8 | bytes[3])) / 100;
                    decoded.data.guardbandValue = (Int16(bytes[4] << 8 | bytes[5])) / 100;
                    decoded.data.delayCount = bytes[6];
                } break;
                // Humidity Low Buzzer Parameter
                case 58: {
                    decoded.parameterType = "Humidity Low Buzzer";
                    decoded.data.enabled = bytes[1];
                    decoded.data.silenceEnabled = bytes[2];
                    decoded.data.silenceCounter = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.beepCount = bytes[5];
                    decoded.data.beepDuration = UInt16(bytes[6] << 8 | bytes[7]);
                } break;
                // Humidity Low All Parameter
                case 59: {
                    decoded.parameterType = "Humidity Low All";
                    decoded.data.enabled = ((bytes[1] & 0b00000001) > 0);
                    decoded.data.buzzerEnabled = ((bytes[1] & 0b00000010) > 0);
                    decoded.data.silenceEnabled = ((bytes[1] & 0b00000100) > 0);
                    decoded.data.triggerValue = (Int16(bytes[2] << 8 | bytes[3])) / 100;
                    decoded.data.guardbandValue = (Int16(bytes[4] << 8 | bytes[5])) / 100;
                    decoded.data.delayCount = bytes[6];
                    decoded.data.silenceCounter = bytes[7];
                    decoded.data.beepCount = bytes[8];
                    decoded.data.beepDuration = UInt16(bytes[9] << 8 | bytes[10]);
                } break;
                // Temperature Offset Parameter
                case 60: {
                    decoded.parameterType = "Temperature Offset";
                    decoded.data.offset = (Int16(bytes[1] << 8 | bytes[2])) / 100;
                } break;
                // Humidity Offset Parameter
                case 61: {
                    decoded.parameterType = "Humidity Offset";
                    decoded.data.offset = (Int16(bytes[1] << 8 | bytes[2])) / 100;
                } break;
                // Sense Interval Parameter
                case 62: {
                    decoded.parameterType = "Sense Interval";
                    decoded.data.interval = UInt16(bytes[1] << 8 | bytes[2]);
                } break;
                // Pulse Counting Parameter
                case 63: {
                    decoded.parameterType = "Pulse Counting";
                    decoded.data.enabled = bytes[1];
                    decoded.data.deviceTypeId = bytes[2];
                    decoded.data.reportingInterval = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.eventDelayValue = UInt16(bytes[5] << 8 | bytes[6]);

                } break;
                // Pulse Counting Long Event Parameter
                case 64: {
                    decoded.parameterType = "Pulse Counting Long Event";
                    decoded.data.enabled = bytes[1];
                    decoded.data.eventLongDelayValue = UInt16(bytes[2] << 8 | bytes[3]);
                } break;
                case 65: {
                    decoded.parameterType = "Jack Detected Event ACK";
                    decoded.data.ack = bytes[1];
                    decoded.data.ackRetryCount = bytes[2];
                } break;
                case 66: {
                    decoded.parameterType = "Jack Detected Event";
                    decoded.data.enabled = bytes[1];
                    decoded.data.delayCount = bytes[2];
                } break;
                case 67: {
                    decoded.parameterType = "Jack Detected Buzzer";
                    decoded.data.enabled = bytes[1];
                    decoded.data.silenceEnabled = bytes[2];
                    decoded.data.silenceCounter = UInt16(bytes[3] << 8 | bytes[4]);
                    decoded.data.beepCount = bytes[5];
                    decoded.data.beepDuration = UInt16(bytes[6] << 8 | bytes[7]);
                } break;
                case 68: {
                    decoded.parameterType = "Jack Detected All";
                    decoded.data.enabled = bytes[1];
                    decoded.data.delayCount = bytes[2];
                    decoded.data.buzzerEnabled = bytes[3];
                    decoded.data.silenceEnabled = bytes[4];
                    decoded.data.silenceCounter = UInt16(bytes[5] << 8 | bytes[6]);
                    decoded.data.beepCount = bytes[7];
                    decoded.data.beepDuration = UInt16(bytes[8] << 8 | bytes[9]);
                } break;
                case 69: {
                    decoded.parameterType = "Buzzer Disabled";
                    decoded.data.disabled = bytes[1];
                } break;
            }


        } break;
        default:
            decoded.unknown = "Unknown data format";
            break;
    }
    return decoded;
}

// For TTN
function Decoder(bytes, fPort) {
    return DoDecode(fPort, bytes);
}

// For Chirpstack
function Decode(fPort, bytes, variables) {
    return DoDecode(fPort, bytes);
}

// Chirpstack v3 to v4 compatibility wrapper
function decodeUplink(input) {
    return {
        data: Decode(input.fPort, input.bytes, input.variables)
    };
}

var UInt4 = function (value) {
    return (value & 0xF);
};

var Int4 = function (value) {
    var ref = UInt4(value);
    return (ref > 0x7) ? ref - 0x10 : ref;
};

var UInt8 = function (value) {
    return (value & 0xFF);
};

var Int8 = function (value) {
    var ref = UInt8(value);
    return (ref > 0x7F) ? ref - 0x100 : ref;
};

var UInt16 = function (value) {
    return (value & 0xFFFF);
};

var Int16 = function (value) {
    var ref = UInt16(value);
    return (ref > 0x7FFF) ? ref - 0x10000 : ref;
};