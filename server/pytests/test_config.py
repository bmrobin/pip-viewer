import sys

from hamcrest import assert_that, is_
from server.config import Config


class TestConfig:

    def test_config(self):
        config = Config()
        assert_that(config.python_path, is_(sys.executable))
        config.python_path = 'test_path'
        assert_that(config.python_path, is_('test_path'))
