import joplin from 'api';
import { ContentScriptType, SettingItem, SettingItemType } from 'api/types';

joplin.plugins.register({
	onStart: async function() {

		await joplin.contentScripts.register(
			ContentScriptType.CodeMirrorPlugin,
			'highlighter',
			'./HighlighterPlugin.js'
		);
	}
});