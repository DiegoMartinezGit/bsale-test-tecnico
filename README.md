# bsale-test-tecnico
<p align="right">(<a href="#top">back to top</a>)</p>
<!-- ABOUT THE PROJECT -->
## About The Project
This is a test project for Bsale's selection process, it consists of a serverless API that provides a client with the necessary products and filters, and a client that displays these same products and categories to the user.

Screenshot
![](https://i.gyazo.com/e220553a072c157d9cad2de03daeb69a.png)

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With
Backend
* [Express.Js](https://expressjs.com)
* [Node.Js](https://nodejs.org/es/)
* [Serverless Framework](https://www.serverless.com)
* [AWS Lambda](https://docs.aws.amazon.com/lambda/)
* [Mariadb](https://mariadb.com)

Fronted

* [AWS Amplify](https://aws.amazon.com/es/amplify/)
* [Javascript](https://www.javascript.com)
### Requirements
* [Node Js](https://nodejs.org/es/)
* [AWS CLI](https://aws.amazon.com/es/cli/)

### Installation

_Below its the instalation guide_

1. Clone the repo
   ```sh
   git clone https://github.com/DiegoMartinezGit/bsale-test-tecnico.git
   ```
2. For server side install NPM packages in /bsale-test-tecnico/backend-api-serverless
   ```sh
   npm install
   ```
3. configure aws config credentials for deploy in AWS Lambda y CloudFormation
   ```sh
   aws configure
   ```
4. run serverless deploy 
   ```sh
   serverless deploy
   ```
5. For client side deploy  \bsale-test-tecnico\frontend\src\index.html: 
   ```sh 
   Test in localhost:5500/ with server Deploy in AWS Amplify or Github pages
   ```
<p align="right">(<a href="#top">back to top</a>)</p>
