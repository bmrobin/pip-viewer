import logging

from flask import Flask, request
from flask.json import jsonify
from flask_cors import cross_origin
from .pip_commands import PipCommands

logger = logging.getLogger(__name__)
app = Flask('pip-viewer')
commands = PipCommands()


@app.route('/')
def main():
    return 'pip-viewer\n\n' \
           'available options: \n'\
           'GET /installed \n'\
           'POST /install {name}\n'


@app.route('/installed')
@cross_origin()
def get_installed():
    return jsonify(commands.get_installed())


@app.route('/install', methods=['POST'])
@cross_origin()
def install():
    if request.method != 'POST':
        raise RuntimeError('HTTP 400 - unsupported request method. only POST allowed')
    try:
        package_name = request.json['pkgName']
        result = commands.install(package_name)
        if PipCommands.has_error(result):
            return jsonify(result.stdout.decode('utf-8'))
        return jsonify(f"Successfully installed {package_name}")
    except KeyError as err:
        logger.error(err)


@app.route('/uninstall', methods=['POST'])
@cross_origin()
def uninstall():
    if request.method != 'POST':
        raise RuntimeError('HTTP 400 - unsupported request method. only POST allowed')
    try:
        package_name = request.json['pkgName']
        result = commands.uninstall(package_name)
        if PipCommands.has_error(result):
            return jsonify(result.stdout.decode('utf-8'))
        return jsonify(f"Successfully uninstalled {package_name}")
    except KeyError as err:
        logger.error(err)
