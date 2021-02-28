clean:
	find . -type f -wholename './packages/*/src/*.d.ts' -exec rm {} \;
	find . -type f -wholename './packages/*/src/*.d.ts.map' -exec rm {} \;
	find . -type f -wholename './packages/*/src/*.js' -exec rm {} \;
	find . -type f -wholename './packages/*/src/*.js.map' -exec rm {} \;
	find . -type f -wholename './packages/*/yarn.lock' -exec rm {} \;
