import ICacheProvider from '../models/ICacheProvider';

interface ICache {
  [key: string]: string;
}

export default class RedisCacheProvider implements ICacheProvider {
  private cache: ICache = {};

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }
  public async recover<t>(key: string): Promise<t | null> {
    const data = this.cache[key];
    if (!data) {
      return null;
    }
    return JSON.parse(data) as t;
  }
  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}
