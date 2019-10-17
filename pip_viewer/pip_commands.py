import json
import logging
import os
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
            if not valid_uninstall(package):
                return False
            subprocess.check_output([config.python_path, '-m', 'pip', 'uninstall', '-y', package],
                                    stderr=subprocess.STDOUT)
            return True
        except subprocess.CalledProcessError as err:
            logger.error(err)
            return err

    @staticmethod
    def has_error(result):
        return isinstance(result, subprocess.CalledProcessError)


def valid_uninstall(pkg):
    """
    For a given package name, determine whether it is safe to uninstall.
    Core packages relevant to the functionality of the server are protected (e.g. Flask, its dependencies, etc...)

    :return: True if the given `pkg` parameter is ok to uninstall
    """

    # pip won't show up in requirements file, but will show in `pip list`. so prevent it too
    if pkg == 'pip':
        return False

    # ensure nothing in project's requirements.txt can be removed
    current_directory = os.path.dirname(__file__)
    parent_directory = os.path.split(current_directory)[0]
    file_path = os.path.join(parent_directory, 'requirements.txt')
    with open(file_path, 'r') as file:
        for requirement in file.readlines():
            requirement = requirement.rstrip('\n').split('==')[0]
            if pkg == requirement:
                return False

    return True
