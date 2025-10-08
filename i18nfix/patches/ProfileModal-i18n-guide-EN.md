# ProfileModal - EN Language i18n Additions

## Additions to messages/en.json

Add the following keys to the appropriate sections in `messages/en.json`:

### 1. profile Section Additions

Find the `"profile"` object in `messages/en.json` and add these keys:

```json
{
  "profile": {
    "firstName": "First Name",
    "firstNamePlaceholder": "Enter your first name",
    "lastName": "Last Name",
    "lastNamePlaceholder": "Enter your last name",
    "fullName": "Full Name",
    "fullNamePlaceholder": "Enter your full name",
    "birthDate": "Birth Date"
  }
}
```

### 2. common Section Additions

Find the `"common"` object in `messages/en.json` and add:

```json
{
  "common": {
    "saving": "Saving..."
  }
}
```

Note: Other common keys (close, edit, cancel, save) already exist in EN.

---

## Manual Application Steps

1. Open `messages/en.json`
2. Locate the `profile` section
3. Add missing keys (don't modify existing ones)
4. Ensure JSON syntax is correct (commas, brackets)
5. Save the file
6. Run `npm run check:i18n` if available

---

## Automatic Application (using jq)

```bash
cd /Users/tugi/Desktop/TaraTarot

# Create backup
cp messages/en.json messages/en.json.backup-$(date +%s)

# Add with jq
jq '.profile += {
  "firstName": "First Name",
  "firstNamePlaceholder": "Enter your first name",
  "lastName": "Last Name",
  "lastNamePlaceholder": "Enter your last name",
  "fullName": "Full Name",
  "fullNamePlaceholder": "Enter your full name",
  "birthDate": "Birth Date"
}' messages/en.json > messages/en.json.tmp && mv messages/en.json.tmp messages/en.json

jq '.common += {
  "saving": "Saving..."
}' messages/en.json > messages/en.json.tmp && mv messages/en.json.tmp messages/en.json
```

---

## Verification

After adding:

```bash
# Syntax check
cat messages/en.json | jq . > /dev/null && echo "✓ JSON valid" || echo "✗ JSON invalid"

# Key check
grep -q '"firstName":' messages/en.json && echo "✓ profile.firstName added"
grep -q '"saving":' messages/en.json && echo "✓ common.saving added"
```

