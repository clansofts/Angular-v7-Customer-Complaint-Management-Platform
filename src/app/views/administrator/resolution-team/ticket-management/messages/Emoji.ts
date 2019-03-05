/* Decorator Factories */
export function Emoji() {
    return function (target: Object, key: string | symbol) {
        let val = target[key];
        const getter = () => {
            return val;
        };
        const setter = (next) => {
            console.log('updating flavor...');
            val = `🍦 ${next} 🍦`;
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    };
}

// Method Decorator
export function Confirmable(message: string) {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const allow = confirm(message);

            if (allow) {
                const result = original.apply(this, args);
                return result;
            } else {
                return null;
            }
        };

        return descriptor;
    };
}

export function f() {
    console.log('f(): evaluated');
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('f(): called');
    };
}
