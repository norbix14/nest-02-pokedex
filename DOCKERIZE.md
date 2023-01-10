# Steps to dockerize the app

## Installation

### Linux Ubuntu

* [Docker](https://docs.docker.com/engine/install/ubuntu/ 'Docker for Linux Ubuntu')

* [Docker Compose](https://docs.docker.com/compose/install/ 'Docker Compose')

* Run docker after installation

  ```bash
    sudo su
  ```

  ```bash
    docker --version
  ```

## Necessary images

* [MongoDB](https://hub.docker.com/_/mongo/ 'MongoDB Image')

  ```bash
  docker pull mongo:5.0
  ```

## Set database credentials

* Go to the [root](../ 'Root of the project') of the project

* Execute the following command to start the database:

  ```bash
  docker-compose up -d
  ```
