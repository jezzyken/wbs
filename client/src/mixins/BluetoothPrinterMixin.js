
const ESC = '\x1B';
const GS = '\x1D';
const LF = '\x0A';
const HT = '\x09';

const COMMANDS = {
  INIT: `${ESC}@`,
  TEXT_NORMAL: `${ESC}!0`,
  TEXT_SMALL: `${ESC}!1`,
  ALIGN_LEFT: `${ESC}a0`,
  ALIGN_CENTER: `${ESC}a1`,
  ALIGN_RIGHT: `${ESC}a2`,
  BOLD_ON: `${ESC}E1`,
  BOLD_OFF: `${ESC}E0`,
  UNDERLINE_ON: `${ESC}-1`,
  UNDERLINE_OFF: `${ESC}-0`,
  LINE_SPACING_DEFAULT: `${ESC}2`,
  CUT_PAPER: `${GS}V1`
};

export const BluetoothPrinterMixin = {
  data: () => ({
    printer: {
      device: null,
      server: null,
      service: null,
      characteristic: null,
      connected: false,
      serviceUUID: '000018f0-0000-1000-8000-00805f9b34fb',
      characteristicUUID: '00002af1-0000-1000-8000-00805f9b34fb'
    }
  }),

  computed: {
    isPrinterConnected() {
      return this.printer.connected;
    }
  },

  methods: {
    async requestPrinter() {
      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [
            { services: [this.printer.serviceUUID] },
            { namePrefix: 'POS' }
          ]
        });

        device.addEventListener('gattserverdisconnected', this.handleDisconnection);
        this.printer.device = device;
        return true;
      } catch (error) {
        console.error('Error requesting printer:', error);
        throw new Error('Failed to find printer');
      }
    },

    async connectPrinter() {
      if (!this.printer.device) {
        await this.requestPrinter();
      }

      try {
        this.printer.server = await this.printer.device.gatt.connect();
        this.printer.service = await this.printer.server.getPrimaryService(this.printer.serviceUUID);
        this.printer.characteristic = await this.printer.service.getCharacteristic(
          this.printer.characteristicUUID
        );
        this.printer.connected = true;
        return true;
      } catch (error) {
        console.error('Error connecting to printer:', error);
        this.handleDisconnection();
        throw new Error('Failed to connect to printer');
      }
    },

    async sendToPrinter(text) {
      if (!this.printer.connected) {
        throw new Error('Printer not connected');
      }

      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        
        const CHUNK_SIZE = 512;
        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
          const chunk = data.slice(i, i + CHUNK_SIZE);
          await this.printer.characteristic.writeValue(chunk);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        return true;
      } catch (error) {
        console.error('Error sending data to printer:', error);
        throw new Error('Failed to send data to printer');
      }
    },

    handleDisconnection() {
      this.printer.connected = false;
      this.printer.server = null;
      this.printer.service = null;
      this.printer.characteristic = null;
    },

    async disconnectPrinter() {
      if (this.printer.device && this.printer.device.gatt.connected) {
        await this.printer.device.gatt.disconnect();
      }
      this.handleDisconnection();
    },

    getCommands() {
      return COMMANDS;
    }
  },

  beforeDestroy() {
    this.disconnectPrinter();
  }
};