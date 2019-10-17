#!/bin/bash

source venv/bin/activate
cd pip_viewer
export FLASK_APP=server.py
export FLASK_ENV=development
export FLASK_DEBUG=1
