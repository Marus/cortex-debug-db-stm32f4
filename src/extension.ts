import { Extension, extensions, ExtensionContext, window } from 'vscode';
import * as path from 'path';

interface CortexDebug {
	registerSVDFile(expression: RegExp | string, path: string): void;
}

export function activate(context: ExtensionContext) {
	const cortexDebug: Extension<CortexDebug> = <Extension<CortexDebug>>extensions.getExtension('marus25.cortex-debug');
	if (!cortexDebug) {
		window.showErrorMessage('Cortex-Debug Extension is not available for device support packages');
		return;
	}

	cortexDebug.activate().then((cdbg) => {
		cdbg.registerSVDFile(/STM32F439[BINVZ][IG]/i, path.join(context.extensionPath, 'data', 'STM32F439x.svd'));
		cdbg.registerSVDFile(/STM32F437[VZI][GI]/i, path.join(context.extensionPath, 'data', 'STM32F437x.svd'));
		cdbg.registerSVDFile(/STM32F429[BINVZ][GI]/i, path.join(context.extensionPath, 'data', 'STM32F429x.svd'));
		cdbg.registerSVDFile(/STM32F427[VZI][GI]/i, path.join(context.extensionPath, 'data', 'STM32F427x.svd'));
		cdbg.registerSVDFile(/STM32F41[57][RVZI][GE]/i, path.join(context.extensionPath, 'data', 'STM32F41x.svd'));
		cdbg.registerSVDFile(/STM32F411[CRV][CE]/i, path.join(context.extensionPath, 'data', 'STM32F411xx.svd'));
		cdbg.registerSVDFile(/STM32F40[57][RVZI][GE]/i, path.join(context.extensionPath, 'data', 'STM32F40x.svd'));
		cdbg.registerSVDFile(/STM32F401[CRV]E/i, path.join(context.extensionPath, 'data', 'STM32F401xE.svd'));
		cdbg.registerSVDFile(/STM32F401[CRV][BC]/i, path.join(context.extensionPath, 'data', 'STM32F401x.svd'));
	}, (error) => {
		console.log('Unable to activate cortexDebug');
	});
}

export function deactivate() {}
