/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

// import Env from '@ioc:Adonis/Core/Env'
import { AllyConfig } from '@ioc:Adonis/Addons/Ally'

/*
|--------------------------------------------------------------------------
| Ally Config
|--------------------------------------------------------------------------
|
| The `AllyConfig` relies on the `SocialProviders` interface which is
| defined inside `contracts/ally.ts` file.
|
*/
const allyConfig: AllyConfig = {
	/*
	|--------------------------------------------------------------------------
	| Twitter driver
	|--------------------------------------------------------------------------
	*/
	twitter: {
		driver: 'twitter',
		clientId: 'Ev9tUN1GifGeWz52xUMax7l1i',
		clientSecret: 'YKSpIxHHKID56E86X97JQ0AanO4bvSLOYxBdRSqJbk9vioNZ0J',
		callbackUrl: 'http://localhost:3333/twitter',
	  }
}
// API KEY
// NOaCVVzxTZW6m9hK2ZFULRBO1
// API KEY SECRET
// 3QheD3m3z2MK50x68gwvYSdBaOCdF7YytszLm4CA7eoNuuwSiU

// Token Twitter
// AAAAAAAAAAAAAAAAAAAAAKJIqAEAAAAApYrjD1fS5Anl6a9%2FMTya4P6oToQ%3DLQmK8gaaarAi3BH1VZRtUTndYvCY6UttN4cg8SKzbIdfThnmSi

export default allyConfig
