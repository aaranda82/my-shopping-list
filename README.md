# sgt-react

The Student Grade Table: Written in React

## Introduction

For this project, you will be building a single-page React application that communicates with a server to manipulate data.

## Getting Started

1. Fork this repository to your GitHub account and clone it into the `lfz` directory on your local machine.
1. Install all dependencies in `package.json` with NPM.
    ```bash
    npm install
    ```

## NPM Scripts

- `dev` - Start Webpack Dev Server on port `3000` and JSON Server on port `3001`. (Go to `http://localhost:3000`)
- `build` - Run Webpack to build the React client into `server/public`. (Usually only run during deployment)

## Features

- [User can view all grades.](features/user-can-view-all-grades.md)
- [User can view the average grade.](features/user-can-view-the-average-grade.md)
- [User can add a grade.](features/user-can-add-a-grade.md)
- [User can delete a grade.](features/user-can-delete-a-grade.md)

## Preview

![SGT React](sgt-react.gif)

## Server API

#### `GET /api/grades`

Responds with all recorded `grades`.

##### Example Response Body

```json
[
  {
    "id": 1,
    "name": "Scott Tolinski",
    "grade": 100,
    "course": "Web Development"
  },
  {
    "id": 2,
    "name": "Scott Bowler",
    "grade": 100,
    "course": "Web Development"
  }
]
```

#### `POST /api/grades`

Accepts a single `grade` object in the request body and inserts it into all `grades`. Responds with the inserted `grade`, including an auto-generated `id`.

##### Example Request Body

```json
{
  "name": "Tim Davis",
  "grade": 40,
  "course": "Web Development"
}
```

##### Example Response Body

```json
{
  "id": 3,
  "name": "Tim Davis",
  "grade": 40,
  "course": "Web Development"
}
```

#### `DELETE /api/grades/:id`

Removes a `grade` from all recorded `grades`, given an `id` in the request URL. _e.g._ `/api/grades/3`

##### Example Response Body

```json
{}
```
