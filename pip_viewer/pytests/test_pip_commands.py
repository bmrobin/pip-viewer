import subprocess

from pip_viewer.pip_commands import PipCommands


class TestPipCommands:

    def test_get_installed(self, monkeypatch):
        def installed(arg1):
            print(arg1)
            return '["one", "two", "three"]'

        monkeypatch.setattr(subprocess, 'check_output', installed)
        result = PipCommands.get_installed()
        assert result == ['one', 'two', 'three']

    def test_install(self, monkeypatch):
        def install(arg, stderr=None):
            assert ' '.join(arg[1:5]) == '-m pip install does_not_exist'
        monkeypatch.setattr(subprocess, 'check_output', install)
        result = PipCommands.install('does_not_exist')
        assert PipCommands.has_error(result) is False

    def test_uninstall(self, monkeypatch):
        def uninstall(arg, stderr=None):
            assert ' '.join(arg[1:6]) == '-m pip uninstall -y does_not_exist'
        monkeypatch.setattr(subprocess, 'check_output', uninstall)
        result = PipCommands.uninstall('does_not_exist')
        assert PipCommands.has_error(result) is False
