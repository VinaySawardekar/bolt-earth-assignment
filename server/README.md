# Frontend Documentation

### <span style="color:red">IMPORTANT: </span><span style="color:blue">VSCode Extension</span>(To see UI for any md file)

- Install [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- To run above extension, right click on any `*.md` file, and click on `Markdown Preview Enhanced: Open Preview to the Side`

#### Documents Updates

| Version | Create         | Update         |
| :------ | :------------- | :------------- |
| `1.0.0` | `Jan 11, 2025` | `Jan 11, 2025` |

##### <span style="color:red">IMPORTANT: </span> When ever you update this document, change the <span style="color:green">update date</span> and <span style="color:green">version</span>

#### Document Description

Contains document of the frontend resources such as Node.js, angular CLI that are being using in our project.

### Install @angular/cli

Ref: https://www.npmjs.com/package/@angular/cli

1. Install Locally

   - Install Node.js
     Minimum Node.js version required is **v20.12.x**
     Here **x** mean any patch version of Node.js
     Using npx you can install desired version

     ```sh
     a)Install NVM:   curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.1/install.sh | bash
     b) Activate NVM:  . ~/.nvm/nvm.sh
     c) Install Node(choose version):  nvm install 20.12.1
     d) Use Node Version: nvm use 20.12.1
     e) Confirm Successful Installation:   node -e "console.log('Running Node.js ' + process.version)"
     f) Make node version 20.12.1 as default: nvm alias default 20.12.1
     ```

     Now close and re-open your terminal and check Node.js version and if it is not 20.12.x follow below methods
     <space></space>
     <br>
     Method-1 (For MacOS & Linux):<br>

     ```sh
     a) Suppose node already exist but old version and using nvm alias default 20.12.1 it is not setting to default.
     b)  https://askubuntu.com/a/921794  Follow this answer in .bashrc file in last edit node version (or below steps)
         b.1) sudo vim .bashrc
         b.2) Press press Esc + i
         b.3) Edit last lines with Node version you want
         b.4) Press :wq
     ```

     Method-2(All OS):<br>

     ```sh
     a) https://stackoverflow.com/a/74500030/11926970 Follow this answer  nvm alias default node
     ```

   - Install @angular/cli
     ```sh
         npm i @angular/cli -g
     ```

#### Start the app

```bash
  npm start
```

#### Build the app

##### For Production

```bash
  npm build
```

or

```bash
  npm run build
```

##### For Development

```bash
  npm run build:dev
```

##### For Local

```bash
  npm run build:local
```

#### Project Contributors

| Name                                                              | Email                         |
| :---------------------------------------------------------------- | :---------------------------- |
| [Vinay Sawardekar](https://www.linkedin.com/in/vinay-sawardekar/) | <vinaysawardekar99@gmail.com> |
