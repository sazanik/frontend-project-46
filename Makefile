gen-diff:
	node bin/gen-diff.js

publish:
	npm publish --dry-run

install: deps-install
	npx simple-git-hooks

gen-diff-demonstration-json:
	node bin/gen-diff.js __fixtures__/file1.json __fixtures__/file2.json

gen-diff-demonstration-yaml:
	node bin/gen-diff.js __fixtures__/file1.yml __fixtures__/file2.yml

deps-install:
	npm ci --legacy-peer-deps

deps-update:
	npx ncu -u

test:
	npm run test

test-coverage:
	npm run test:coverage

lint:
	npx eslint .

link:
	npm link

.PHONY: test
