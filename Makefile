.PHONY: clean clean-watch

clean:
	yarn run rimraf "./packages/**/src/*.d.ts" \
					"./packages/**/src/*.d.ts.map" \
					"./packages/**/src/*.js" \
					"./packages/**/src/*.js.map" \
					"./packages/**/yarn.lock" \
					"./packages/**/dist/" \
					"./packages/**/tsconfig.tsbuildinfo" \
					"setup-jest.js" \
					"setup-jest.js.map" \
					"setup-jest.d.ts"

clean-watch:
	yarn run nodemon \
					-x "clear && make clean" \
					-w "./packages/**/src/" \
					-w "./packages/**/yarn.lock" \
					-w "./packages/**/tsconfig.tsbuildinfo"
