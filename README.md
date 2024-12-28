# CLI Project ⌨️

![Build Status](https://github.com/ibrahim-sall/ci-cd-project/actions/workflows/worflow.yml/badge.svg?branch=staging)
![Commit Status](https://img.shields.io/github/commit-activity/t/ibrahim-sall/ci-cd-project?)

## Features 

This simple CLI tool allows you to interact with a server connected to a PostGIS database. It is designed to provide scooters with precise coordinates and battery levels. You will be able to 
- Request the list of vehicles
- Add your own vehicle
- Delete a vehicle

## Installation 

- Clone or download source-code from this repository
```bash
    gh repo clone ibrahim-sall/ci-cd-project
```
- Move to the good place
```bash
    cd path/to/ci-cd-project
```
- Finally you can now, build and run the container:
```bash
    docker-compose up
```
## Usage

- Add a vehcile
```bash
    docker-compose run cli add --shortcode aaaa --battery 50 --longitude 59.33598847572552 --latitude 18.06275780938702 --port 3001
```
- List vehicles
```bash
   docker-compose run cli list-vehicle --port 3001
```
- Delete a vehicle
```bash
   docker-compose run cli remove --id aaaa --port 3001
```
