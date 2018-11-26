import { SipLoggerLevel } from "./logger/sip-logger-level";
import { SipLoggerOptions } from "./logger/sip-logger-options";


export class SipConfig {
    static readonly env:'development'|'production'|'testing' = process.env.NODE_ENV as any;

    static loggerOptions:SipLoggerOptions = {
        level: process.env.NODE_ENV == 'production' ? SipLoggerLevel.WARN : SipLoggerLevel.LOG,
        global: false,
        globalAs: "sipLogger"
      }
}