# pip viewer
(w.i.p.) A webapp to interact with pip in a python environment

## Requirements
* python 3.x
* node >= 10.15.x

## Usage
Install server dependencies

    $ virtualenv -p python3 venv
    $ source venv/bin/activate
    $ pip install -r requirements.txt

Install UI dependencies

    $ cd ui
    $ npm install

## Tests
server

    $ pytest

UI (from `ui` directory)

    $ npm test
