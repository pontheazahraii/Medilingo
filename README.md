# [Medilingo](https://medilingo-227943627758.us-central1.run.app)
Medilingo is a medical terminology web app that teaches users (e.g., patients, caregivers, medical students) medical terminology. 

## Contributors
* [Natalie Huante](mailto:huante@chapman.edu)
* [Devyn Miller](mailto:devmiller@chapman.edu)
* [Tiffany Le](mailto:tifle@chapman.edu)
* [Ponthea Zahraii](mailto:zahraii@chapman.edu)

## Backend
### Google Cloud Platform
#### IAM Permissions 
`Compute Organization Resource Admin`

#### Compute Engine Virtual Machine
The PostgreSQL database is hosted on a [virtual machine](https://35.239.87.6/). This VM acts as a remote database server that the Node.js application connects to over the network.

#### Cloud Run
This service hosts the Node.js backend for Medilingo, deployed using Google Cloud Run CI/CD Github-linked container image.

### Docker Build Instructions 
```Dockerfile
docker build -t my-node-app .
docker run -p 3001:3001 my-node-app
```
