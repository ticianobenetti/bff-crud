PATH_BACKEND=/var/www/api/crud
PATH_FRONTEND=/var/www/html/crud
WHATSNEW != cat WHATSNEW
default: all

all: backend frontend

git: clean
	git commit -a -m "$(WHATSNEW)"
	git push --set-upstream origin HEAD

backend: $(PATH_BACKEND)/names $(PATH_BACKEND)/remove $(PATH_BACKEND)/update $(PATH_BACKEND)/fetch

frontend: $(PATH_FRONTEND)/crud.js $(PATH_FRONTEND)/index.html

clean:
	rm -f *~
	clear

$(PATH_BACKEND)/create: create
	cp create $(PATH_BACKEND)

$(PATH_BACKEND)/names: names
	cp names $(PATH_BACKEND)

$(PATH_BACKEND)/remove: remove
	cp remove $(PATH_BACKEND)

$(PATH_BACKEND)/update: update
	cp update $(PATH_BACKEND)

$(PATH_BACKEND)/fetch: fetch
	cp fetch $(PATH_BACKEND)

$(PATH_FRONTEND)/crud.js: crud.js
	cp crud.js $(PATH_FRONTEND)

$(PATH_FRONTEND)/index.html: index.html
	cp index.html $(PATH_FRONTEND)
