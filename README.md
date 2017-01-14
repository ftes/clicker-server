| Component | Build | Coverage |
|-----------|-------|----------|
| Server | [![Build Status](https://travis-ci.org/ftes/clickr-server.svg?branch=master)](https://travis-ci.org/ftes/clickr-server) | [![Coverage Status](https://coveralls.io/repos/github/ftes/clickr-server/badge.svg?branch=master)](https://coveralls.io/github/ftes/clickr-server?branch=master) |
| Student App | [![Build Status](https://travis-ci.org/ftes/clickr-student.svg?branch=master)](https://travis-ci.org/ftes/clickr-student) | [![Coverage Status](https://coveralls.io/repos/github/ftes/clickr-student/badge.svg?branch=master)](https://coveralls.io/github/ftes/clickr-student?branch=master) |
| Teacher App | [![Build Status](https://travis-ci.org/ftes/clickr-teacher.svg?branch=master)](https://travis-ci.org/ftes/clickr-teacher) | [![Coverage Status](https://coveralls.io/repos/github/ftes/clickr-teacher/badge.svg?branch=master)](https://coveralls.io/github/ftes/clickr-teacher?branch=master) |

# Clickr
An audience Response Systen for schools.
Clickr aims to be cheap to deploy and easy to set up.

## Architecture
Clickr consists of:
- one [server](https://github.com/ftes/clickr-server)
- multiple clients
  - [teacher](https://github.com/ftes/clickr-teacher) web app
  - [student](https://github.com/ftes/clickr-student) hybrid web app (cordova)
  - to come: _whiteboard_ and _teacher remote_ clients

### Basic Architecture
![basic architecture](docs/diagrams/architecture_basic.mmd.png)

### Student Devices
![basic architecture](docs/diagrams/student_devices.mmd.png)

### Teacher Devices
![basic architecture](docs/diagrams/teacher_devices.mmd.png)