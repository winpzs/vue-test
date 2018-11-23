
export class SipConfig {
    static readonly env:'development'|'production'|'testing' = process.env.NODE_ENV as any;
}