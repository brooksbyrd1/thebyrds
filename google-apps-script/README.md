# RSVP Google Sheet backend

1. Create (or open) a Google Sheet to collect RSVPs.
2. Extensions > Apps Script.
3. Replace the default `Code.gs` contents with this folder's `Code.gs`.
4. Deploy > New deployment > select type "Web app".
   - Execute as: Me
   - Who has access: Anyone
5. Authorize the script when prompted.
6. Copy the generated `/exec` URL.
7. Paste it into `SCRIPT_URL` in `rsvp.html` (near the bottom `<script>` block).

Each submission appends one row to an `RSVPs` sheet/tab (auto-created), with
columns for timestamp, submitter name, party size, notes, and up to 8 guest
name/dietary-restriction pairs.

Note: the form posts with `mode: 'no-cors'` since Apps Script web apps don't
return CORS headers, so the browser can't read the response. The request
still reaches the script and gets recorded — the page just can't confirm
success beyond "the request was sent."
