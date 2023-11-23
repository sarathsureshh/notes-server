# notes-server

This server basically does the CRUD operations that are required for a simple notes app.

## Run Locally

Clone the project

```bash
  git clone https://github.com/sarathsureshh/notes-server.git
```

Go to the project directory

```bash
  cd notes-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`NOTES_DB`

`PORT`

## API Reference

#### Get Notes

```http
  GET /services/notes?pageNumber=${pageNumber}&pageSize=${}
```

| Parameter    | Type  | Description                                         |
| :----------- | :---- | :-------------------------------------------------- |
| `pageNumber` | `int` | **Required**. Current Page Number                   |
| `pageSize`   | `int` | **Required**. Total number of notes to be displayed |

#### Create Notes

```http
  POST /services/notes
```

| Body Field     | Type     | Description                                            |
| :------------- | :------- | :----------------------------------------------------- |
| `heading`      | `string` | **Required**. Heading of the notes                     |
| `text`         | `string` | **Required**. Text of the notes                        |
| `userName`     | `string` | **Required**. Username of the notes creator            |
| `parentFolder` | `string` | **Required**. the parentFolder ID of the Created notes |

#### Update Notes

```http
  PUT /services/notes
```

| Body Field  | Type     | Description                   |
| :---------- | :------- | :---------------------------- |
| `heading`   | `string` | Heading of the notes          |
| `text`      | `string` | Text of the notes             |
| `updatedBy` | `string` | Username of the notes updator |

#### Delete Notes

```http
  PUT /services/notes
```

| Body Field | Type     | Description                                      |
| :--------- | :------- | :----------------------------------------------- |
| `id`       | `string` | **Required**. mongoID of the notes to be deleted |

## Deployment

This project is deployed using [cyclic.sh](https://cyclic.sh)

To check out the deployed server use the following.

```http
  https://notes-server.cyclic.sh/health
```

## Authors

- [@sarathsureshh](https://www.github.com/sarathsureshh)
