// ========== Locale ==========
function locale(element, lang) {
	switch (element) {
		// HEAD
		case 'head__title':
			switch (lang) {
				case 'ru': return 'Музыка без АП для Ютуба';
				case 'en': return 'Music without copyright';
			} break;

		case 'head__description':
			switch (lang) {
				case 'ru': return 'Скачивайте бесплатно музыку без авторских прав';
				case 'en': return 'Download free music without copyright';
			} break;

		// BODY
		case 'body__h1':
			switch (lang) {
				case 'ru': return 'Музыка без авторских прав для Ютуба';
				case 'en': return 'Music without copyright';
			} break;

		case 'body__countPlaylists':
			switch (lang) {
				case 'ru': return 'Плейлистов';
				case 'en': return 'Playlists';
			} break;

		case 'body__countTracks':
			switch (lang) {
				case 'ru': return 'Треков';
				case 'en': return 'Tracks';
			} break;

		case 'body__playlist_search_placeholder':
			switch (lang) {
				case 'ru': return 'Поиск по плейлистам...';
				case 'en': return 'Playlist search...';
			} break;
	}
}
// ==========

export default locale;