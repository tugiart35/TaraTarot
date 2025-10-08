# ProfileModal - SR Language i18n Additions

## Additions to messages/sr.json

Add the following keys to the appropriate sections in `messages/sr.json`:

### 1. profile Section Additions

Find the `"profile"` object in `messages/sr.json` and add these keys:

```json
{
  "profile": {
    "firstName": "Ime",
    "firstNamePlaceholder": "Unesite ime",
    "lastName": "Prezime",
    "lastNamePlaceholder": "Unesite prezime",
    "fullName": "Puno ime",
    "fullNamePlaceholder": "Unesite puno ime",
    "birthDate": "Datum rođenja",
    "personalInfo": "Lični podaci"
  }
}
```

### 2. profile2 Section Additions

Find or create the `"profile2"` object:

```json
{
  "profile2": {
    "noName": "Ime nije navedeno"
  }
}
```

### 3. common Section Additions

Find the `"common"` object in `messages/sr.json` and add:

```json
{
  "common": {
    "saving": "Čuvanje..."
  }
}
```

Note: Other common keys (close, edit, cancel, save) already exist in SR.

### 4. dashboard Section Additions

Find the `"dashboard"` object and add:

```json
{
  "dashboard": {
    "level": "Nivo"
  }
}
```

### 5. messages Section Additions

Ensure this nested structure exists:

```json
{
  "messages": {
    "dashboard": {
      "creditHistory": {
        "credits": "Krediti"
      }
    }
  }
}
```

---

## Manual Application Steps

1. Open `messages/sr.json`
2. For each section above, find the corresponding object
3. Add missing keys (preserve existing ones)
4. Check JSON syntax (commas, brackets)
5. Save the file
6. Run validation if available

---

## Automatic Application (using jq)

```bash
cd /Users/tugi/Desktop/TaraTarot

# Create backup
cp messages/sr.json messages/sr.json.backup-$(date +%s)

# Add with jq
jq '.profile += {
  "firstName": "Ime",
  "firstNamePlaceholder": "Unesite ime",
  "lastName": "Prezime",
  "lastNamePlaceholder": "Unesite prezime",
  "fullName": "Puno ime",
  "fullNamePlaceholder": "Unesite puno ime",
  "birthDate": "Datum rođenja",
  "personalInfo": "Lični podaci"
}' messages/sr.json > messages/sr.json.tmp && mv messages/sr.json.tmp messages/sr.json

jq '.profile2 += {
  "noName": "Ime nije navedeno"
}' messages/sr.json > messages/sr.json.tmp && mv messages/sr.json.tmp messages/sr.json

jq '.common += {
  "saving": "Čuvanje..."
}' messages/sr.json > messages/sr.json.tmp && mv messages/sr.json.tmp messages/sr.json

jq '.dashboard += {
  "level": "Nivo"
}' messages/sr.json > messages/sr.json.tmp && mv messages/sr.json.tmp messages/sr.json

jq '.messages.dashboard.creditHistory += {
  "credits": "Krediti"
}' messages/sr.json > messages/sr.json.tmp && mv messages/sr.json.tmp messages/sr.json
```

---

## Verification

After adding:

```bash
# Syntax check
cat messages/sr.json | jq . > /dev/null && echo "✓ JSON valid" || echo "✗ JSON invalid"

# Key check
grep -q '"firstName":' messages/sr.json && echo "✓ profile.firstName added"
grep -q '"saving":' messages/sr.json && echo "✓ common.saving added"
grep -q '"level":' messages/sr.json && echo "✓ dashboard.level added"
```

