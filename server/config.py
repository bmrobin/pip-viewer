import sys


class Config:

    def __init__(self):
        self._python_path = sys.executable

    @property
    def python_path(self):
        return self._python_path

    @python_path.setter
    def python_path(self, path):
        self._python_path = path
