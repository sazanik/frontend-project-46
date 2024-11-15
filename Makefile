install:
	npm ci

gen-diff:
	node bin/brain-games.js

publish:
	npm publish --dry-run

link:
	npm link
