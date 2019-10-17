# pip viewer
(w.i.p.) A webapp to interact with pip in a python environment

## Requirements
* python 3.x
* node >= 10.15.x

## Installation
Install server dependencies

    $ virtualenv -p python3 venv
    $ source venv/bin/activate
    $ pip install -r requirements.txt

Install UI dependencies

    $ cd ui
    $ npm install
    $ npm run build

## Usage
The following assumes execution via command line. If using an IDE, configure the following via debug options.

    $ ( from ui folder ) npm start

    $ export FLASK_APP=server.py
    $ export FLASK_ENV=development
    $ export FLASK_DEBUG=1
    $ cd pip_viewer
    $ python -m flask run

## Tests
server

    $ pytest

UI (from `ui` directory)

    $ npm test
