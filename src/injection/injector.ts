import "reflect-metadata";

export interface Constructor<T> {
  new (...args: any[]): T;
}
type ClassDecorator<T extends Function> = (Target: Constructor<T>) => T | void;

export const Injectable = (): ClassDecorator<any> => {
  return (target) => {};
};
export const Injector = new (class {
  resolve<T>(Target: Constructor<T>): T {
    const requiredParams =
      Reflect.getMetadata("design:paramtypes", Target) || [];
    const resolvedParams = requiredParams.map((param: any) =>
      Injector.resolve(param)
    );
    const instance = new Target(...resolvedParams);
    return instance;
  }
})();
