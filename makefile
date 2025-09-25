


debug ios:
	npx react-native run-ios --list-devices  --verbose

screen:
	sh ./scripts/create_screen.sh create

iphone:
	npx react-native run-ios --device 'Trung 11'

simulator:
	npx react-native run-ios --simulator 'ip 16 18.5'

check:
	npx tsc --noEmit

clean:
	npx react-native clean

install:
	npm i
	cd ios && pod install

devices:
	xcrun xctrace list devices 

build:
	npm run build
	

commit:
	npm run build
	@read -p "Enter commit message: " msg; \
	git add .; \
	git commit -m "$$msg"; \
	git push


reactoop:
	npm i react_oop --force

