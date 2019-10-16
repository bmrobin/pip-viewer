import sys

from pip_viewer.config import Config


class TestConfig:

    def test_config(self):
        config = Config()
        assert config.python_path == sys.executable
        config.python_path = 'test_path'
        assert config.python_path == 'test_path'
