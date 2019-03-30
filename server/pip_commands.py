import json
import logging
import subprocess

from .config import Config

logger = logging.getLogger(__name__)
config = Config()


class PipCommands:

    @staticmethod
    def get_installed():
        response = subprocess.check_output([config.python_path, '-m', 'pip', 'list', '--format', 'json'])
        json_response = json.loads(response)
        return json_response

    @staticmethod
    def install(package):
        try:
            subprocess.check_output([config.python_path, '-m', 'pip', 'install', package],
                                    stderr=subprocess.STDOUT)
            return True
        except subprocess.CalledProcessError as err:
            logger.error(err)
            return err

    @staticmethod
    def uninstall(package):
        try:
            subprocess.check_output([config.python_path, '-m', 'pip', 'uninstall', '-y', package],
                                    stderr=subprocess.STDOUT)
            return True
        except subprocess.CalledProcessError as err:
            logger.error(err)
            return err

    @staticmethod
    def has_error(result):
        return isinstance(result, subprocess.CalledProcessError)
