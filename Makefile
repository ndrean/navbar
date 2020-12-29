IMG=nav:slim

default: buildSlim

buildSlim:
	docker image build -f Dockerfile -t $(IMG) .
	docker container run --rm -it -p 8080:80 --name contrngx1 $(IMG)

debugSlim:
	docker container exec -it contrngx1 shs


# usage: 
# -> make buildSlim 
# -> make debugSlim