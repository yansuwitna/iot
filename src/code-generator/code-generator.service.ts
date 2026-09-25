import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface CodeGenConfig {
  boardType: 'ESP32' | 'Arduino';
  components: Array<{
    type: 'LED' | 'DHT22' | 'SoilMoisture';
    pin: number;
  }>;
  telemetryUrl?: string;
  wifiSSID?: string;
  wifiPassword?: string;
}

@Injectable()
export class CodeGeneratorService {
  constructor(private prisma: PrismaService) {}

  generateCode(config: CodeGenConfig): string {
    this.validatePins(config);

    if (config.boardType === 'ESP32') {
      return this.generateESP32Code(config);
    } else {
      return this.generateArduinoCode(config);
    }
  }

  private validatePins(config: CodeGenConfig) {
    const usedPins = new Set<number>();
    for (const comp of config.components) {
      if (usedPins.has(comp.pin)) {
        throw new BadRequestException(`Pin conflict: Pin ${comp.pin} is used multiple times.`);
      }
      usedPins.add(comp.pin);
    }
  }

  private generateESP32Code(config: CodeGenConfig): string {
    let includes = '';
    let globals = '';
    let setup = 'void setup() {\n  Serial.begin(115200);\n';
    let loop = 'void loop() {\n';

    const hasDHT22 = config.components.some(c => c.type === 'DHT22');
    const hasWifi = !!config.wifiSSID;

    if (hasWifi) {
      includes += '#include <WiFi.h>\n#include <HTTPClient.h>\n';
      globals += `const char* ssid = "${config.wifiSSID}";\nconst char* password = "${config.wifiPassword}";\n`;
      setup += `  WiFi.begin(ssid, password);\n  while (WiFi.status() != WL_CONNECTED) { delay(1000); Serial.print("."); }\n  Serial.println("Connected to WiFi");\n`;
    }

    if (hasDHT22) {
      includes += '#include "DHT.h"\n';
    }

    config.components.forEach((c, index) => {
      switch (c.type) {
        case 'LED':
          setup += `  pinMode(${c.pin}, OUTPUT);\n`;
          loop += `  digitalWrite(${c.pin}, HIGH);\n  delay(1000);\n  digitalWrite(${c.pin}, LOW);\n  delay(1000);\n`;
          break;
        case 'DHT22':
          globals += `#define DHTPIN${index} ${c.pin}\n#define DHTTYPE DHT22\nDHT dht${index}(DHTPIN${index}, DHTTYPE);\n`;
          setup += `  dht${index}.begin();\n`;
          loop += `  float t${index} = dht${index}.readTemperature();\n  float h${index} = dht${index}.readHumidity();\n`;
          break;
        case 'SoilMoisture':
          setup += `  pinMode(${c.pin}, INPUT);\n`;
          loop += `  int moisture${index} = analogRead(${c.pin});\n`;
          break;
      }
    });

    setup += '}\n';
    loop += '  delay(2000);\n}\n';

    return `${includes}\n${globals}\n${setup}\n${loop}`;
  }

  private generateArduinoCode(config: CodeGenConfig): string {
    // Basic Arduino stub
    return '// Arduino Code Generator Stub\nvoid setup() {}\nvoid loop() {}';
  }

  async saveCodeVersion(projectId: string, code: string, versionName: string) {
    return this.prisma.projectVersion.create({
      data: {
        projectId,
        code,
        versionName,
      }
    });
  }

  async getVersions(projectId: string) {
    return this.prisma.projectVersion.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
