import subprocess

from pip_viewer.pip_commands import PipCommands, valid_uninstall


def test_get_installed(monkeypatch):
    def installed(arg1):
        print(arg1)
        return '["one", "two", "three"]'

    monkeypatch.setattr(subprocess, 'check_output', installed)
    result = PipCommands.get_installed()
    assert result == ['one', 'two', 'three']


def test_install(monkeypatch):
    def install(arg, stderr=None):
        assert ' '.join(arg[1:5]) == '-m pip install does_not_exist'

    monkeypatch.setattr(subprocess, 'check_output', install)
    result = PipCommands.install('does_not_exist')
    assert PipCommands.has_error(result) is False


def test_uninstall(monkeypatch):
    def uninstall(arg, stderr=None):
        assert ' '.join(arg[1:6]) == '-m pip uninstall -y does_not_exist'

    monkeypatch.setattr(subprocess, 'check_output', uninstall)
    result = PipCommands.uninstall('does_not_exist')
    assert PipCommands.has_error(result) is False


def test_valid_uninstall():
    assert valid_uninstall('pip') is False
    assert valid_uninstall('pytest') is False
    assert valid_uninstall('Flask') is False
    assert valid_uninstall('flask') is True
    assert valid_uninstall('requests') is True
