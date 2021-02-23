## Howto upgrade last version of Deno

```sh
$ deno upgrade
```

## Howto config environment Deno on Visual Studio Code

1.- Create tsconfig.json

```sh
$ touch tsconfig.json
```

2.- Create lib folder

```sh
$ mkdir lib
```

3.- Execute command on terminal
```sh
$ deno types > lib/deno_runtime.d.ts
```
4.- Enable Deno land on VSC

4.1.- Create .vscode folder

```sh
$ mkdir .vscode
```

4.2.- Create a file settings.json in your .vscode folder:

```sh
$ touch settings.json
```

4.3.- Add code to settings.json
```sh
// .vscode/settings.json
{
    "deno.enable": true,
    "deno.unstable": true,
    "deno.lint": true,
    "deno.import_intellisense_origins": {
        "https://deno.land": true,
    }
}
```
## Howto listen ports in use 
```sh
$ sudo lsof -i -n -P | grep TCP
```

## Howto kill application
```sh
$ kill -9 <ID PROCESS>
```

## Howto run application
```sh
$ deno run --allow-net server.ts
$ deno test --allow-read --allow-net --location http://localhost server.ts
```