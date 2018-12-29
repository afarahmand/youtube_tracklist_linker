# YouTube Tracklist Linker

This Chrome extension displays tracklist and sample information for YouTube mixes.

Whenever a user navigates to a url, the extension executes a content script page action if the url is a YouTube url.  The extension uses the videoId from the url to request information from a server.  The information can include track numbers, the start time for each track within the YouTube video with a deep link to jump to that point in the mix, a link to another YouTube video of that track, and a link to another YouTube video of that track's sample.

While this extension is primarily designed to show all of this information for YouTube videos of mixes each with multiple tracks, it could easily be extended to supporting singular songs.
