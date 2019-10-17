import logging

from flask import Flask, request, render_template
from flask.json import jsonify
from flask_cors import cross_origin
from .pip_commands import PipCommands

logger = logging.getLogger(__name__)
app = Flask(__name__, static_folder='../ui/build', template_folder='../ui')
commands = PipCommands()


@app.route('/')
def main():
    return render_template('index.html')


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
            return jsonify(result.stdout.decode('utf-8')), 500
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


if __name__ == '__main__':
    app.run(debug=True)
