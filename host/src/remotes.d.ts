/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'cart/*';
declare module 'products/*';
declare module 'virtual:*' {
    const __federation_method_setRemote: (scope: string, options: {
        url: () => Promise.resolve,
		format: string,
		from: string
    }) => void
    const __federation_method_getRemote: (scope: string, path: string) => Promise<any>
}