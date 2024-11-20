gen-diff:
	node bin/brain-games.js

publish:
	npm publish --dry-run

install: deps-install
	npx simple-git-hooks

gen-diff-demonstration:
	node bin/gen-diff.js __fixtures__/file1.json __fixtures__/file2.json

deps-install:
	npm ci --legacy-peer-deps

deps-update:
	npx ncu -u

test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8

lint:
	npx eslint .

.PHONY: test
