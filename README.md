
# Webflow to interactive parser

Extract content of a webflow page and create a single interactive file that can be embedded in another HTML page.

## Install

```bash
npm i
```

## Copy webflow export to project

Copy the content of the zip file in `./webflowExport` at the root of this project.

## Copy file to aws ad-assets bucket

Copy `./webflowExport/js` and `./webflowExport/images` to aws ad-assets bucket.

## Setting

Interactive settings can be change in `./config.toml`.

Fill up information before building the interactive. Should only need to change `assestsUrl` to the aws ad-assets bucket path.

## Create interactive

```bash
npm run build
```

Interactive will be created in `./dist/index.html`.
