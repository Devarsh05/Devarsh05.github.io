#!/usr/bin/env bash
# Asserts the Field Journal design invariants. Exit 0 = clean, 1 = violated.
set -u
cd "$(dirname "$0")/.." || exit 2
fail=0

report() {
  if [ "$2" -eq 0 ]; then
    printf 'PASS  %-34s %s\n' "$1" "$2"
  else
    printf 'FAIL  %-34s %s\n' "$1" "$2"
    fail=1
  fi
}

# Flatness: the design has no elevation and no colour movement.
report "no box-shadow" \
  "$(grep -ci 'box-shadow' styles.css || true)"
report "no gradients" \
  "$(grep -cEi '(linear|radial|conic)-gradient' styles.css || true)"

# Icons are line SVGs. Emoji are banned from markup.
# Matches UTF-8 lead bytes for emoji (F0 9F), math alphanumerics (F0 9D), dingbats (E2 9C).
report "no emoji in markup" \
  "$(LC_ALL=C grep -ac $'\xF0\x9F\|\xF0\x9D\|\xE2\x9C' index.html || true)"

# The old template's indigo float-squares must be gone.
report "no off-palette rgba" \
  "$(cat main.js styles.css | grep -c 'rgba(79, *70, *229' || true)"

# Only 8px, 9999px, 50%, or a token may set a radius.
bad_radius=$(grep -ohE 'border-radius:[^;]+' styles.css \
  | grep -vE '(^|[^0-9])8px|9999px|50%|var\(--radius' | wc -l | tr -d ' ')
report "only 8px/9999px radii" "$bad_radius"

# Inter and DM Serif Display are the only families allowed.
bad_font=$(grep -ohE 'font-family:[^;]+' styles.css variables.css \
  | grep -viE "inter|dm serif display|ui-sans-serif|system-ui|-apple-system|blinkmacsystemfont|segoe ui|roboto|georgia|sans-serif|serif|var\(--font" \
  | wc -l | tr -d ' ')
report "only approved font families" "$bad_font"

if [ "$fail" -eq 0 ]; then
  printf '\nAll design invariants hold.\n'
else
  printf '\nDesign invariants violated.\n'
fi
exit "$fail"
