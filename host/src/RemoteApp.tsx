/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect } from 'react'
// import { lazy } from 'react';
// import { Suspense, lazy } from 'react'
import { lazy } from 'react';
import { __federation_method_setRemote, __federation_method_getRemote } from 'virtual:__federation__'

// const load = async (scope: string, entrypoint: string, paths: string[]) => {
//     __federation_method_setRemote(scope, {
// 		url: () => Promise.resolve(entrypoint),
// 		format: 'esm',
// 		from: 'vite'
// 	})

//     const pages = [];
//     for (const path of paths) {
//         const page = await __federation_method_getRemote(scope, path)
//         pages.push(page);
//     }

//     console.log(pages)

//     return <>Remote App</>
// }


// const RemoteApp = lazy(() => {
// 	__federation_method_setRemote('cart', {
// 		url: () => Promise.resolve(`${import.meta.env.VITE_MFE_CART}`),
// 		format: 'esm',
// 		from: 'vite'
// 	})

// 	return __federation_method_getRemote('cart', './pages/cart')
// })


const RemoteApp = ({scope, path, entrypoint}: {scope: string, path: string, entrypoint: string}) => {
	__federation_method_setRemote(scope, {
		url: () => Promise.resolve(entrypoint),
		format: 'esm',
		from: 'vite'
	})

	return lazy(() => __federation_method_getRemote(scope, path))

    // return  teste;
}





// const RemoteAppWithProps = ({}) => (
//     <Suspense fallback={<div>MF loading...</div>}>
//       <RemoteApp {...props} />
//     </Suspense>
//   );


// const RemoteApp = (scope: string, entrypoint: string, path: string) => {
//     console.log(scope, entrypoint)
// 	__federation_method_setRemote(scope, {
// 		url: () => Promise.resolve(entrypoint),
// 		format: 'esm',
// 		from: 'vite'
// 	})

// 	return __federation_method_getRemote(scope, path)
// }

export default RemoteApp;