import { MarkdownRender } from '../components'

const markdown = `
# How to start the application

## Download the project

### HTTPS

~~~bash
git clone https://github.com/NathanFirmo/next-docs.git
~~~
### SSH

~~~bash
git clone git@github.com:NathanFirmo/next-docs.git
~~~

### GitHub CLI

~~~bash
gh repo clone NathanFirmo/next-docs
~~~

## Install dependencies

~~~bash
npm i

# or

yarn
~~~

## Create your .env

Copy the information from the ***.env.sample*** file to a ***.env*** file.

~~~bash
cp .env.sample .env
~~~

## Start the application

~~~bash
npm run dev

# or

yarn dev
~~~
`

export default function Template() {

  return (
    <MarkdownRender 
      markdownText={markdown}
    />
  )
}
