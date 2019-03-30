import subprocess

from hamcrest import assert_that, is_

from server.pip_commands import PipCommands


class TestPipCommands:

    def test_get_installed(self, monkeypatch):
        def installed(arg1):
            print(arg1)
            return '["one", "two", "three"]'

        monkeypatch.setattr(subprocess, 'check_output', installed)
        result = PipCommands.get_installed()
        assert_that(result, is_(['one', 'two', 'three']))

    def test_install(self, monkeypatch):
        def install(arg, stderr=None):
            assert_that(' '.join(arg[1:5]), is_('-m pip install does_not_exist'))
        monkeypatch.setattr(subprocess, 'check_output', install)
        result = PipCommands.install('does_not_exist')
        assert_that(PipCommands.has_error(result), is_(False))

    def test_uninstall(self, monkeypatch):
        def uninstall(arg, stderr=None):
            assert_that(' '.join(arg[1:6]), is_('-m pip uninstall -y does_not_exist'))
        monkeypatch.setattr(subprocess, 'check_output', uninstall)
        result = PipCommands.uninstall('does_not_exist')
        assert_that(PipCommands.has_error(result), is_(False))
