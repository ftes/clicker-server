## Prerequisites
- `libffi-dev libssl-dev python python-virtualenv python-dev`

## Installation
### System-wide
- `sudo setup.py install`
- `sudo setcap cap_net_bind_service=+ep /usr/bin/python3.5`
- `sudo setcap cap_net_bind_service=+ep /usr/local/bin/crossbar`

### Virtualenv (problems running on port 80)
- `virtualenv env`
- `source env/bin/activate`
- `python setup.py install`