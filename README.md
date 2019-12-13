# POLLAB

This social voting app is for those who need instant feedback from their friends by uploading polls with pictures. App users can create accounts, follow/unfollow other users, create clusters of friends (friend lists), upload polls with questions and pictures that can only be shown to a chosen friend list, and get real-time data update when their friends vote on the pictures.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Getting started

- Cloning this repo: run `git clone https://github.com/hatchways/team-pretzel.git`
- Installing dependencies: run `npm install` in `\server` AND `\client` directories

## Running app locally

Navigate to `\server`:

- Running client-side only: run `npm run server`
- Running server-side only: run `npm run client`
- Running both (concurrently): run `npm run dev`

## Technologies

**Server-side:**

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) - for remote database
- [Mongoose](https://mongoosejs.com/)
- [AWS S3](https://aws.amazon.com/s3/) - for image upload storage
- [Socket.io](https://socket.io/) - for real-time update data on back-end
- _and other commonly used back-end implementations_

**Client-side:**

- [React.js](https://reactjs.org/) ecosystem
- [Formik](https://jaredpalmer.com/formik/) - for form handling
- [Yup](https://github.com/jquense/yup) - for form validations
- [Socket.io (client)](https://socket.io/docs/internals/#socket-io-client) - for real-time update data on front-end
- _and other commonly used front-end implementations_

## Authors

- [Kay Nguyen](https://github.com/k-awe-some)
- [Sunny Heyar](https://github.com/m3tron)
- [Leon Chung](https://github.com/chungleee)

## Acknowledgements

- App design mock-ups by [Hatchways](https://hatchways.io)' project-based career accelerator program.
- Guidance from [Shums Kassam](https://github.com/skassam21)

## License

This app is available under [MIT](https://choosealicense.com/licenses/mit/) license.
