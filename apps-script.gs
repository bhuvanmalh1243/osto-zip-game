// Osto Zip game -> Google Sheet sync
// Paste into Extensions > Apps Script of the "Osto TCD26 – Zip Game Leads" sheet, then Deploy > New deployment > Web app
// Execute as: Me   |   Who has access: Anyone
const COLS = ['id','timestamp','day','name','email','phone','company','role','team_size','compliance_status','frameworks_12mo','security_headache','consent','category','attempt','time_seconds','completed'];

function sheet_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(COLS);
  return sh;
}
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doGet(e) { sheet_(); return json_({ ok: true }); }

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const rows = (JSON.parse(e.postData.contents).rows) || [];
    const sh = sheet_();
    const n = sh.getLastRow();
    const seen = new Set(n > 1 ? sh.getRange(2, 1, n - 1, 1).getValues().map(r => String(r[0])) : []);
    const add = rows.filter(r => r && r.id && !seen.has(String(r.id)))
                    .map(r => COLS.map(c => r[c] === undefined || r[c] === null ? '' : r[c]));
    if (add.length) sh.getRange(sh.getLastRow() + 1, 1, add.length, COLS.length).setValues(add);
    return json_({ ok: true, added: add.length });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally { lock.releaseLock(); }
}
