.PHONY: clean clean-watch

clean:
	find . -type f -wholename './packages/*/src/*.d.ts' -exec rm {} \;
	find . -type f -wholename './packages/*/src/*.d.ts.map' -exec rm {} \;
	find . -type f -wholename './packages/*/src/*.js' -exec rm {} \;
	find . -type f -wholename './packages/*/src/*.js.map' -exec rm {} \;
	find . -type f -wholename './packages/*/yarn.lock' -exec rm {} \;
	find . -type f -wholename './packages/*/tsconfig.tsbuildinfo' -exec rm {} \;

clean-watch:
	yarn run nodemon -w "./packages/**/src/" -w "./packages/**/yarn.lock" -w "./packages/**/tsconfig.tsbuildinfo" -x "clear && make clean"
